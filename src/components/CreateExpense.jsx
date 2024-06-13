import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { postExpense } from "../lib/api/expense";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";

export default function CreateExpense() {
  const { month, user } = useStore();
  const [newDate, setNewDate] = useState(
    `2024-${String(month).padStart(2, "0")}-01`
  );
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      navigate(0);
    },
  });

  const handleAddExpense = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(newDate)) {
      alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }

    const parsedAmount = parseInt(newAmount, 10);
    if (!newItem || parsedAmount <= 0) {
      alert("유효한 항목과 금액을 입력해주세요.");
      return;
    }

    const newExpense = {
      id: uuidv4(),
      month: parseInt(newDate.split("-")[1], 10),
      date: newDate,
      item: newItem,
      amount: parsedAmount,
      description: newDescription,
      createdBy: user.userId,
    };

    mutation.mutate(newExpense);
    setNewDate(`2024-${String(month).padStart(2, "0")}-01`);
    setNewItem("");
    setNewAmount("");
    setNewDescription("");
  };

  return (
    <section className="max-w-md mx-auto mt-5 p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 font-bold mb-2"
        ></label>
        <input
          type="text"
          id="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="item"
          className="block text-gray-700 font-bold mb-2"
        ></label>
        <input
          type="text"
          id="item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="지출 항목"
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-gray-700 font-bold mb-2"
        ></label>
        <input
          type="number"
          id="amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          placeholder="지출 금액"
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        ></label>
        <input
          type="text"
          id="description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="지출 내용"
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        onClick={handleAddExpense}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      >
        저장
      </button>
    </section>
  );
}
