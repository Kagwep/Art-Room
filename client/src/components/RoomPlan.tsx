import React, { useContext,useEffect, useRef,useState } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../contexts/RoomsContext";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImageBoard from './ImageBoard';
import { wallFormats } from "@/utils/wallFormats";
import AddArt from "./AddArt";


const RoomPlan = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string>();

  const names = Object.keys(wallFormats); // Extract names from wallFormats

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNameClick = (name: string | React.SetStateAction<null>) => {
    setSelectedName(name as string);
    setIsOpen(false);
  };
  
  return (
    <>
    <div className="pt-36 px-20 mb-2">
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Art
        </button>

        {isModalOpen && <AddArt closeModal={() => setModalOpen(false)} />}
      </div>
    </div>
    <div className=" text-center px-20">
       {/* Dropdown button */}
       <div>
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          {selectedName ? selectedName : 'Select a name'}
          {/* Dropdown arrow */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.7-.29l-3.7-3.7a1 1 0 111.41-1.42L10 9.59l3.29-3.3a1 1 0 111.42 1.42l-4 4a1 1 0 01-.7.29z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* Dropdown content */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 ">
          <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {names.map((name, index) => (
              <button
                key={index}
                onClick={() => handleNameClick(name)}
                className={`${
                  selectedName === name
                    ? 'bg-green-700 text-gray-900'
                    : 'text-green-700 hover:bg-green-100 hover:text-gray-900'
                } block w-full text-left px-4 py-2 text-sm`}
                role="menuitem"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Image display */}
      {selectedName && (
        <div className="mt-2">
          <img
            src={wallFormats[selectedName]} // Use wallFormats to get the image URL based on the selected name
            alt={selectedName}
            className="w-80 h-80 mx-auto"
          />
        </div>
      )}
    </div>
    <DndProvider backend={HTML5Backend}>
    <div>
        <section className="py-2 ">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-10 text-center">Room Plan</h1>   
                <ImageBoard />   
            </div>
        </section>
        
    </div>
  </DndProvider>
    </>

  )
}

export default RoomPlan