import React, {useState, useEffect} from 'react';
import CreateRoom from './CreateRoom';
import GrassLand from '../img/grassland.webp'
import { Link } from 'react-router-dom';
import { useContractRead,usePrepareContractWrite, useContractWrite  } from "wagmi"
import {useAccount } from "wagmi"
import { useWaitForTransaction } from 'wagmi';
import { contractABI } from '@/utils/utils';
import { contractAddress } from '@/utils/utils';
import AddressChip from './NavBar/AddressChip';
import { useUser } from './NavBar/useUser';

interface Room {
  arts: any[];
  createdAt: number;
  earnings: number;
  entryFee: number;
  galleryImageProfile: string;
  owner: string;
  roomId: number;
  roomName: string;
  visitors: number;
}

const MyRooms = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [roomsData, setRoomsData] = useState<Room[]>([]);

    const {address} = useUser()
  
    const { data: rooms, isError, isLoading } = useContractRead({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getAllRooms',
    });

    console.log(rooms)

    useEffect(() => {
        if (!isError && !isLoading && rooms) {
          const takeRoom = rooms as Room[]
          const filteredRooms = takeRoom.filter((room: Room) => room.owner === address);
          setRoomsData(filteredRooms);
        }
      }, [rooms, isError, isLoading])
  
    if (isError) {
      return <div>Error: Unable to fetch data. Please try again later.</div>;
    }
  
    if (isLoading) {
      return <div>Loading...</div>;
    }

    console.log("yurty",roomsData)
  
    return (
      <div>
        <section className="py-28">
          <div className="container mx-auto">
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
                onClick={() => setModalOpen(true)}
              >
                Create Room
              </button>
  
              {isModalOpen && <CreateRoom closeModal={() => setModalOpen(false)} />}
            </div>
  
            <div className="py-5 my-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                  {roomsData.map((room, index) => (
                      <div key={index} className="max-w-sm w-full lg:max-w-full lg:flex">
                              <div 
                                  className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"  
                                  title="Woman holding a mug"
                                  style={{ backgroundImage: `url(${room.galleryImageProfile})` }}
                              >
                              </div>
                              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                  <div className="mb-8">
                                  <p className="text-sm text-gray-600 flex items-center">
                                      <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                      <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                      </svg>
                                      Members only
                                  </p>
                                  <div className="text-gray-900 font-bold text-xl mb-2">
                                    <Link to={`/my-galleries/${room.roomId}`}>
                                      <h2 className="font-semibold mb-1">  {room.roomName} </h2>
                                    </Link>
                                    
                                  </div>
                                  <p className="text-gray-700 text-base">
                                    Entry Fee: {room.entryFee.toString()} LineaETH
                                  </p>
                                  </div>
                                  <div className="flex items-center">
                                  <div className="text-sm">
                                      <p className="text-gray-900 leading-none"></p>
                                      Owner: <AddressChip  address={room.owner} />
                                      <p> </p>
                                      <p className="text-gray-600">{room.createdAt}</p>
                                  </div>
                                  </div>
                              </div>
                      </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default MyRooms;