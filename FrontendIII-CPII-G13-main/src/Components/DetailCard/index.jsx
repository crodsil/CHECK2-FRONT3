import { useEffect, useState } from "react";
import { useTheme } from "../../Hooks/useTheme";
import { useParams } from "react-router-dom";
import { ctdUrl } from "../../urls";
import ScheduleFormModal from "../ScheduleFormModal";
import styles from "./DetailCard.module.css";


const DetailCard = () => {
  const { theme } = useTheme()
  const [dentistaData, setDentistaData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    fetch(`${ctdUrl}dentista?matricula=${id}`)
      .then((response) => response.json()
      .then((data) => setDentistaData(data))
      );
  }, [id]);
  return (
    <>
    <div role="dialog">
      <h1>Cadastro de dentistas {dentistaData.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        <div
          className={`${theme === 'dark'? styles.cardDark : ''} card-body row`}  
        >
          <div className="col-sm-12 col-lg-6">
            <img
              alt="imagem de um doutor com fundo azul"
              className="card-img-top"
              src="/images/doctor.jpg"  
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">
                Nome: {dentistaData.nome}
              </li>
              <li className="list-group-item">
                Sobrenome: {dentistaData.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {dentistaData.usuario && dentistaData.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // botão para o agendamento da consulta */}
              <button
                role="button"
                type="button"
                aria-label="agendar consulta"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} ${styles.button}`}
              >
                Agendar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
