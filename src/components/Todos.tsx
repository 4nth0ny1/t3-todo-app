import Todo from "./Todo";
import { api } from "../utils/api";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>There was an error fetching todos</div>;

  return (
    <div>
      {todos.length
        ? todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        : "Create your first todo!"}
    </div>
  );
}
