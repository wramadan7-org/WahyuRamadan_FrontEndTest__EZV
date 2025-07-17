"use client";
import { useCreateTodoMutation } from "@/store/todoApi";
import { FormEvent, useEffect, useRef } from "react";

export default function TodoPopover() {
  const formRef = useRef<HTMLFormElement>(null);

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      payload[key] = value;
    });

    payload.userId = Number(payload.userId);
    payload.completed = payload.completed === "true" ? true : false;

    try {
      await createTodo(payload).unwrap();
      await fetch("/api/todo", { method: "POST" });
      formRef.current?.reset();
      document.getElementById("popover-todo")?.hidePopover();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const popoverEl = document.getElementById("popover-todo");
    if (!popoverEl) return;

    const handleToggle = () => {
      if (!popoverEl.matches(":popover-open")) {
        formRef.current?.reset();
      }
    };

    popoverEl.addEventListener("toggle", handleToggle);

    return () => {
      popoverEl.removeEventListener("toggle", handleToggle);
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-2xl underline">Add Todo</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <label htmlFor="userId">User ID</label>

          <input
            type="number"
            name="userId"
            id="userId"
            placeholder="1"
            defaultValue={0}
            className="border rounded w-full px-3 py-1"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="sunt cum tempora"
            defaultValue={""}
            className="border rounded w-full px-3 py-1"
            required
          />
        </div>

        <input
          type="hidden"
          name="completed"
          id="completed"
          value={"false"}
          className="border rounded w-full"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto sm:mx-0 sm:ml-auto cursor-pointer border-[0.5px] rounded-full px-5 py-1 shadow-md bg-gray-300 dark:bg-gray-700 font-semibold w-full sm:w-fit hover:text-foreground/50 disabled:cursor-wait"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
