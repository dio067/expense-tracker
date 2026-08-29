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
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
      <div className='flex flex-col bg-slate-900 p-6 rounded-lg border border-neutral-800 w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto'>
        <h2 className='text-white text-lg font-semibold mb-4'>Edit expense</h2>

        <div className='flex flex-col gap-1.5 mb-4'>
          <label className='text-neutral-300 text-sm font-medium'>
            Category
          </label>
          <div className='relative'>
            <ChartColumnStacked
              className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500'
              size={16}
            />
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category ?? ""}
              className='bg-slate-800 w-full rounded-md text-sm text-neutral-100 border border-slate-700 py-2 pl-9 pr-3 focus:outline-none focus:border-neutral-400 appearance-none'
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
            <TextAlignStart
              className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500'
              size={16}
            />
            <input
              value={description ?? ""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className='bg-slate-800 w-full rounded-md text-sm text-neutral-100 border border-slate-700 py-2 pl-9 pr-3 focus:outline-none focus:border-neutral-400 placeholder:text-neutral-600'
              placeholder='Describe your expense'
            ></input>
          </div>
        </div>

        <div className='flex flex-col gap-1.5 mb-2'>
          <label className='text-neutral-300 text-sm font-medium'>Amount</label>
          <div className='relative'>
            <DollarSign
              className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500'
              size={16}
            />
            <input
              value={amount ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                setAmount(raw === "" ? null : Number(raw));
              }}
              type='number'
              className='bg-slate-800 w-full rounded-md text-sm text-neutral-100 border border-slate-700 py-2 pl-9 pr-3 focus:outline-none focus:border-neutral-400 font-mono placeholder:text-neutral-600 placeholder:font-sans'
              placeholder='0.00'
            ></input>
          </div>
        </div>

        <div className='flex flex-col-reverse sm:flex-row w-full justify-between items-center gap-3 mt-4'>
          <button
            onClick={handleDelete}
            className='flex items-center gap-1.5 text-red-400 text-sm font-medium px-3 py-2 rounded-md hover:bg-red-500/10 transition cursor-pointer'
          >
            <Trash2 size={14} />
            Delete
          </button>

          <div className='flex gap-2'>
            <button
              onClick={() => {
                onClose();
              }}
              className='text-neutral-300 text-sm font-medium px-4 py-2 rounded-md hover:bg-slate-800 transition cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={handleAlter}
              className='bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-neutral-200 transition cursor-pointer'
            >
              Save changes
            </button>
          </div>
        </div>

        {error && (
          <p className='mt-3 text-red-400 text-sm text-center'>{error}</p>
        )}
      </div>
    </div>
  );
}
