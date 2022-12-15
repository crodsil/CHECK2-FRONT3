import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useTheme } from "../../Hooks/useTheme";
import { ctdUrl } from "../../urls";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {
  const [pacienteData, setPacienteData] = useState([])
  const [dentistaData, setDentistaData] = useState([])
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { token } = useAuth()
  const mySwal = withReactContent(Swal)


  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes

    fetch(`${ctdUrl}dentista`)
      .then((response) => response.json()
      .then((data) => {
          setDentistaData(data);
        })
      );

    fetch(`${ctdUrl}paciente`)
      .then((response) => response.json()
      .then((data) => {
        setPacienteData(data.body);
        })
      );
  }, []);


  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    event.preventDefault()

    const dentistaId = event.target.dentista.value
    const pacienteId = event.target.paciente.value
    const dataConsulta = event.target.appointmentDate.value

    const paciente = pacienteData.filter(paciente => paciente.matricula === pacienteId ? paciente : null) 
    const dentista = dentistaData.filter(dentista => dentista.matricula === dentistaId ? dentista : null) 


    const userData = {
      dentista: dentista[0],
      paciente: paciente[0],
      dataHoraAgendamento: dataConsulta
    }

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(userData)
    }

    fetch(`${ctdUrl}consulta`, requestConfig)
      .then(response => response.json()
      .then((data) => {
        mySwal.fire({
          text: 'Agendamento realizado com sucesso',
          position: 'top', 
          icon: 'success',   
          showConfirmButton: true,       
        })
        
      }
      //     navigate('home')
      ))

      navigate('home')
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${theme === 'dark'? styles.cardDark : ''}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentista" className="form-label">
                Dentista
              </label>
              <select className="form-select" name="dentista" id="dentista">
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                {dentistaData.map(
                  dentista => { 
                    return <option 
                              key={dentista.matricula} 
                              value={dentista.matricula}>
                              {`${dentista.nome} ${dentista.sobrenome}`}
                          </option>
                })}
                
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="paciente" className="form-label">
                Paciente
              </label>
              <select className="form-select" name="paciente" id="paciente">
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {pacienteData.map(
                  paciente => { 
                    return <option 
                              key={paciente.matricula} 
                              value={paciente.matricula}>
                              {`${paciente.nome} ${paciente.sobrenome}`}
                          </option>
                })}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              className={`btn btn-${theme} ${styles.button}`}
              type="submit"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
