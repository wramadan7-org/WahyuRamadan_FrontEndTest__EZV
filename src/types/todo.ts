export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoListProps = {
  initialTodos: TodoType[];
};
