

import React, { useState, FormEvent } from 'react';

type FormData = {
  roomName: string;
  category: string;
  description: string;
  image: File | null;
};

type Props = {
  closeModal: () => void;
};

const CreateRoom = ({ closeModal }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    roomName: '',
    category: '',
    description: '',
    image: null,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);  // Here you would handle form submission, like sending data to a server
    closeModal();  // Optionally close the modal on successful form submission
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold mb-4">Create Art Room</h1>
                <button onClick={closeModal} className="text-red-500 font-bold text-3xl p-2">&times;</button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
                  Room Name
                </label>
                <input type="text" id="roomName" name="roomName" value={formData.roomName}
                  onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input type="text" id="category" name="category" value={formData.category}
                  onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea id="description" name="description" value={formData.description}
                  onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Profile Image
                </label>
                <input type="file" id="image" name="image"
                  onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
