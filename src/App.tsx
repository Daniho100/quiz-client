import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Questions from './pages/Questions';
import Quiz from './pages/Quiz';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import About from './pages/About';
import ContactUs from './pages/Contact';

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      </>
  );
};

export default App;