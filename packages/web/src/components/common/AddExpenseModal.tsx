import { useState } from "react";
import { ChartColumnStacked, TextAlignStart, DollarSign } from "lucide-react";

type AddExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expense: {
    amount: number;
    category: string;
    description: string;
  }) => void;
};

export function AddExpenseModel({
  isOpen,
  onClose,
  onSubmit,
}: AddExpenseModalProps) {
  const [error, setError] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleAddtion = async () => {
    if (!amount || !description || !category) {
      setError("All fields are mandatory");
      return;
    }
    try {
      await onSubmit({ amount, category, description });
      setAmount(null);
      setCategory("Food");
      setDescription("");
      setError("");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='flex flex-col items-center justify-center bg-black/80 p-4 md:p-6 rounded-xl border border-white/20 w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto'>
        <div className='flex flex-col mb-2 w-full'>
          <label className='text-gray-300 text-xl md:text-2xl m-2'>
            Category
          </label>
          <div className='relative'>
            <TextAlignStart
              className='absolute top-2/5 left-4 md:left-7 text-gray-400'
              size={18}
            />
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              className='bg-black/60 w-full md:w-96 rounded-xl text-sm md:text-base m-2 md:m-4 text-white border border-white/20 p-2 px-4 pl-10 focus:outline-none appearance-none'
            >
              <option value='Food'>Food</option>
              <option value='Transport'>Transport</option>
              <option value='Clothes'>Clothes</option>
              <option value='Education'>Education</option>
              <option value='Bills'>Bills</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col mx-2 md:mx-4 mb-2 w-full'>
          <label className='text-gray-300 text-xl md:text-2xl m-2'>
            Description
          </label>
          <div className='relative'>
            <ChartColumnStacked
              className='absolute top-2/5 left-4 md:left-7 text-gray-400'
              size={18}
            />
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className='bg-black/60 w-full md:w-96 rounded-xl text-sm md:text-base m-2 md:m-4 text-white border border-white/20 p-2 px-4 pl-10 focus:outline-none placeholder:text-sm md:placeholder:text-base'
              placeholder='Describe your expense'
            ></input>
          </div>
        </div>
        <div className='flex flex-col mb-2 w-full'>
          <label className='text-gray-300 text-xl md:text-2xl m-2'>
            Amount
          </label>
          <div className='relative'>
            <DollarSign
              className='absolute top-2/5 left-4 md:left-7 text-gray-400'
              size={18}
            />
            <input
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              type='number'
              className='bg-black/60 w-full md:w-96 rounded-xl text-sm md:text-base m-2 md:m-4 text-white border border-white/20 p-2 px-4 pl-10 focus:outline-none placeholder:text-sm md:placeholder:text-base font-mono placeholder:font-pixelify'
              placeholder='Price'
            ></input>
          </div>
        </div>
        <div className='flex justify-center md:justify-end w-full mt-4'>
          <button
            onClick={() => {
              onClose();
              setError("");
            }}
            className='text-white hover:text-black bg-transparent hover:bg-white backdrop-blur-2xl px-5 py-2 transition-all cursor-pointer'
          >
            Cancel
          </button>
          <button
            onClick={handleAddtion}
            className='text-white ml-4 hover:text-black bg-transparent hover:bg-white border border-white/20 backdrop-blur-2xl px-5 py-2 transition-all cursor-pointer'
          >
            +Add
          </button>
        </div>
        <h2 className='m-2 text-red-300 text-center'>{error}</h2>
      </div>
    </div>
  );
}
