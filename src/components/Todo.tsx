import type { Todo } from "../types";
import { api } from "../utils/api";

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const { id, content, done } = todo;

  const trpc = api.useContext();

  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  const { mutate: doneMutation } = api.todo.toggle.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  return (
    <div className="flex flex-row justify-between p-4 text-white">
      <input
        type="checkbox"
        name="done"
        id={id}
        checked={done}
        onChange={(e) => {
          doneMutation({ id, done: e.target.checked });
        }}
      />
      <label
        htmlFor={id}
        className={`cursor-pointer p-2 ${done ? "line-through" : ""}`}
      >
        {content}
      </label>
      <button
        className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:w-auto"
        onClick={() => deleteMutation(id)}
      >
        Delete
      </button>
    </div>
  );
}
