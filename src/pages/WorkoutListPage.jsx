import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkoutPlan } from '../context/WorkoutPlanContext';
import LogoutButton from '../components/LogoutButton';
import SpotlightCard from '../components/SpotlightCard';

const CATEGORY_COLORS = {
  STRENGTH: 'bg-red-600',
  HYPERTROPHY: 'bg-orange-600',
  ISOLATION: 'bg-purple-600',
  BODYWEIGHT: 'bg-emerald-600',
  CARDIO: 'bg-blue-600',
  MOBILITY: 'bg-teal-600',
  STRETCHING: 'bg-cyan-600',
  RECOVERY: 'bg-indigo-600',
};

export default function WorkoutListPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourse, getWorkoutsForCourse, loading } = useWorkoutPlan();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const course = getCourse(courseId);
  const workouts = getWorkoutsForCourse(courseId);

  const muscleGroups = useMemo(() => {
    const groups = [...new Set(workouts.map(w => w.muscle_group))];
    return ['ALL', ...groups];
  }, [workouts]);

  const filteredWorkouts = useMemo(() => {
    if (activeFilter === 'ALL') return workouts;
    return workouts.filter(w => w.muscle_group === activeFilter);
  }, [workouts, activeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0505] via-[#0f0505] to-[#050202] relative font-sans">
      <div className="!w-full !max-w-7xl mx-auto !px-8 !py-8 md:!px-12 lg:!pl-86 !pb-42 !flex !flex-col !items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-red-700 text-[10px] md:text-sm font-extrabold tracking-[0.35em] uppercase !mb-4 !pt-10">INFINITY FITNESS</p>
          <h1 className="text-white text-xl md:text-2xl font-bold uppercase !mb-8">{course?.name} Routine</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 !mb-16 justify-center">
          {muscleGroups.map((group) => (
            <button
              key={group}
              onClick={() => setActiveFilter(group)}
              className={`shrink-0 !px-6 !py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === group
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-[#1a1a1a] text-gray-400 border border-white/5 hover:border-red-600/50 hover:bg-[#222]'
                }`}
            >
              {group === 'ALL' ? '✦ ALL' : `◆ ${group.toUpperCase()}`}
            </button>
          ))}
        </div>

        {/* Workout Cards */}
        <div className="!space-y-8 w-full max-w-5xl">
          {filteredWorkouts.map((workout) => (
            <SpotlightCard
              key={workout.id}
              onClick={() => navigate(`/workouts/${workout.id}`)}
              spotlightColor="rgba(220, 38, 38, 0.25)"
              className="border-white/5 bg-[#1e1e1e]/80 !p-8 md:!p-10 cursor-pointer hover:border-red-600/30 transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex-1 min-w-0 pointer-events-none relative z-10 md:text-center md:flex md:flex-col md:items-center">
                <span className={`inline-block !px-4 !py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest text-white mb-3 ${CATEGORY_COLORS[workout.category] || 'bg-gray-600'}`}>
                  {workout.category}
                </span>
                <h3 className="text-white font-bold text-lg mb-2">{workout.name}</h3>
                <div className="flex items-center gap-4 text-white/50 text-xs font-medium md:justify-center">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {workout.sets_info}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {workout.rest_time}
                  </span>
                </div>
              </div>
              <div className="relative z-10 ml-6 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 shrink-0">
                <svg className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Back + Logout */}
        <div className="flex items-center justify-between !mt-16 w-full max-w-5xl">
          <button
            onClick={() => navigate('/courses')}
            className="text-white/50 hover:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-3 transition-colors group !px-8 !py-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Back to Courses
          </button>
          <div className="fixed bottom-8 right-8 z-50">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
