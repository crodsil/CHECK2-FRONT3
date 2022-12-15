import {
  createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";
import { redirect } from "react-router-dom";


import { DesignLayout } from "./Components/DesignLayout";
import ScheduleFormModal from "./Components/ScheduleFormModal";
import { AuthProvider } from "./Hooks/useAuth";
import { ThemeProvider } from "./Hooks/useTheme";
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";
import Login from "./Routes/Login";


function App() {

  const appRouter = createBrowserRouter([   
    {
      path: '', 
      element: <DesignLayout />,
      children: [
        {
          path: '',
          element: <Home/>
        },
        {
          path: 'home',
          element: <Home/>
        },
        {
          path: '*',
          loader: () => redirect('')
        },
        {
          path: 'login',
          element: <Login/>          
        },
        {
          path: 'dentista/:id',
          element: <Detail />
        },
        {
          path: 'consulta',
          element: <ScheduleFormModal />
        } 
               
      ]
    }    
  ])

  return (    
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
