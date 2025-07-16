"use client";

import { useGetTodosQuery } from "@/store/todoApi";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const { data, error, isLoading } = useGetTodosQuery({ start: 10, limit: 10 });

  console.log("DATA: ", data);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{(error as { message?: string })?.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {data?.map((item, index) => (
        <TodoCard key={index} {...item} />
      ))}
    </div>
  );
}
