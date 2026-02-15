import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const WorkoutPlanContext = createContext(null);

export function WorkoutPlanProvider({ children }) {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [workoutsById, setWorkoutsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setCourses([]);
      setWorkoutsById({});
      setLoading(false);
      return;
    }
    loadPlan();
  }, [token]);

  async function loadPlan() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/courses/workout-plan');

      // Build a flat lookup map: workoutId -> workout (with course info attached)
      const byId = {};
      for (const course of data) {
        for (const workout of course.workouts) {
          byId[workout.id] = {
            ...workout,
            course_name: course.name,
            course_id: course.id || course._id,
          };
        }
      }

      setCourses(data);
      setWorkoutsById(byId);
    } catch (err) {
      console.error('Failed to load workout plan:', err);
      setError('Failed to load workout plan');
    } finally {
      setLoading(false);
    }
  }

  function getCourse(courseId) {
    return courses.find(c => String(c.id) === String(courseId)) || null;
  }

  function getWorkoutsForCourse(courseId) {
    const course = getCourse(courseId);
    return course ? course.workouts : [];
  }

  function getWorkout(workoutId) {
    return workoutsById[String(workoutId)] || null;
  }

  return (
    <WorkoutPlanContext.Provider value={{
      courses,
      loading,
      error,
      getCourse,
      getWorkoutsForCourse,
      getWorkout,
      reload: loadPlan,
    }}>
      {children}
    </WorkoutPlanContext.Provider>
  );
}

export const useWorkoutPlan = () => useContext(WorkoutPlanContext);
