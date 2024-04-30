import React from 'react'
import glassimage from '../img/glass1.webp'
import { Link } from 'react-router-dom'
import AddressChip from '@/components/NavBar/AddressChip.tsx';

const Rooms = () => {

  const address = "0x121139256b867d4efA2Ebc0fA44B8765B634a3dF"
  
  return (
    <div>
      <section className="py-28">
        <div className="container mx-auto">
           <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Galleries</h1> 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                    <div 
                        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"  
                        title="Woman holding a mug"
                        style={{ backgroundImage: `url(${glassimage})` }}
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
                          <Link to={`/room/1`}>
                            <h2 className="font-semibold mb-1">  Demo Art Room </h2>
                          </Link>
                          
                        </div>
                        <p className="text-gray-700 text-base">
                          This Demo Art room showcases the possibilties of Art Room.
                          <Link to={`/room/1`}>
                            <p className="text-blue-500">  visit</p>
                          </Link>

                        </p>
                        </div>
                        <div className="flex items-center">
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none"></p>
                            <AddressChip  address={address} />
                            <p> </p>
                            <p className="text-gray-600">Aug 18</p>
                        </div>
                        </div>
                    </div>
            </div>
          </div>     
        </div>
      </section>
        
    </div>
  )
}

export default Rooms