import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="p-8 sm:20 flex flex-col items-start justify-start gap-16">
      <div className="flex flex-row w-full gap-10 justify-between items-center">
        <h1 className="font-bold text-2xl sm:text-4xl underline italic">
          Todo List
        </h1>

        <button
          type="button"
          className="bg-background border shadow-md shadow-gray-700 px-5 py-1 rounded-sm cursor-pointer group"
          popoverTarget="popover-todo"
        >
          <p className="font-semibold group-hover:text-foreground/60">
            Add Todo
          </p>
        </button>
      </div>

      <TodoList />

      <div
        popover="auto"
        id="popover-todo"
        className="top-1/2 left-1/2 transform -translate-x-1/2 w-fit h-fit bg-[#f3f3f3] dark:bg-[#222222] text-[#171717] dark:text-[#ededed] p-8 rounded-md min-w-72 shadow-md shadow-gray-700 border"
      >
        POPOVERRRRRR
      </div>
    </main>
  );
}
