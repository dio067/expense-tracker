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
