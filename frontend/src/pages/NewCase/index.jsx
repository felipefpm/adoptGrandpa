import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./style.css";
import imgLogo from "../../assets/logo.png";

export default function NewCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();

  const ongId = sessionStorage.getItem("id");

  async function handleNewCase(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("cases", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/perfil");
    } catch (error) {
      alert(`Erro ao cadastrar o caso`);
    }
  }

  return (
    <>
      <>
        <div className="newcase-container">
          <div className="content">
            <section>
              <img src={imgLogo} alt="Adote um velhinho" />

              <h1>Cadastrar novo caso</h1>
              <p>
                Descreva o caso detalhadamente para encontrar um netinho para
                adotar um Vôvôzinho(a)
              </p>

              <Link to="/perfil" className="back-link">
                <FiArrowLeft size={16} color="#bda0d9" />
                Voltar para Home
              </Link>
            </section>

            <form onSubmit={handleNewCase}>
              <input
                type="text"
                placeholder="Titulo do caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                type="email"
                placeholder="Descrição do caso"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Valor em reais"
                value={value}
                onChange={e => setValue(e.target.value)}
              />

              <button type="submit" className="button">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  );
}
