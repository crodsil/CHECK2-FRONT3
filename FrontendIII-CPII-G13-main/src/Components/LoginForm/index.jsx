import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import { useAuth } from "../../Hooks/useAuth";
import { ctdUrl } from "../../urls";
import styles from "./Form.module.css";

const LoginForm = () => {

  // const [authToken, setAuthToken] = useState('')
  const [userName, setUserName] = useState('')
  const [erroUserName, setErroUserName] = useState(false)
  const [erroPassword, setErroPassword] = useState(false)
  const [userPassword, setUserPassword] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [erroForm, setErroForm] = useState(true)
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { setToken } = useAuth()

  
  //UserEffect para validar formulário
  useEffect(
    () => {
      if(userName.length < 6 || userPassword === ""){

        setErroForm(true)
        setErroUserName(true)
        setErroPassword(true)

      } else {
        setErroForm(false)
        setErroUserName(false)
        setErroPassword(false)     
      }
    }, [userName, userPassword]
  )

  

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    //setNotFound

    event.preventDefault()

    const userData = {
      username: userName,
      password: userPassword
    }

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(userData)
    }

    fetch(`${ctdUrl}auth`, requestConfig).then(
      response => {
        
        if(response.status === 200) {
          response.json().then(
            data => {
              localStorage.setItem('token', data.token)
              // setAuthToken(data.jwt)
              setToken(data.token)
            }
          )
          
          navigate('home')

        } else {
          setNotFound(true)
          
        }
      }
    )
      
  }

  // aqui o codigo faz voltar ao normal apos acusar o erro do servidor
  useEffect(
    () => {
      if(notFound){
        setNotFound(false)
      }
    }, [userName, userPassword]
  )



  return (
    <>
      {/* //deverá ser feito um teste se a aplicação
        // está em dark mode testar o css certo */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${theme === 'dark' ? styles.cardDark : '' }`}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="login"
                type="text"
                className={`form-control ${styles.inputSpacing} ${erroUserName ? 'erroForm' : ''} `}
                placeholder="Digite seu login"
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />

              {
                erroUserName ? (
                <span className='erroForm' minlength="5">
                  {/* O campo de login deve conter no mínimo 5 caracteres */}
                </span>
                ) : null
              }

              <input
                name="password"
                type="password"
                className={`form-control ${styles.inputSpacing} `}
                placeholder="Digite sua senha"
                required
                value={userPassword}
                onChange={event => setUserPassword(event.target.value)}
              />
              
              {
                erroPassword ? (
                <span className='erroForm'>
                  {/* testando o erro */}
                </span>
                ) : null
              }

              {
                notFound ? (
                <span className='erroForm'>
                  {/* usuario ou senha não encontrado */}
                  Usuário ou senha incorreto, verifique suas informações novamente.
                </span>
                ) : null
              }
            </div>

            <button role="button" className="btn btn-primary" disabled={erroForm} type="submit" aria-label="enviar" >
              <strong>Send</strong>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
