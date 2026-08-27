import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup, Login, NotFound, Expenses, Home, Landing } from "@/pages";
import { useAuth } from "./hooks/useAuth";
import { Navbar } from "@/components";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { useEffect } from "react";

export default function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className='min-h-screen font-pixelify bg-paper dark:bg-ink text-ink dark:text-paper transition-colors duration-200'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/expenses'
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}
