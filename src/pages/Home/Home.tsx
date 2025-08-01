import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetTodosApiQuery, type Todo } from "../../app/api/apiSlice";
import { setTodos, deleteTodo, updateTodo } from "../../features/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "notiflix";

const Home: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetTodosApiQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const todos =
    useSelector((state: { todos: { todos: Todo[] } }) => state.todos.todos) ??
    [];

  useEffect(() => {
    if (data && todos.length === 0) {
      dispatch(setTodos(data));
    }
  }, [data, todos.length, dispatch]);

  useEffect(() => {
    if (isLoading) {
      Loading.standard("Loading");
    } else {
      Loading.remove();
    }
  }, [isLoading]);

  const filteredTodos = todos?.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const toggleCompleted = async (todo: Todo) => {
    try {
      Loading.standard("Loading");

      const updated = {
        ...todo,
        completed: !todo.completed,
      };

      dispatch(updateTodo(updated));
    } catch {
      alert("Помилка при оновленні задачі");
    } finally {
      Loading.remove();
    }
  };

  return (
    <div
      className={`min-h-screen w-full p-6 ${
        isDark ? "bg-black" : "bg-gray-50 "
      }`}
    >
      <header className="flex justify-between items-center mb-6">
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-gray-50 " : "text-black"
          }`}
        >
          Перелік справ
        </h1>
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Новий запис
        </Link>
      </header>

      <input
        type="text"
        placeholder="Пошук..."
        className={`w-full mb-6 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ${
          isDark
            ? "bg-black text-white placeholder-gray-400 focus:ring-blue-300"
            : "bg-white text-black placeholder-gray-500 focus:ring-blue-300"
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="text-red-500">Помилка завантаження даних</p>}

      <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-180px)]">
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={`p-4 rounded shadow flex justify-between items-start ${
                todo.completed
                  ? isDark
                    ? "bg-green-700"
                    : "bg-green-100"
                  : isDark
                  ? "bg-gray-500"
                  : "bg-white"
              }`}
            >
              <div className="space-y-2 ">
                <h3 className="font-semibold text-lg">{todo.title}</h3>

                <h5
                  className={`${
                    todo.description?.trim()
                      ? "text-gray-800"
                      : "text-gray-400 italic"
                  }`}
                >
                  {todo.description?.trim()
                    ? todo.description
                    : "Опис відсутній"}
                </h5>

                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full flex-1 cursor-pointer ${
                    todo.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-700"
                  }`}
                  onClick={() => toggleCompleted(todo)}
                >
                  {todo.completed ? "✔ Виконано" : "⏳ Не виконано"}
                </span>
              </div>

              <button
                onClick={() => handleDelete(todo.id)}
                className="cursor-pointer ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Видалити
              </button>
            </li>
          ))
        ) : (
          <p>Нічого не знайдено</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
