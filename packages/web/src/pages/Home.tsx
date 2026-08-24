import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MoltenMetal } from "@/components";
import BarChart from "@/components/common/BarChart";
import { useExpenses } from "@/hooks/useExpenses";
import { AddExpenseModel } from "@/components/common/AddExpenseModal";
import { useExpenseStore } from "@/store/expense.store";

export function Home() {
  const [modelOpen, setModelOpen] = useState(false);
  const { user } = useAuth();
  const { createExpense, readExpenses } = useExpenses();
  const { expenses, setExpenses } = useExpenseStore();

  useEffect(() => {
    const loadExpenses = async () => {
      const loadedExpenses = await readExpenses();
      setExpenses(loadedExpenses ?? []);
    };
    loadExpenses();
  }, []);

  let TOTAL_EXPENSES = 0;
  let FOOD_EXPENSES = 0;
  let TRANSPORT_EXPENSE = 0;
  let CLOTHES_EXPENSES = 0;
  let EDUCATION_EXPENSES = 0;
  let BILLS_EXPENSES = 0;
  let OTHER_EXPENSES = 0;

  expenses.map((expense) => {
    TOTAL_EXPENSES = TOTAL_EXPENSES + (expense.amount ?? 0);
    if (expense.category === "Food")
      FOOD_EXPENSES = FOOD_EXPENSES + (expense.amount ?? 0);
    if (expense.category === "Transport")
      TRANSPORT_EXPENSE = TRANSPORT_EXPENSE + (expense.amount ?? 0);
    if (expense.category === "Clothes")
      CLOTHES_EXPENSES = CLOTHES_EXPENSES + (expense.amount ?? 0);
    if (expense.category === "Education")
      EDUCATION_EXPENSES = EDUCATION_EXPENSES + (expense.amount ?? 0);
    if (expense.category === "Bills")
      BILLS_EXPENSES = BILLS_EXPENSES + (expense.amount ?? 0);
    if (expense.category === "Other")
      OTHER_EXPENSES = OTHER_EXPENSES + (expense.amount ?? 0);
  });

  const spendingData = [
    { label: "Food", value: FOOD_EXPENSES },
    { label: "Transport", value: TRANSPORT_EXPENSE },
    { label: "Clothes", value: CLOTHES_EXPENSES },
    { label: "Education", value: EDUCATION_EXPENSES },
    { label: "Bills", value: BILLS_EXPENSES },
    { label: "Other", value: OTHER_EXPENSES },
  ];

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
      </div>
      <div className='mt-16 md:mt-20 relative z-10'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6'>
          <h1 className='text-xl md:text-2xl font-semibold text-[#f5f5f5]'>
            Welcome back, {user?.name ?? ""}...
          </h1>
          <button
            onClick={() => {
              setModelOpen(true);
            }}
            className='bg-transparent backdrop-blur-md text-white px-4 py-2 border border-white/20 rounded-3xl hover:-translate-y-2 transition-all cursor-pointer hover:bg-white hover:text-black self-start sm:self-auto'
          >
            + Add Expenses
          </button>
        </div>
        <AddExpenseModel
          isOpen={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
          onSubmit={createExpense}
        />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-transparent backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20 shadow-sm'>
            <p className='text-sm text-gray-300'>Total income</p>
            <p className='text-xl md:text-2xl font-mono font-bold text-gray-300 mt-1'>
              {user?.income}$
            </p>
          </div>
          <div className='bg-transparent backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20 shadow-sm'>
            <p className='text-sm text-gray-300'>Total Expenses</p>
            <p className='text-xl md:text-2xl font-mono font-bold text-gray-300 mt-1'>
              {TOTAL_EXPENSES}$
            </p>
          </div>
          <div className='bg-transparent backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-5 shadow-sm'>
            <p className='text-sm text-gray-300'>Balance</p>
            <p className='text-xl md:text-2xl font-mono font-bold text-gray-300 mt-1'>
              {user?.balance}$
            </p>
          </div>
        </div>
        <div className='bg-tansparent border backdrop-blur-md border-white/20 rounded-xl p-4 md:p-5 pb-0 shadow-sm mb-6'>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-300 mb-4'>
            Spending Overview
          </h2>
          <div className='h-48 items-center justify-center text-gray-300'>
            <BarChart data={spendingData} />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='bg-transparent p-4 md:p-7 backdrop-blur-md border border-white/20 rounded-xl shadow-sm'>
            <h2 className='text-xl md:text-2xl text-gray-300 mb-4 font-semibold'>
              Recent Transactions
            </h2>

            <ul className='space-y-3'>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>
                  {expenses[expenses.length - 1]?.category}
                </span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {expenses[expenses.length - 1]?.amount}$
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>
                  {" "}
                  {expenses[expenses.length - 2]?.category}
                </span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {expenses[expenses.length - 2]?.amount}$
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>
                  {" "}
                  {expenses[expenses.length - 3]?.category}
                </span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {expenses[expenses.length - 3]?.amount}$
                </span>
              </li>
            </ul>
          </div>
          <div className='bg-transparent backdrop-blur-md p-4 md:p-7 border border-white/20 rounded-xl shadow-sm'>
            <h2 className='text-xl md:text-2xl text-gray-300 mb-4 font-semibold'>
              Spending by Category
            </h2>

            <ul className='space-y-3'>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>Food</span>
                <span className='text-gray-200 font-mono'>
                  {Math.round((FOOD_EXPENSES / TOTAL_EXPENSES) * 100)}%
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>Transport</span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {Math.round((TRANSPORT_EXPENSE / TOTAL_EXPENSES) * 100)}%
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>Bills</span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {Math.round((BILLS_EXPENSES / TOTAL_EXPENSES) * 100)}%
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>Clothes</span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {Math.round((CLOTHES_EXPENSES / TOTAL_EXPENSES) * 100)}%
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>Education</span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {Math.round((EDUCATION_EXPENSES / TOTAL_EXPENSES) * 100)}%
                </span>
              </li>
              <li className='flex justify-between text-base md:text-lg'>
                <span className='text-gray-200'>Other</span>
                <span className='text-gray-200 font-mono'>
                  {" "}
                  {Math.round((OTHER_EXPENSES / TOTAL_EXPENSES) * 100)}%
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
