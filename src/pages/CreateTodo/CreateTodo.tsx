import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTodoApiMutation } from "../../app/api/apiSlice";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todosSlice";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const CreateTodo: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createTodo, { isLoading, error }] = useCreateTodoApiMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Назва обов’язкова");
      return;
    }

    try {
      Loading.standard("Loading");

      const response = await createTodo({ title, description }).unwrap();
      const newTodo = {
        ...response,
        completed: false,
        id: Math.floor(Math.random() * 1000000),
      };

      dispatch(addTodo(newTodo));
      navigate("/");
    } catch {
      alert("Помилка при створенні запису");
    } finally {
      Loading.remove();
    }
  };

  return (
    <div
      className={`min-h-screen w-full   p-8 ${
        isDark ? "bg-black" : "bg-gray-50 "
      }`}
    >
      <h2
        className={`text-3xl font-extrabold mb-8 text-center ${
          isDark ? "text-white" : "text-gray-900 "
        }`}
      >
        Створити новий запис
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className={`block text-sm font-semibold  mb-2 ${
              isDark ? "text-white" : "text-gray-700 "
            }`}
          >
            Назва <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              isDark
                ? " transform bg-black text-white placeholder-gray-400 focus:ring-blue-300"
                : " transform bg-white text-black placeholder-gray-500 focus:ring-blue-300"
            }`}
            placeholder="Введіть назву"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className={`block text-sm font-semibold mb-2  ${
              isDark ? "text-white" : "text-gray-700 "
            }`}
          >
            Опис
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              isDark
                ? "transform bg-black text-white placeholder-gray-400 focus:ring-blue-300"
                : "transform bg-white text-black placeholder-gray-500 focus:ring-blue-300"
            }`}
            placeholder="Додайте опис (необов’язково)"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Створення..." : "Створити"}
        </button>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">
            Помилка при створенні запису. Спробуйте ще раз.
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateTodo;
