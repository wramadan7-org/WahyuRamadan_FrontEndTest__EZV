"use client";

import { useGetTodosQuery } from "@/store/todoApi";
import TodoCard from "./TodoCard";
import { useState } from "react";
import Pagination from "./Pagination";

const totalItemsLength = 200;
const limit = 10;

export default function TodoList() {
  const [pageOptionState, setPageOptionState] = useState<{
    currentPage: number;
    start: number;
  }>({
    currentPage: 1,
    start: 0,
  });

  const { data, error, isLoading } = useGetTodosQuery({
    start: pageOptionState.start,
    limit,
  });

  const handleChangePage = (page: number) => {
    setPageOptionState({
      currentPage: page,
      start: (page - 1) * limit,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{(error as { message?: string })?.message}</p>;

  return (
    <div className="flex flex-col justify-between gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {data?.map((item, index) => (
          <TodoCard key={index} {...item} />
        ))}
      </div>

      <Pagination
        currentPage={pageOptionState.currentPage}
        itemsPerPage={limit}
        onPageChange={handleChangePage}
        totalItems={totalItemsLength}
      />
    </div>
  );
}
