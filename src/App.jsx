import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkoutPlanProvider } from './context/WorkoutPlanContext';
import ProtectedRoute from './components/ProtectedRoute';
import LocationGate from './components/LocationGate';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import WorkoutListPage from './pages/WorkoutListPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';

export default function App() {
  return (
    <AuthProvider>
      <WorkoutPlanProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<LocationGate />}>
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:courseId" element={<WorkoutListPage />} />
                <Route path="/workouts/:workoutId" element={<WorkoutDetailPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </WorkoutPlanProvider>
    </AuthProvider>
  );
}
