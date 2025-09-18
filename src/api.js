import axios from "axios";
import { redirect } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// --- Auth ---
export async function login({ request }) {
  const fd = await request.formData();
  const email = fd.get("email");
  const password = fd.get("password");

  try {
    await api.post("/auth/login", { email, password });
    return { status: "ok" }; // Возвращаем объект со статусом
  } catch (err) {
    return err.response?.data?.error || "auth/unknown-error";
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout");
    return { status: "loggedOut" }; // Возвращаем статус для обновления UI
  } catch (err) {
    console.error("Logout error:", err);
    return { status: "error" };
  }
}

export async function register({ request }) {
  const fd = await request.formData();
  const email = fd.get("email");
  const password = fd.get("password");

  try {
    await api.post("/auth/register", { email, password });
    return redirect("/login");
  } catch (err) {
    return err.response?.data?.error || "auth/unknown-error";
  }
}

// --- Todos ---
export async function getTodos() {
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (err) {
    return redirect("/login");
  }
}

export async function addTodo({ request }) {
  const fd = await request.formData();
  const newTodo = {
    title: fd.get("title"),
    desc: fd.get("desc"),
    image: fd.get("image"),
  };
  await api.post("/todos", newTodo);
  return redirect("/");
}

export async function getTodo({ params }) {
  try {
    const res = await api.get(`/todos/${params.key}`);
    return res.data;
  } catch (err) {
    throw new Response("Not Found", { status: 404 });
  }
}

export async function actTodo({ params, request }) {
  if (request.method === "PATCH") {
    await api.patch(`/todos/${params.key}/done`, {});
  } else if (request.method === "DELETE") {
    await api.delete(`/todos/${params.key}`);
  }
  return redirect("/");
}

// --- Current user ---
export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/me");
    return res.data?.email ? res.data : null;
  } catch (err) {
    return null;
  }
}

// --- Loader для страниц только для неавторизованных ---
export async function onlyLoggedOutLoader() {
  const user = await getCurrentUser();
  if (user) return redirect("/");
  return null;
}
