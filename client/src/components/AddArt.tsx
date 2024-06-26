import { useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { uploadToIPFS } from '@/Infura';
import React, {  FormEvent } from 'react';
import { contractABI, contractAddress } from '@/utils/utils';

type FormData = {
  roomName: string;
  entryFee: number;
};

type Props = {
  closeModal: () => void;
};

const AddArt = ({ closeModal }: Props) => {
  const [fileURL, setFileURL] = useState<string | undefined>();
  const [isSubmissionLoading, setSubmissionLoading] = useState<boolean>(false);
  const [isSubmissionSuccessful, setSubmissionSuccessful] = useState<boolean>(false);
  const [fileSubmitted, setFileSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    roomName: '',
    entryFee: 0,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'createRoom',
    args: [formData.roomName, fileURL, formData.entryFee],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
    console.log(fileURL);

      setSubmissionSuccessful(isSuccess);
      setSubmissionLoading(isLoading);
      setFileSubmitted(false);

      closeModal(); // Optionally close the modal on successful form submission

  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const response = await uploadToIPFS(file);
    console.log(response);

    if (response) {
      setFileSubmitted(true);
    }
    setFileURL(response);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center">
                {isSubmissionLoading && (
                  <div className="bg-yellow-200 text-yellow-800 p-2 rounded">Art Additional is pending...</div>
                )}
                {isSubmissionSuccessful && (
                  <div className="bg-green-200 text-green-800 p-2 rounded">Art Additional successful!</div>
                )}
                <h1 className="text-xl font-semibold mb-4">Create Art</h1>
                <button onClick={closeModal} className="text-red-500 font-bold text-3xl p-2">
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
                  Art Name
                </label>
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  value={formData.roomName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Art Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"

                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Art Sound
                </label>
                <input
                  type="file"
                  id="sound"
                  name="sound"

                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    fileSubmitted ? '' : 'opacity-50 cursor-not-allowed'
                  }`}
                  type="button"

                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArt;
