// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MSIA is ReentrancyGuard, Ownable {
    struct Art {
        uint256 artId;
        string artName;
        uint256 artNumber;
        string artCID;
        string artSoundCID;
    }

    struct Room {
        uint256 roomId;
        string roomName;
        uint128 visitors;
        string galleryImageProfile;
        uint256 entryFee;
        address payable owner;
        uint256 createdAt;
        uint256 earnings;
        Art[] arts;
    }


    // Constructor that accepts an initial owner address and passes it to the Ownable base constructor
    constructor(address initialOwner) Ownable(initialOwner) {
        // Additional initialization can go here
    }

    // Additional contract methods and properties

    Room[] public rooms;
    mapping(uint256 => Room) public roomIdToRoom;

    event RoomCreated(uint256 indexed roomId, string roomName, address owner);
    event ArtAdded(uint256 indexed roomId, uint256 artId, string artName);
    event RoomVisited(uint256 indexed roomId, address visitor);
    event EarningsWithdrawn(address owner, uint256 amount);

    function createRoom(
        string memory _roomName,
        string memory _galleryImageProfile,
        uint256 _entryFee
    ) public {
        uint256 _roomId = rooms.length;
        Room storage newRoom = roomIdToRoom[_roomId];
        newRoom.roomId = _roomId;
        newRoom.roomName = _roomName;
        newRoom.galleryImageProfile = _galleryImageProfile;
        newRoom.entryFee = _entryFee;
        newRoom.owner = payable(msg.sender);
        newRoom.createdAt = block.timestamp;
        newRoom.visitors = 0;
        newRoom.earnings = 0;

        rooms.push(newRoom);

        emit RoomCreated(_roomId, _roomName, msg.sender);
    }

    function addArt(
        uint256 _roomId,
        string memory _artName,
        string memory _artCID,
        string memory _artSoundCID
    ) public {
        require(msg.sender == roomIdToRoom[_roomId].owner, "Only room owner can add art");
        uint256 artNumber = roomIdToRoom[_roomId].arts.length + 1;

        Art memory newArt = Art({
            artId: artNumber,
            artName: _artName,
            artNumber: artNumber,
            artCID: _artCID,
            artSoundCID: _artSoundCID
        });

        roomIdToRoom[_roomId].arts.push(newArt);

        emit ArtAdded(_roomId, artNumber, _artName);
    }

    function visitRoom(uint256 _roomId) public payable nonReentrant {
        require(msg.value == roomIdToRoom[_roomId].entryFee, "Incorrect entry fee");
        roomIdToRoom[_roomId].visitors += 1;
        roomIdToRoom[_roomId].earnings += msg.value;
        emit RoomVisited(_roomId, msg.sender);
    }

    function withdrawEarnings(uint256 _roomId) public nonReentrant {
        Room storage room = roomIdToRoom[_roomId];
        require(msg.sender == room.owner, "Only the room owner can withdraw earnings");
        uint256 amount = room.earnings;
        require(amount > 0, "No earnings to withdraw");

        room.earnings = 0;  // Reset earnings to zero
        (bool success, ) = room.owner.call{value: amount}("");
        require(success, "Transfer failed");

        emit EarningsWithdrawn(msg.sender, amount);
    }

    // Function to get details about a room
    function getRoomDetails(uint256 _roomId) public view returns (
        string memory roomName,
        uint128 visitors,
        string memory galleryImageProfile,
        uint256 entryFee,
        address owner,
        uint256 createdAt
    ) {
        Room storage room = roomIdToRoom[_roomId];
        return (
            room.roomName,
            room.visitors,
            room.galleryImageProfile,
            room.entryFee,
            room.owner,
            room.createdAt
        );
    }

    // Function to retrieve all arts in a room
    function getArtsInRoom(uint256 _roomId) public view returns (Art[] memory) {
        return roomIdToRoom[_roomId].arts;
    }
    // Additional getter functions and logic remain the same...

    // Function to get all rooms in the museum
    function getAllRooms() public view returns (Room[] memory) {
        return rooms;
    }

}
