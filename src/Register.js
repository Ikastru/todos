import { useState } from "react";
import { register } from "./api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    resetErrors();

    if (!validate()) return;

    const result = await register({
      request: {
        formData: async () =>
          new Map([
            ["email", email],
            ["password", password],
          ]),
      },
    });

    if (typeof result === "string") {
      if (result === "auth/email-already-in-use") setErrorEmail("Пользователь с таким email уже зарегистрирован");
      else if (result === "auth/weak-password") {
        setErrorPassword("Слишком простой пароль");
        setErrorPasswordConfirm("Слишком простой пароль");
      }
      else setErrorPassword("Неизвестная ошибка");
    }
  };

  const handleFormReset = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    resetErrors();
  };

  const resetErrors = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorPasswordConfirm("");
  };

  const validate = () => {
    let valid = true;
    if (!email) {
      setErrorEmail("Email не указан");
      valid = false;
    }
    if (!password) {
      setErrorPassword("Пароль не указан");
      valid = false;
    }
    if (!passwordConfirm) {
      setErrorPasswordConfirm("Повтор пароля не указан");
      valid = false;
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      setErrorPassword("Пароли не совпадают");
      setErrorPasswordConfirm("Пароли не совпадают");
      valid = false;
    }
    return valid;
  };

  return (
    <section>
      <h1>Регистрация</h1>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input type="email" value={email} className="input" onChange={(e) => setEmail(e.target.value)} />
          </div>
          {errorEmail && <p className="help is-danger">{errorEmail}</p>}
        </div>

        <div className="field">
          <label className="label">Пароль</label>
          <div className="control">
            <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {errorPassword && <p className="help is-danger">{errorPassword}</p>}
        </div>

        <div className="field">
          <label className="label">Повтор пароля</label>
          <div className="control">
            <input type="password" value={passwordConfirm} className="input" onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>
          {errorPasswordConfirm && <p className="help is-danger">{errorPasswordConfirm}</p>}
        </div>

        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <input type="reset" className="button is-warning is-light" value="Сброс" />
          </div>
          <div className="control">
            <input type="submit" className="button is-primary" value="Зарегистрироваться" />
          </div>
        </div>
      </form>
    </section>
  );
}
