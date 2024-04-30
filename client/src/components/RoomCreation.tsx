import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { contractABI, contractAddress } from "@/utils/utils";

const submitRoom = (roomName: string, fileURL: string, entryFee:number) => {

    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractABI,
        functionName: 'createRoom',
        args: [roomName, fileURL, entryFee],

      });
      
      const { data, write, error } = useContractWrite(config);
      const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });


      return { write, isLoading, isSuccess, error };


}


export default submitRoom;