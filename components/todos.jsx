import { fetchTodos } from "@/app/features/todos/todoSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const isError = useSelector((state) => state.todos.isError);

  console.log(todos, "todos");

  //   useEffect(() => {
  //     dispatch(fetchTodos());
  //   }, [dispatch]);
  if (!todos)
    return (
      <div>
        <h1>Click here to Fetch Todos</h1>
        <button
          onClick={() => dispatch(fetchTodos())}
          className="text-sm px-2 py-0.5 border border-gray-800"
        >
          Fetch Data
        </button>
      </div>
    );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading todos</div>;

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border border-gray-300 my-2 p-2"
          >
            <span>{todo.userId}</span>
            <span>{todo.title}</span>
            <span className="text-sm">
              {todo.completed ? <p>Not Complted</p> : <p>Completed</p>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
