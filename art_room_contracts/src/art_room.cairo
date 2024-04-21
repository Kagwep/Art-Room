use starknet::ContractAddress;

#[derive(Drop, Serde)]
struct Room {
    room_id: u128,
    room_name:felt252,
    visitors: u128,
    gallery_image_profile: ByteArray,
    entry_fee:u256,
    owner: ContractAddress,
    created_at: u64

}

#[derive(Drop, Serde)]
struct Art {
    room_id: u128,
    art_id: u128,
    art_name:ByteArray,
    art_position:u64,
    art_CID: ByteArray,
    added: u64,
}

#[starknet::interface]
trait IArtRoom<TContractState> {
    fn create_room(ref self: TContractState, room_name: felt252, gallery_image_profile: ByteArray, entry_fee: u256);
    fn get_room(self: @TContractState, room_id : u128 ) -> Room;
    fn get_rooms(self: @TContractState)-> Array<Room>;
    fn create_art(ref self:TContractState,room_id: u128, art_name: ByteArray,art_position:u64, art_CID: ByteArray);
    fn get_art(self: @TContractState, art_id: u128,) -> Art;
    fn get_arts_for_room(self: @TContractState, room_id: u128) -> Array<Art>;
    fn add_visitor(ref self:TContractState, room_id: u128);
    fn change_entry_fee(ref self:TContractState, room_id: u128, new_entry_fee: u256);
    
}


#[starknet::contract]
mod art_room {

    use core::array::ArrayTrait;
    use core::traits::Into;
    use super::{Room,Art};
    use starknet::ContractAddress;
    use starknet::{get_caller_address,get_block_timestamp};


    #[storage]
    struct  Storage {

        rooms:LegacyMap::<u128, Room>,
        arts:LegacyMap::< u128, Art>,
        total_rooms: u128,
        total_arts: u128,

    }


    #[constructor]
    fn constructor(ref self: ContractState) {
        self.total_rooms.write(0);
        self.total_arts.write(0);
    }


    #[abi(embed_v0)]
    impl IArtRoomImpl of super::IArtRoom<ContractState>{

        fn create_room(ref self: ContractState, room_name: felt252, gallery_image_profile: ByteArray, entry_fee: u256){

            let owner = get_caller_address();
            let created_at = get_block_timestamp();
            let total_rooms = self.total_rooms.read() + 1;


            let new_room = Room {
                    room_id: total_rooms,
                    room_name,
                    visitors: 0,
                    gallery_image_profile,
                    entry_fee,
                    owner,
                    created_at,
            };

             
            self.rooms.write(total_rooms, new_room); 

            self.total_rooms.write(total_rooms);  
        }

        fn get_room(self: @ContractState, room_id : u128 ) -> Room{
            self.rooms.read(room_id)
        }


        fn create_art(ref self:ContractState ,room_id: u128, art_name: ByteArray,art_position:u64, art_CID: ByteArray){

            let added = get_block_timestamp();

            let total_arts = self.total_arts.read() + 1;

            let new_art = Art {
                room_id,
                art_id: total_arts,
                art_name,
                art_position,
                art_CID,
                added
            };

            self.arts.write(total_arts, new_art);

            

            self.total_arts.write(total_arts);

        }

       fn get_rooms(self: @ContractState)-> Array<Room>{

        let mut count:u128 = 0;

        let total_rooms = self.total_rooms.read();

        let mut  rooms = array![];

        loop {

            if count > total_rooms.into() {
                break;
            }

            rooms.append(self.rooms.read(count));


            count += 1;
        };

        rooms


       }


       fn get_arts_for_room(self: @ContractState, room_id: u128) -> Array<Art> {

            let total_arts = self.total_arts.read();

            let mut arts = array![];

            let mut count = 0;

            loop{
                 
                 if count > total_arts {
                    break;
                 }

                 let art__room_id = self.arts.read(count).room_id;

                 if art__room_id == room_id{
                        arts.append(self.arts.read(count));
                 }

                 count +=1;
            };


            arts
       }

       fn get_art(self: @ContractState, art_id: u128) -> Art{

                self.arts.read(art_id)
       }


    fn add_visitor(ref self:ContractState, room_id: u128){

            let mut target_room = self.rooms.read(room_id);

            assert(target_room.owner == get_caller_address(), 'CALLER MUST BE ROOM OWNER');

            target_room.visitors +=1;

            self.rooms.write(room_id, target_room);
    }



    fn change_entry_fee(ref self:ContractState, room_id: u128, new_entry_fee: u256){
            
            let mut target_room = self.rooms.read(room_id);

            assert(target_room.owner == get_caller_address(), 'CALLER MUST BE ROOM OWNER'); 
            assert(new_entry_fee != 0, 'FEE MUST BE GREATOR THAN 0');

            target_room.entry_fee = new_entry_fee;

            self.rooms.write(room_id, target_room);
    }
    
        
    }



}