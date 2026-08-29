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

export function AddExpenseModal({
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
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
      <div className='flex flex-col bg-neutral-900 p-6 rounded-lg border border-neutral-800 w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto'>
        <h2 className='text-white text-lg font-semibold mb-4'>Add expense</h2>

        <div className='flex flex-col gap-1.5 mb-4'>
          <label className='text-neutral-300 text-sm font-medium'>
            Category
          </label>
          <div className='relative'>
            <TextAlignStart
              className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500 pointer-events-none'
              size={16}
            />
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              className='bg-neutral-950 w-full rounded-md text-sm text-neutral-100 border border-neutral-700 py-2 pl-9 pr-3 focus:outline-none focus:border-emerald-500 appearance-none'
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

        <div className='flex flex-col gap-1.5 mb-4'>
          <label className='text-neutral-300 text-sm font-medium'>
            Description
          </label>
          <div className='relative'>
            <ChartColumnStacked
              className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500 pointer-events-none'
              size={16}
            />
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className='bg-neutral-950 w-full rounded-md text-sm text-neutral-100 border border-neutral-700 py-2 pl-9 pr-3 focus:outline-none focus:border-emerald-500 placeholder:text-neutral-600'
              placeholder='Describe your expense'
            ></input>
          </div>
        </div>

        <div className='flex flex-col gap-1.5 mb-2'>
          <label className='text-neutral-300 text-sm font-medium'>Amount</label>
          <div className='relative'>
            <DollarSign
              className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500 pointer-events-none'
              size={16}
            />
            <input
              onChange={(e) => {
                const raw = e.target.value;
                setAmount(raw === "" ? null : Number(raw));
              }}
              type='number'
              className='bg-neutral-950 w-full rounded-md text-sm text-neutral-100 border border-neutral-700 py-2 pl-9 pr-3 focus:outline-none focus:border-emerald-500 font-mono placeholder:text-neutral-600 placeholder:font-sans'
              placeholder='0.00'
            ></input>
          </div>
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <button
            onClick={() => {
              onClose();
              setError("");
            }}
            className='text-neutral-300 text-sm font-medium px-4 py-2 rounded-md hover:bg-neutral-800 transition cursor-pointer'
          >
            Cancel
          </button>
          <button
            onClick={handleAddtion}
            className='bg-white hover:bg-white/70 text-black text-sm font-medium px-4 py-2 rounded-md transition cursor-pointer'
          >
            Add expense
          </button>
        </div>

        {error && (
          <p className='mt-3 text-red-400 text-sm text-center'>{error}</p>
        )}
      </div>
    </div>
  );
}
