import { useState, useEffect } from "react";
import { ChartColumnStacked, TextAlignStart, DollarSign } from "lucide-react";
import type { Expense, updateExpensePayload } from "@/types";
import { useExpenseStore } from "@/store/expense.store";
import { Trash2 } from "lucide-react";

type AlterExpenseModalProps = {
  isOpen: boolean;
  expense: Expense | null;
  onClose: () => void;
  onSubmit: (id: number | undefined, payload: updateExpensePayload) => void;
  onDelete: (id: number | undefined) => void;
};

export function AlterExpenseModal({
  isOpen,
  expense,
  onClose,
  onSubmit,
  onDelete,
}: AlterExpenseModalProps) {
  const [category, setCategory] = useState<string | null>(
    expense?.category ?? null,
  );
  const [description, setDescription] = useState(expense?.description ?? "");
  const [amount, setAmount] = useState<number | null>(expense?.amount ?? null);
  const { error, setError } = useExpenseStore();

  useEffect(() => {
    if (expense) {
      setCategory(expense.category);
      setDescription(expense.description);
      setAmount(expense.amount);
      setError("");
    }
  }, [expense]);

  const handleAlter = async () => {
    if (
      expense?.category === category &&
      expense?.description === description &&
      expense?.amount === amount
    ) {
      setError("Nothing changed");
      return;
    }
    await onSubmit(expense?.id, { description, category, amount });
    onClose();
  };

  const handleDelete = async () => {
    await onDelete(expense?.id);
    onClose();
  };

  if (!isOpen || !expense) return null;
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='flex flex-col items-center justify-center bg-black/80 p-4 md:p-6 rounded-xl border border-white/20 w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto'>
        <div className='flex flex-col mt-4 mx-2 md:mx-4 mb-2 w-full'>
          <label className='text-gray-300 text-xl md:text-2xl m-2'>
            Category
          </label>
          <div className='relative'>
            <ChartColumnStacked
              className='absolute top-2/5 left-4 md:left-7 text-gray-400'
              size={18}
            />
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category ?? ""}
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
        <div className='flex flex-col mb-2 mx-2 md:mx-0 w-full'>
          <label className='text-gray-300 text-xl md:text-2xl m-2'>
            Description
          </label>
          <div className='relative'>
            <TextAlignStart
              className='absolute top-2/5 left-4 md:left-7 text-gray-400'
              size={18}
            />
            <input
              value={description ?? ""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className='bg-black/60 w-full md:w-96 rounded-xl text-sm md:text-base m-2 md:m-4 text-white border border-white/20 p-2 px-4 pl-10 focus:outline-none placeholder:text-sm md:placeholder:text-base'
              placeholder='Describe your expense'
            ></input>
          </div>
        </div>
        <div className='flex flex-col mb-2 mx-2 md:mx-0 w-full'>
          <label className='text-gray-300 text-xl md:text-2xl m-2'>
            Amount
          </label>
          <div className='relative'>
            <DollarSign
              className='absolute top-2/5 left-4 md:left-7 text-gray-400'
              size={18}
            />
            <input
              value={amount ?? ""}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              type='number'
              className='bg-black/60 w-full md:w-96 rounded-xl text-sm md:text-base m-2 md:m-4 text-white border border-white/20 p-2 px-4 pl-10 focus:outline-none placeholder:text-sm md:placeholder:text-base font-mono placeholder:font-pixelify'
              placeholder='Price'
            ></input>
          </div>
        </div>
        <div className='flex flex-col-reverse sm:flex-row w-full justify-between gap-2 sm:gap-0'>
          <div className='flex flex-row text-red-300 mt-5 mb-1 ml-2 sm:ml-4 hover:bg-red-900/70 hover:text-white rounded-2xl justify-center sm:justify-start'>
            <Trash2 color='#FFCCCB' size={15} className='ml-2 mt-3' />
            <button
              onClick={handleDelete}
              className='py-2 pr-4 pl-1.5 cursor-pointer'
            >
              Delete
            </button>
          </div>
          <div className='text-white transition-all flex justify-center sm:justify-end'>
            <button
              onClick={() => {
                onClose();
              }}
              className='mt-5 m-2 sm:m-4 mb-1 hover:bg-white/10 px-4 py-2 cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={handleAlter}
              className='mt-5 m-2 sm:m-4 mb-1 bg-white text-black px-4 py-2 hover:bg-white/30 hover:text-black/50 cursor-pointer rounded-3xl'
            >
              Edit
            </button>
          </div>
        </div>
        <h2 className='m-2 text-red-300 text-center'>{error}</h2>
      </div>
    </div>
  );
}
