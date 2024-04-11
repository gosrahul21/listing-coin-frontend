import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { guestRoutes, landingRoutes, userRoutes } from "./routes/routes";
import { UserProvider } from "./context/userContext";
import { SnackbarProvider } from "notistack";
import Login from "./pages/Login/Login";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import CancelIcon from "./assets/icons/CancelIcon";
import { ClipLoader } from 'react-spinners'

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Suspense fallback={<div className='fixed top-0 left-0 bottom-0 right-0'><ClipLoader/></div>}>
      <Router>
        <UserProvider>
          <Routes>
            {guestRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
            {landingRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
            <Route path="*" element={<Login type="login" />} />
          </Routes>
          <SnackbarProvider />
        </UserProvider>
      </Router>
      <ToastContainer
        theme="light"
        toastStyle={{ color: "#1201FD", borderRadius: "22px" }}
        style={{ color: "#1201FD" }}
        closeButton={<CancelIcon />}
      />
    </Suspense>
  );
}

export default App;
