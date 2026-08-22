import { useState, useEffect } from "react";
import { MoltenMetal } from "@/components";
import { useExpenses } from "@/hooks/useExpenses";
import { useExpenseStore } from "@/store/expense.store";
import { EllipsisVertical } from "lucide-react";
import { AddExpenseModel } from "@/components/common/AddExpenseModal";
import { AlterExpenseModal } from "@/components/common/AlterExpenseModal";

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

  const openAlter = (expense) => {
    setAlterOpen(true);
    setSelectedExpense(expense);
  };

  const renderedCards = isLoading
    ? Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className='border border-white/10 rounded-lg p-4 space-y-2'
        >
          <div className='h-4 w-2/3 rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
          <div className='h-4 w-1/2 rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
          <div className='h-4 w-1/3 rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
        </div>
      ))
    : expenses.map((expense) => (
        <div key={expense.id} className='border border-white/10 rounded-lg p-4'>
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
            <div className='h-4 w-full rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
          </td>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
          </td>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
          </td>
          <td className='py-3 px-4 border border-white/10'>
            <div className='h-4 w-full rounded bg-gradient-to-r from-black via-gray-700 to-black bg-[length:200%_100%] animate-pulse' />
          </td>
          <td className='py-3 px-4 border border-white/10'></td>
        </tr>
      ))
    : expenses.map((expense) => (
        <tr key={expense.id} className='border border-white/10'>
          <td className='py-3 px-4 text-gray-200 border font-mono border-white/10'>
            {new Date(expense.createdAt).toLocaleDateString()}
          </td>
          <td className='py-3 px-4 text-gray-200 border border-white/10'>
            {expense.category}
          </td>
          <td className='py-3 px-4 text-gray-200 border border-white/10'>
            {expense.description}
          </td>
          <td className='py-3 px-4 text-left font-mono text-red-400 border border-white/10'>
            - {expense.amount}
          </td>
          <td className='flex py-3 px-4 text-gray-200 border border-white/10 justify-center items-center'>
            <button
              onClick={() => openAlter(expense)}
              className='backdrop-blur cursor-pointer hover:text-gray-500'
            >
              <EllipsisVertical />
            </button>
          </td>
        </tr>
      ));
