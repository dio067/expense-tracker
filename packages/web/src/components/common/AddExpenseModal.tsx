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
      setCategory("");
      setDescription("");
      setError("");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;
