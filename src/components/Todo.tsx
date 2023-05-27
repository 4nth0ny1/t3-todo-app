import type { Todo } from "../types";

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const { id, content } = todo;

  return <div className="text-white">{content}</div>;
}
