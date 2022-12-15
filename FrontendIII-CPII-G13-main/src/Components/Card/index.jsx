import { Link } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import styles from "./Card.module.scss";


const Card = (props) => {
  const { theme } = useTheme();
  const { nome, sobrenome, matricula, usuario } = props.dentista;

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody} ${theme === 'dark'? styles.cardDark : ''}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}

          <Link to={`dentista/${matricula}`}>
            <h5
              className={`card-title ${styles.title}`}
            >{`${nome} ${sobrenome}`}</h5>
            <h6>{usuario.username}</h6>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
