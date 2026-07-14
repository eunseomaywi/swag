import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Members } from './pages/Members';
import { Activities } from './pages/Activities';
import { PeerMentor } from './pages/PeerMentor';
import { FormHub } from './pages/FormHub';
import { BookingForm } from './pages/BookingForm';
import { ConcernForm } from './pages/ConcernForm';
import { StudentDashboard } from './pages/StudentDashboard';
import { MentorDashboard } from './pages/MentorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

export function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="route-shell" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/peer-mentor" element={<PeerMentor />} />
          <Route path="/form" element={<FormHub />} />
          <Route path="/form/booking" element={<BookingForm />} />
          <Route path="/form/concern" element={<ConcernForm />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/mentor" element={<MentorDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
