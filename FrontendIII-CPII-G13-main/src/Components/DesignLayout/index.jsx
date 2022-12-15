import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useTheme } from "../../Hooks/useTheme";
import { useAuth } from "../../Hooks/useAuth";

//usando os hooks
export function DesignLayout() {
  const { theme } = useTheme()
  const { token } = useAuth()
  const navigate = useNavigate()

  const isLogged = () => {
    if (token == null || token === 'null' || token.trim() === '') {
      navigate('login')
    } else {
      navigate('home')
    }
  }

  useEffect(() => {
    isLogged()
  }, [token])

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app ${theme}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
