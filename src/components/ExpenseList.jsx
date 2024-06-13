import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../lib/api/expense";

export default function ExpenseList({ selectedMonth }) {
  const navigate = useNavigate();

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const filteredExpenses = expenses.filter(
    (expense) => expense.month === selectedMonth
  );

  return (
    <section className="max-w-4xl mx-auto mt-8">
      <div className="bg-white shadow-md rounded-md p-4">
        {filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            className="cursor-pointer border-b border-gray-200 py-2"
            onClick={() => {
              navigate(`/detail/${expense.id}`);
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">{expense.date}</span>
                <span className="text-gray-900">{`${expense.item} - ${expense.description} (by ${expense.createdBy})`}</span>
              </div>
              <span className="text-gray-900">
                {expense.amount.toLocaleString()} 원
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
