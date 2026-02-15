import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkoutPlan } from '../context/WorkoutPlanContext';
import LogoutButton from '../components/LogoutButton';
import SpotlightCard from '../components/SpotlightCard';
import api from '../services/api';

const DIFFICULTY_COLORS = {
  beginner: 'bg-emerald-600',
  intermediate: 'bg-yellow-600',
  advanced: 'bg-red-600',
};

function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#1e1e1e]/60 border border-white/5 rounded-xl overflow-hidden mb-3 backdrop-blur-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between !p-5 text-left hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <span className="text-red-500 text-lg group-hover:scale-110 transition-transform">{icon}</span>
          <span className="text-white font-bold text-sm uppercase tracking-wider group-hover:text-red-400 transition-colors">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-white/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="!px-5 !pb-5 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { getWorkout, loading } = useWorkoutPlan();
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const workout = getWorkout(workoutId);

  async function handleComplete() {
    setCompleting(true);
    try {
      const { data } = await api.post(`/workouts/${workoutId}/complete`);
      setCompleted(true);
      updateUser({
        last_workout_date: data.last_workout_date,
        total_workout_days_completed: data.total_workout_days_completed,
        last_course_name: workout.course_name,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-400">
        Workout not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0505] via-[#0f0505] to-[#050202] relative font-sans">
      <div className="!w-full !max-w-7xl mx-auto !px-8 !py-8 md:!px-12 lg:!pl-86 !pb-42 !flex !flex-col !items-center">
        {/* Top Bar */}
        <div className="flex items-center justify-between !mb-8 w-full max-w-5xl">
          <button
            onClick={() => navigate(`/courses/${workout.course_id}`)}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-red-600 hover:text-white text-white/50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <p className="text-red-700 text-[10px] md:text-xs font-extrabold tracking-[0.35em] uppercase !mb-2">INFINITY FITNESS</p>
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider">{workout.course_name}</p>
          </div>
          <div className="w-12" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Left Column: Video & Title */}
          <div className="space-y-6">
            <SpotlightCard
              className="rounded-2xl overflow-hidden border-white/5 bg-[#1e1e1e]/80 !p-0"
              spotlightColor="rgba(220, 38, 38, 0.15)"
            >
              <div className="relative aspect-video w-full bg-black/50">
                {workout.demo_video_url ? (
                  <iframe
                    src={workout.demo_video_url}
                    title={workout.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center border border-red-600/50">
                      <svg className="w-10 h-10 text-red-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="!p-8">
                <div className="flex flex-wrap items-center gap-3 !mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${DIFFICULTY_COLORS[workout.difficulty] || 'bg-gray-600'}`}>
                    {workout.difficulty}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                    {workout.duration_minutes} Mins
                  </span>
                  {workout.calories > 0 && (
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                      {workout.calories} kcal
                    </span>
                  )}
                </div>
                <h1 className="text-white text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight">{workout.name}</h1>
              </div>
            </SpotlightCard>

            {/* Complete Button (Mobile Order: usually bottom, but putting here for prominence if desired, or keep at bottom) */}
            {/* Keeping it consistent: Info first */}
          </div>

          {/* Right Column: Details */}
          <div className="space-y-4">
            <Accordion title="Description" icon="📋" defaultOpen={true}>
              <p className="text-gray-300/90 leading-relaxed">{workout.description}</p>
            </Accordion>

            <Accordion title="Instructions" icon="📝" defaultOpen={true}>
              <div className="space-y-4">
                {workout.instructions.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600/20 text-red-500 font-bold text-xs flex items-center justify-center mt-0.5 border border-red-600/30">
                      {i + 1}
                    </span>
                    <p className="text-gray-300/90 leading-relaxed pt-0.5">{line.replace(/^\d+\.\s*/, '')}</p>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion title="Common Mistakes" icon="⚠️">
              <div className="space-y-3">
                {workout.common_mistakes.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-red-500 shrink-0 text-lg leading-none">•</span>
                    <p className="text-gray-300/90 leading-relaxed">{line.replace(/^\d+\.\s*/, '')}</p>
                  </div>
                ))}
              </div>
            </Accordion>

            {workout.equipment && (
              <Accordion title="Equipment" icon="🔧">
                <p className="text-gray-300/90">{workout.equipment}</p>
              </Accordion>
            )}

            {/* Complete Button */}
            <div className="!mt-8">
              {!completed ? (
                <button
                  onClick={handleComplete}
                  disabled={completing}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white !py-5 rounded-2xl font-black text-sm tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] active:scale-95 group"
                >
                  {completing ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      COMPLETING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      MARK AS COMPLETE
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ) : (
                <div className="w-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 !py-5 rounded-2xl font-black text-sm tracking-[0.2em] text-center shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  WORKOUT COMPLETED!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout - fixed position */}
        <div className="fixed bottom-8 right-8 z-50">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
