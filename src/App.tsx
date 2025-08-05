import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { setNavigator } from './services/navigateService';
import { Footer } from './components/footer';
import { ProtectedRoute } from './components/protected';
import { NavbarCustom } from './components/navbar';
import { NavbarLinks, ProtectedNavbarLinks } from './constants/links';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      <NavbarCustom />
      <Routes>
        {
          NavbarLinks.map((component) => (
            <Route path={component.path} element={component.component} />
          ))
        }

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {
            ProtectedNavbarLinks.map((component) => (
              <Route path={component.path} element={component.component} />
            ))
          }
          {/* Add more protected routes here */}
        </Route>

        <Route element={<div style={{ fontSize: "20px" }}>404 Not Found</div>} path="*" />
      </Routes>
      <Footer />
    </>
  )
}

export default App
