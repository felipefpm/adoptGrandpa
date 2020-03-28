import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./style.css";
import imgLogo from "../../assets/logo.png";

export default function Register() {
  const [nameONG, setNameONG] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUF] = useState("");
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { name: nameONG, email, whatsapp, city, uf };
    try {
      const response = await api.post("ongs", data);
      alert(`Cadastro realizado seu ID é: ${response.data.id}`);

      history.push("/");
    } catch (error) {
      alert(`Erro no cadastro tente novamente`);
    }

    setNameONG("");
    setEmail("");
    setWhatsapp("");
    setCity("");
    setUF("");
  }

  return (
    <>
      <div className="register-container">
        <div className="content">
          <section>
            <img src={imgLogo} alt="Adote um velhinho" />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG.
            </p>

            <Link to="/" className="back-link">
              <FiArrowLeft size={16} color="#bda0d9" />
              Voltar para Login
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nome da ONG"
              value={nameONG}
              onChange={e => setNameONG(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <div className="input-group">
              <input
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="UF"
                maxLength="2"
                style={{ width: 80 }}
                value={uf}
                onChange={e => setUF(e.target.value)}
              />
            </div>

            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
