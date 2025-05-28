import type { Todo } from "../contexts/Todo.provider";

export async function getTodos() {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todos`);
  if (!response.ok) {
    throw new Error(`${response?.status}`);
  }

  const json = await response.json();
  return json?.data || [];
}

export async function createTodo(dto: Todo) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    throw new Error(`${response?.status}`);
  }

  const json = await response.json();
  return json?.data;
}

export async function updateTodo(dto: Todo) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/todos/${dto.uuid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    }
  );
  if (!response.ok) {
    throw new Error(`${response?.status}`);
  }

  const json = await response.json();
  return json?.data;
}

export async function deleteTodo(dto: Todo) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/todos/${dto.uuid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    }
  );
  if (!response.ok) {
    throw new Error(`${response?.status}`);
  }

  const json = await response.json();
  return json?.data;
}
