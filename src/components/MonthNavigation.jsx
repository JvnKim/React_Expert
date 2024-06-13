import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../lib/api/expense";
import ExpenseList from "./ExpenseList";
import useStore from "../zustand/store";
import CreateExpense from "./CreateExpense";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function MonthNavigation() {
  const { user, month, setMonth, setExpenses } = useStore();

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    onSuccess: (data) => {
      setExpenses(data); // 데이터를 Zustand 상태에 저장
    },
  });

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth); // 선택한 월을 Zustand 상태에 업데이트
  };

  return (
    <section>
      <div className="flex space-x-2">
        {MONTHS.map((element) => (
          <button
            key={element}
            className={`px-4 py-2 rounded-md focus:outline-none ${
              month === element
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleMonthClick(element)}
          >
            {`${element}월`}
          </button>
        ))}
      </div>
      <CreateExpense month={month} user={user} />
      <ExpenseList expenses={expenses} selectedMonth={month} />
    </section>
  );
}
