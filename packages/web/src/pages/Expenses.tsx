import { useState, useEffect } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { useExpenseStore } from "@/store/expense.store";
import { EllipsisVertical } from "lucide-react";
import { AddExpenseModal, AlterExpenseModal, MoltenMetal } from "@/components";
import type { Expense } from "@/types";

export function Expenses() {
  const [modelOpen, setModelOpen] = useState(false);
  const [alterOpen, setAlterOpen] = useState(false);
  const { createExpense, readExpenses, updateExpense, deleteExpense } =
    useExpenses();
  const {
    expenses,
    setExpenses,
    isLoading,
    selectedExpense,
    setSelectedExpense,
  } = useExpenseStore();

  useEffect(() => {
    const loadExpenses = async () => {
      const loadedExpenses = await readExpenses();
      setExpenses(loadedExpenses ?? []);
    };
    loadExpenses();
  }, []);

  const openAlter = (expense: Expense) => {
    setAlterOpen(true);
    setSelectedExpense(expense);
  };

  const renderedCards = isLoading
    ? Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className='border border-white/10 rounded-lg p-4 space-y-2'
        >
          <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />
          <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />
          <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />
        </div>
      ))
    : expenses.map((expense) => (
        <div
          key={expense.id}
          className='bg-neutral-900 border border-neutral-800 rounded-lg p-4'
        >
          {" "}
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-gray-200 font-medium'>{expense.category}</p>
              <p className='text-gray-400 text-sm mt-1'>
                {expense.description}
              </p>
              <p className='text-gray-500 text-xs font-mono mt-1'>
                {new Date(expense.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <span className='text-red-400 font-mono'>- {expense.amount}</span>
              <button
                onClick={() => openAlter(expense)}
                className='backdrop-blur cursor-pointer hover:text-gray-500 text-gray-200'
              >
                <EllipsisVertical size={18} />
              </button>
            </div>
          </div>
        </div>
      ));

  const renderedRows = isLoading
    ? Array.from({ length: 9 }).map((_, i) => (
        <tr key={i} className='border border-white/10'>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />{" "}
          </td>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />{" "}
          </td>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />{" "}
          </td>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-neutral-800 animate-pulse' />{" "}
          </td>
          <td className='py-3 px-4 border border-white/10'></td>
        </tr>
      ))
    : expenses.map((expense) => (
        <tr
          key={expense.id}
          className='border-b border-neutral-800 hover:bg-white/5 transition'
        >
          <td className='py-3 px-4 text-neutral-300 font-mono text-sm'>
            {new Date(expense.createdAt).toLocaleDateString()}
          </td>
          <td className='py-3 px-4'>
            <span className='inline-block px-2 py-1 rounded-md bg-neutral-800 text-neutral-200 text-xs font-medium'>
              {expense.category}
            </span>
          </td>
          <td className='py-3 px-4 text-neutral-300 text-sm'>
            {expense.description}
          </td>
          <td className='py-3 px-4 text-left font-mono text-red-400'>
            -{expense.amount}
          </td>
          <td className='py-3 px-4 text-neutral-300'>
            <button
              onClick={() => openAlter(expense)}
              className='hover:text-white cursor-pointer'
            >
              <EllipsisVertical size={18} />
            </button>
          </td>
        </tr>
      ));

  return (
    <div className='relative min-h-screen p-4 md:p-10 bg-black'>
      <div className='absolute inset-0 z-0'>
        <MoltenMetal
          color1='#0B0D17'
          color2='#151A2E'
          color3='#FFFFFF'
          speed={0.8}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode='molten'
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
        />
        <div className='absolute inset-0 bg-neutral-900/40'></div>
      </div>
      <div className='mt-16 md:mt-20 relative z-10'>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
          <h1 className='text-white text-xl md:text-2xl font-semibold'>
            All Expenses
          </h1>
          <button
            onClick={() => setModelOpen(true)}
            className='bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition self-start sm:self-auto'
          >
            + Add Expense
          </button>
        </div>

        <AddExpenseModal
          isOpen={modelOpen}
          onClose={() => setModelOpen(false)}
          onSubmit={createExpense}
        />
        <AlterExpenseModal
          isOpen={alterOpen}
          expense={selectedExpense}
          onClose={() => setAlterOpen(false)}
          onSubmit={updateExpense}
          onDelete={deleteExpense}
        />

        <div className='md:hidden mt-5 space-y-3'>{renderedCards}</div>

        <div className='hidden md:block mt-5'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-neutral-800'>
                <th className='py-3 px-4 text-sm font-medium text-neutral-400'>
                  Date
                </th>
                <th className='py-3 px-4 text-sm font-medium text-neutral-400'>
                  Category
                </th>
                <th className='py-3 px-4 text-sm font-medium text-neutral-400'>
                  Description
                </th>
                <th className='py-3 px-4 text-sm font-medium text-neutral-400'>
                  Amount
                </th>
                <th className='py-3 px-4 text-sm font-medium text-neutral-400'></th>
              </tr>
            </thead>
            <tbody>{renderedRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
