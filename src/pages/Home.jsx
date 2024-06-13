import MonthNavigation from "../components/MonthNavigation";
import useStore from "../zustand/store";

export default function Home() {
  const { month, setMonth } = useStore();

  return (
    <main>
      <MonthNavigation month={month} setMonth={setMonth} />
      {/* <CreateExpense month={month} user={user} />
      <ExpenseList /> */}
    </main>
  );
}
