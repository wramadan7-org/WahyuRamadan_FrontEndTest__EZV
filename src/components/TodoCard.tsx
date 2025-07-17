import { TodoType } from "@/types/todo";

export default function TodoCard(todo: TodoType) {
  return (
    <div
      id={`${todo?.title}-${todo?.id}`}
      className="flex flex-col bg-cardground border rounded shadow-md shadow-gray-700 p-4 gap-5"
    >
      <div className="flex flex-row flex-wrap-reverse items-center justify-between gap-3">
        <p className="text-sm">#{todo.id}</p>

        <div
          className={`rounded-xl border px-2 py-1 ${
            todo.completed
              ? "bg-green-200 dark:bg-green-700/30 border-green-400 text-green-800 dark:text-green-300"
              : "bg-red-200 dark:bg-red-700/30 border-red-400 text-red-800 dark:text-red-300"
          }`}
        >
          <p className="text-xs">{todo?.completed ? "Done" : "Not Done"}</p>
        </div>
      </div>

      <p className="text-base text-foreground font-semibold">{todo.title}</p>
    </div>
  );
}
