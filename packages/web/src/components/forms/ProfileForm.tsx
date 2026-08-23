import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPen,
  MessageCircleQuestionMark,
  BanknoteArrowUp,
  Scale,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

export function ProfileForm({ user }: { user: User | null }) {
  const { patchUser } = useAuth();
  const { setIsLoading, setError } = useAuthStore();
  const [name, setName] = useState(user?.name ?? "");
  const [income, setIncome] = useState<number | null>(user?.income ?? null);
  const [age, setAge] = useState<number | null>(user?.age ?? null);
  const [balance, setBalance] = useState<number | null>(user?.balance ?? null);

  const navigate = useNavigate();

  const handleEditProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await patchUser({ name, age, balance, income });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to edit edit profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex p-4 md:p-6 min-h-screen items-center justify-center'>
      <div className='flex flex-col bg-transparent backdrop-blur-2xl border border-white/30 p-4 md:p-5 rounded-2xl w-full max-w-md mt-10'>
        <div className='flex w-full items-center justify-center m-3'>
          <label className='text-white m-2 text-xl md:text-2xl'>
            Profile Editor
          </label>
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <UserPen color='#ffffff' className='mt-3.5' size={18} />
            <label className='text-white m-2 text-xl md:text-2xl'>Name</label>
          </div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className='border border-white/20 text-lg md:text-xl py-2 text-white pl-3 rounded-2xl focus:outline-none'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <MessageCircleQuestionMark
              color='#ffffff'
              className='mt-3.5'
              size={18}
            />
            <label className='text-white m-2 text-xl md:text-2xl'>Age</label>
          </div>{" "}
          <input
            value={age ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setAge(value === "" ? null : parseInt(value));
            }}
            className='border border-white/20 text-lg md:text-xl text-white pl-3 py-2 rounded-2xl focus:outline-none'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <BanknoteArrowUp color='#ffffff' className='mt-3.5' size={18} />
            <label className='text-white m-2 text-xl md:text-2xl'>Income</label>
          </div>{" "}
          <input
            value={income ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setIncome(value === "" ? null : parseInt(value));
            }}
            className='border border-white/20 text-lg md:text-xl text-white pl-3 py-2 rounded-2xl focus:outline-none'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <Scale color='#ffffff' className='mt-3.5' size={18} />
            <label className='text-white m-2 text-xl md:text-2xl'>
              Balance
            </label>
          </div>{" "}
          <input
            value={balance ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setBalance(value === "" ? null : parseInt(value));
            }}
            className='border border-white/20 text-lg md:text-xl text-white pl-3 py-2 rounded-2xl focus:outline-none'
          />
        </div>
        <button
          onClick={handleEditProfile}
          className='bg-white px-4 py-2 text-black border border-white/20 font-semibold rounded-2xl m-4 cursor-pointer hover:bg-white/40 hover:text-black/80'
        >
          Edit
        </button>
        <div className='flex justify-center items-center m-2 text-red-300 hover:text-red-900'>
          <Trash2 className='m-2' size={15} />
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className='font-semibold rounded-2xl mt-1 cursor-pointer'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
