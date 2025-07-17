"use client";

import { useGetTodosQuery } from "@/store/todoApi";
import TodoCard from "./TodoCard";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { TodoListProps } from "@/types/todo";
import TodoCardSkeleton from "./TodoCardSkeleton";

const totalItemsLength = 200;
const limit = 10;

export default function TodoList({ initialTodos }: TodoListProps) {
  const [pageOptionState, setPageOptionState] = useState<{
    currentPage: number;
    start: number;
  }>({
    currentPage: 1,
    start: 0,
  });
  const [isFirstLoadPageState, setIsFirstLoadPageState] =
    useState<boolean>(true);

  const {
    data: todos = initialTodos,
    error,
    isLoading,
    refetch,
  } = useGetTodosQuery(
    {
      start: pageOptionState.start,
      limit,
    },
    {
      pollingInterval: 60000,
      skip: isFirstLoadPageState,
      refetchOnMountOrArgChange: 60,
    }
  );

  useEffect(() => {
    let lastFocusTime = Date.now();

    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusTime > 30000 && !isFirstLoadPageState) {
        refetch();
        lastFocusTime = now;
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetch, isFirstLoadPageState]);

  const handleChangePage = (page: number) => {
    setPageOptionState({
      currentPage: page,
      start: (page - 1) * limit,
    });
    setIsFirstLoadPageState(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <TodoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex w-full h-full min-h-96">
        <h1 className="text-black dark:text-white text-center m-auto font-bold text-3xl text-wrap">
          Oops! Something went wrong. Please try again.
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col justify-between gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {todos?.map((item, index) => (
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
