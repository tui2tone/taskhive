import type { Todo } from "../contexts/Todo.provider";

export async function getTodos() {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todos`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    return [];
  }
}

export async function createTodo(dto: Todo) {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    return [];
  }
}

export async function updateTodo(dto: Todo) {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todos/${dto.uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    return [];
  }
}

export async function deleteTodo(dto: Todo) {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todos/${dto.uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data || [];
  } catch (error) {
    return [];
  }
}
