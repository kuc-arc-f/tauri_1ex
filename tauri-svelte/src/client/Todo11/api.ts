// src/lib/api.ts
let API_BASE = import.meta.env.VITE_API_URL;
import ApiUtil from '../../lib/ApiUtil';
// 
export async function fetchTodos() {
  const res = await ApiUtil.post('/api/tauri_todo11_list', {});
  console.log(res)
  return res.data;
}

export async function createTodo(todo: Todo) {
  const res = await ApiUtil.post('/api/tauri_todo11_create', todo );
  console.log(res)
  return res.data;
}

export async function updateTodo(id: number, todo: Todo) {
  //tauri_todo11_update
  todo.id= id;
  const res = await ApiUtil.post('/api/tauri_todo11_update', todo );
  console.log(res)
  return res.data;
/*
  const response = await fetch(`${API_BASE}/api/todo11/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
*/
}

export async function deleteTodo(id: number) {
  const item = {id: id}
  const res = await ApiUtil.post('/api/tauri_todo11_delete', item );
  console.log(res)
}

export async function searchTodos(query: string) {
  const response = await fetch(`${API_BASE}/api/todo11/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search todos');
  return response.json();
}