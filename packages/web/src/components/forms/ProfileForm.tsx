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
      <div className='flex flex-col bg-slate-900 backdrop-blur-2xl border border-slate-800 p-4 md:p-5 rounded-2xl w-full max-w-md mt-10'>
        <div className='flex w-full items-center justify-center m-3'>
          <label className='text-white text-xl font-semibold mb-4'>
            Edit Profile
          </label>
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <UserPen
              color='#ffffff'
              className='mt-1 text-slate-300'
              size={14}
            />
            <label className='text-slate-300 ml-2 text-sm font-medium'>
              Name
            </label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border border-slate-700 bg-slate-800 text-base text-white pl-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 mt-2'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <MessageCircleQuestionMark
              color='#ffffff'
              className='mt-1 text-slate-300'
              size={14}
            />
            <label className='text-slate-300 ml-2 text-sm font-medium'>
              Age
            </label>
          </div>{" "}
          <input
            value={age ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setAge(value === "" ? null : parseInt(value));
            }}
            className='border border-slate-700 bg-slate-800 text-base text-white pl-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 mt-2'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            {" "}
            <BanknoteArrowUp
              color='#ffffff'
              className='mt-1 text-slate-300'
              size={14}
            />
            <label className='text-slate-300 ml-2 text-sm font-medium'>
              Income
            </label>
          </div>{" "}
          <input
            value={income ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setIncome(value === "" ? null : parseInt(value));
            }}
            className='border border-slate-700 bg-slate-800 text-base text-white pl-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 mt-2'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <div className='flex flex-row'>
            <Scale color='#ffffff' className='mt-1 text-slate-300' size={14} />
            <label className='text-slate-300 ml-2 text-sm font-medium'>
              Balance
            </label>
          </div>{" "}
          <input
            value={balance ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setBalance(value === "" ? null : parseInt(value));
            }}
            className='border border-slate-700 bg-slate-800 text-base text-white pl-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 mt-2'
          />
        </div>
        <button
          onClick={handleEditProfile}
          className='bg-white px-4 py-2.5 text-black font-semibold rounded-lg mt-4 cursor-pointer hover:bg-gray-200 transition'
        >
          Save changes
        </button>
        <div className='flex justify-center items-center m-2 text-red-300 hover:text-red-900'>
          <button
            onClick={() => navigate("/dashboard")}
            className='flex items-center justify-center gap-2 mt-3 text-sm text-red-400 hover:text-red-300 cursor-pointer transition'
          >
            <Trash2 size={15} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
