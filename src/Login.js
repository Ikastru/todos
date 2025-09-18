import { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fetcher = useFetcher();
  const navigate = useNavigate();

  // Обрабатываем успешный вход
  useEffect(() => {
    if (fetcher.data && fetcher.data.status === "ok") {
      // Перенаправляем на главную
      navigate("/");
      // Перезагружаем страницу для обновления состояния
      window.location.reload();
    } else if (fetcher.data && typeof fetcher.data === "string") {
      setError(fetcher.data);
    }
  }, [fetcher.data, navigate]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      setError("Заполните email и пароль");
      return;
    }

    // Создаем FormData, чтобы fetcher.submit корректно работал с api.js
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetcher.submit(formData, { action: "/login", method: "post" });
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <section>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Пароль</label>
          <div className="control">
            <input
              type="password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="help is-danger">{error}</p>}
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <input type="reset" className="button is-warning is-light" value="Сброс" />
          </div>
          <div className="control">
            <input type="submit" className="button is-primary" value="Войти" />
          </div>
        </div>
      </form>
    </section>
  );
}