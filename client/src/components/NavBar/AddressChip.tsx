import { createIcon } from '@download/blockies';
import { useToast } from '@/components/ui/use-toast.ts';

type AddressForNavBarProps = {
  address: string;
};

export default function AddressChip(props: AddressForNavBarProps) {
  const { address } = props;

  const { toast } = useToast();



  const addressIcon = createIcon({
    seed: address.toLowerCase(),
  }).toDataURL();

  const displayAddress = `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;

  return (
    <div className="flex shrink-0 items-center rounded-md bg-amber-500 px-5 py-2">
      <div className="text-sm font-medium text-white">{displayAddress}</div>
      <button
        className="-my-0.5 -mr-0.5 ml-1.5 shrink-0 bg-amber-500 px-1.5 py-0.5"
        onClick={() => {
          navigator.clipboard.writeText(address);
          toast({
            title: 'Address copied!',
            duration: 1200,
          });
        }}
      >
        <img
          src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐸</text></svg>"
          alt="Generated address icon"
          className="size-4 rounded-full"
        />
      </button>
    </div>
  );
}
