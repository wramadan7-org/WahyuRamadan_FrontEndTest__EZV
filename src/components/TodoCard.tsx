import { Todo } from "@/types/todo";

export default function TodoCard(todo: Todo) {
  return (
    <div
      id={`${todo?.title}-${todo?.id}`}
      className="flex flex-col bg-cardground border rounded shadow-md shadow-gray-700 p-4 gap-5"
    >
      <div className="flex flex-row flex-wrap-reverse items-center justify-between gap-3">
        <p className="text-sm">#{todo.id}</p>

        <div className="rounded-xl border px-2 py-1">
          <p className="text-xs">
            {todo?.completed ? "Selesai" : "Belum Selesai"}
          </p>
        </div>
      </div>

      <p className="text-base text-foreground font-semibold">{todo.title}</p>
    </div>
  );
}
