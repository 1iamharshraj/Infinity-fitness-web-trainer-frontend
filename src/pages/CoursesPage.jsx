import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkoutPlan } from '../context/WorkoutPlanContext';
import LogoutButton from '../components/LogoutButton';
import SpotlightCard from '../components/SpotlightCard';
import {
  Dumbbell,
  BicepsFlexed,
  Cuboid as Legs,
  Flame,
  Snowflake,
  RefreshCcw,
  Zap
} from 'lucide-react';

const COURSE_ICONS = {
  dumbbell: <Dumbbell className="w-8 h-8 text-red-500" strokeWidth={2.5} />,
  'arm-flex': <BicepsFlexed className="w-8 h-8 text-red-500" strokeWidth={2.5} />,
  leg: <Legs className="w-8 h-8 text-red-500" strokeWidth={2.5} />,
  flame: <Flame className="w-8 h-8 text-red-500" strokeWidth={2.5} />,
  snowflake: <Snowflake className="w-8 h-8 text-red-500" strokeWidth={2.5} />,
  circuit: <RefreshCcw className="w-8 h-8 text-red-500" strokeWidth={2.5} />,
  fire: <Zap className="w-8 h-8 text-red-500" strokeWidth={2.5} />
};

export default function CoursesPage() {
  const { user } = useAuth();
  const { courses, loading } = useWorkoutPlan();
  const navigate = useNavigate();

  function getLastWorkoutText() {
    if (!user?.last_workout_date) return 'No workouts yet';
    const d = new Date(user.last_workout_date);
    const now = new Date();
    const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#1a0505] via-[#0f0505] to-[#050202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1a0505] via-[#0f0505] to-[#050202] relative font-sans">

      {/* Responsive container */}
      <div className="!w-full !max-w-7xl mx-auto !px-8 !py-8 md:!px-12 lg:!pl-86 !pb-42 !flex !flex-col !items-center">

        {/* Header */}
        <h1 className="text-red-700 text-[10px] md:text-sm font-extrabold tracking-[0.35em] text-center !mb-10 !pt-10 !pb-4 uppercase">
          INFINITY FITNESS
        </h1>

        {/* Info Cards Grid - Stacked on mobile, side-by-side on md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-4xl">
          {/* Workout Streak Card */}
          <SpotlightCard className="shadow-lg border-white/5 bg-[#1e1e1e]/80 !p-4 md:!p-6 md:items-center md:text-center" spotlightColor="rgba(220, 38, 38, 0.25)">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-3">
              WORKOUT STREAK
            </p>
            <p className="text-white text-2xl font-bold">
              {user?.total_workout_days_completed || 0} Days
            </p>
          </SpotlightCard>

          {/* Last Session Card */}
          <SpotlightCard className="shadow-lg border-white/5 bg-[#1e1e1e]/80 !p-4 md:!p-6 md:items-center md:text-center" spotlightColor="rgba(220, 38, 38, 0.25)">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-3">
              LAST SESSION
            </p>
            <p className="text-white text-lg font-bold !truncate">
              {user?.last_course_name || 'No courses yet'}
            </p>
            <p className="text-white/30 text-[11px] font-medium mt-1">
              {getLastWorkoutText()}
            </p>
          </SpotlightCard>
        </div>

        {/* All Courses Header */}
        <h2 className="text-white text-xl font-bold !mb-8 !px-1 !pt-8 !pb-4 !text-center">All Courses</h2>

        {/* Course Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 !w-full">
          {courses.map((course, index) => {
            // Note: Removed the complex logic for 'isLast' spanning 2 cols as it can be messy in responsive grids.
            // Keeping it simple: rigid grid for consistency.

            return (
              <SpotlightCard
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                spotlightColor="rgba(220, 38, 38, 0.25)"
                className={`
                  relative bg-[#1e1e1e]/40 border-white/5
                  overflow-hidden cursor-pointer
                  hover:border-red-900/50 hover:bg-[#1e1e1e]/60
                  transition-all duration-300 group
                  !p-0 aspect-square
                `}
              >
                {/* Background image */}
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity grayscale contrast-125"
                  />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent" />

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-end !p-6 md:!p-10 md:items-center md:text-center">
                  <span className="mb-4 group-hover:scale-110 transition-transform inline-block">
                    {COURSE_ICONS[course.icon] || (
                      <Dumbbell className="w-10 h-10 text-red-500" strokeWidth={2.5} />
                    )}
                  </span>
                  <p className="text-white text-sm font-extrabold uppercase tracking-wider leading-tight">
                    {course.name}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* Logout Button - fixed bottom right */}
      <div className="fixed bottom-8 right-8 z-50">
        <LogoutButton />
      </div>
    </div>
  );
}
