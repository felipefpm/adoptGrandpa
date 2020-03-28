import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import imgLogo from "../../assets/logo.png";
import "./style.css";

export default function Profile() {
  const [cases, setCases] = useState([]);
  const ongId = sessionStorage.getItem("id");
  const ongName = sessionStorage.getItem("nameOng");
  const history = useHistory();

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setCases(response.data);
      });
  }, [ongId]);

  async function handleDeleteCase(id) {
    try {
      await api.delete(`cases/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setCases(cases.filter(c => c.id !== id));
    } catch (error) {
      alert(`Erroao deletar caso`);
    }
  }

  function handleLogout() {
    sessionStorage.clear();

    history.push("/");
  }

  return (
    <>
      <div className="profile-container">
        <header>
          <img src={imgLogo} alt="Adote um velhinho" />
          <span>Bem vinda, {ongName}</span>

          <Link className="button" to="/casos/new">
            Cadastrat novo caso
          </Link>
          <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#285176" />
          </button>
        </header>

        <h1>Casos cadastrados</h1>
        <ul>
          {cases.map(c => (
            <li key={c.id}>
              <strong>CASO:</strong>
              <p>{c.title}</p>

              <strong>DESCRIÇÃO: </strong>
              <p>{c.description}</p>

              <strong>Valor: </strong>
              <p>R$ {c.value}</p>

              <button onClick={() => handleDeleteCase(c.id)} type="button">
                <FiTrash2 size={20} color="#285176" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
