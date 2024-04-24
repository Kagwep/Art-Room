import React, {useState} from 'react';
import CreateRoom from './CreateRoom';
import GrassLand from '../img/grassland.webp'
import { Link } from 'react-router-dom';

const MyRooms = () => {

    const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
    <section className="py-28">
        <div className="container mx-auto">
          <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-3 px-4 rounded"
                onClick={() => setModalOpen(true)}
            >
                Create Room
            </button>

            {isModalOpen && <CreateRoom closeModal={() => setModalOpen(false)} />}
        </div>

        <div className="py-5 my-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={GrassLand} alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            
                            <Link to={`/my-galleries/${1}`}>
                                The Coldest Sunset
                            </Link>
                            </div>
                        <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                    </div>

            </div>
        </div>


        </div>
    </section>
    </div>
  )
}

export default MyRooms