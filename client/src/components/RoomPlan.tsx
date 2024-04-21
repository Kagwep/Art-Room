import React, { useContext,useEffect, useRef,useState } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../contexts/RoomsContext";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImageBoard from './ImageBoard';


const RoomPlan = () => {
  return (
    <DndProvider backend={HTML5Backend}>
    <div>
        <section className="py-28">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-10 text-center">Room Plan</h1>   
                <ImageBoard />   
            </div>
        </section>
        
    </div>
  </DndProvider>
  )
}

export default RoomPlan