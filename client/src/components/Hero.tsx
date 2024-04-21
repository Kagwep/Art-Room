import React from "react";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[1250px] bg-hero bg-no-repeat bg-cover bg-center py-20">
      <div className="container mx-auto flex justify-around h-full items-center">
        {/* Virtual Art Gallery */}
        <div className="text-center">
          <div className="font-bold text-cyan-700 text-lg mb-3">Virtual Art Gallery</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">Explore Art in<br />
            <span className="text-gray-700 font-normal">Virtual 3D Environment</span>
          </h1>
          <Link to={'/virtual-gallery'} className='inline-block uppercase font-semibold border-b-2 border-primary text-primary hover:text-cyan-700 transition duration-300 ease-in-out py-1'>Explore Now</Link>
        </div>
      </div>
    </section>


  );
};

export default Hero;
