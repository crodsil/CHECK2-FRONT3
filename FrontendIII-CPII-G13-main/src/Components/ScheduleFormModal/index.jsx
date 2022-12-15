import { useTheme } from '../../Hooks/useTheme';
import styles from "./ScheduleFormModal.module.css";
import ScheduleForm from '../ScheduleForm';


const ScheduleFormModal = () => {
  const { theme } = useTheme()

  return (
    <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
      <div className="modal-dialog">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div className={`modal-content ${theme === 'dark'? styles.DarkModal : ''}`}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Selecionar dentista, paciente, data e hora.</h1>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
            // está em dark mode e deverá utilizado o css correto */}
            <button type="button" className={`btn-close ${theme === 'dark'? styles.closeButtonDark : ''}`} data-bs-dismiss="modal" aria-label="Botão fechar"></button>
          </div>
          <div className="modal-body">
            <ScheduleForm />
          </div>
        </div>
      </div>
    </div >

  );
};

export default ScheduleFormModal;
