import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./style.css";
import imgGrandpa from "../../assets/01.png";
import imgLogo from "../../assets/logo.png";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory("");

  async function handlerLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("session", { id });

      sessionStorage.setItem("id", id);
      sessionStorage.setItem("nameOng", response.data.name);

      history.push("/perfil");
    } catch (error) {
      alert(`Falah no login verifique seu ID`);
    }
  }

  return (
    <>
      <div className="login-container">
        <section className="form">
          <img src={imgLogo} alt="Adote um Velhinho" />
          <form onSubmit={handlerLogin}>
            <h1>Faça seu login </h1>
            <input
              type="text"
              placeholder="Seu ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button type="submit" className="button">
              Entrar
            </button>

            <Link to="/cadastro" className="back-link">
              <FiLogIn size={16} color="#bda0d9" />
              Não tenho cadastro
            </Link>
          </form>
        </section>
        <img src={imgGrandpa} alt="grandpa" />
      </div>
    </>
  );
}
