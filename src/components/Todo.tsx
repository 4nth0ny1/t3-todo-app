import type { Todo } from "../types";
import { api } from "../utils/api";

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const trpc = api.useContext();

  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });
  const { id, content } = todo;

  return (
    <div className="flex flex-row justify-between p-4 text-white">
      <ul className="p-2">
        <li>{content}</li>
      </ul>
      <button
        className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:w-auto"
        onClick={() => deleteMutation(id)}
      >
        Delete
      </button>
    </div>
  );
}
