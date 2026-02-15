import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import silkVideo from '../assets/silk-1771163150621.mp4';

const POSTER_URL = 'https://images.unsplash.com/photo-1535868463750-c78d9c43e14d?q=80&w=2836&auto=format&fit=crop';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays if possible
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down slightly for ambience
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/courses', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-['Space_Grotesk'] text-white overflow-hidden min-h-screen relative flex items-center justify-center p-8">
      {/* Background Ambience - Video */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER_URL}
          className="w-full h-full object-cover opacity-60"
        >
          <source src={silkVideo} type="video/mp4" />
        </video>
      </div>

      {/* Subtle Glow Particles - KEEP if desired, or remove if Silk is enough. Keeping for now for texture. */}
      {/* Reduced opacity of particles to let Silk shine */}
      <div className="particle top-1/4 left-1/4 opacity-30" />
      <div className="particle top-1/3 right-10 opacity-30" />
      <div className="particle bottom-1/4 left-1/2 opacity-30" />
      <div className="particle top-2/3 right-1/4 opacity-30" />
      <div className="particle bottom-10 left-10 opacity-30" />

      <main className="relative flex w-full flex-col items-center justify-center">
        {/* Brand Header Section with Logo Image */}
        <div className="mb-32 text-center flex flex-col items-center">

          <div className="flex flex-col items-center leading-none">
            <h1 className="text-2xl font-black tracking-[0.3em] text-red-600 font-['Space_Grotesk']">INFINITY FITNESS</h1>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card w-full max-w-[400px] mx-10 rounded-2xl flex flex-col gap-6 relative overflow-hidden" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          {/* Subtle bottom red glow on card */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-red-600/10 blur-[40px] pointer-events-none" />

          <div className="space-y-1 relative z-10">
            <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
            <p className="text-white/50 text-sm">Enter your details to continue training</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 !pl-2 pr-6 rounded-lg bg-white text-black text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-left"
                placeholder=""
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs text-red-600 hover:text-red-500 font-bold uppercase">Forgot?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 !pl-2 pr-6 rounded-lg bg-white text-black text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-left"
                placeholder=""
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-600/10 border border-red-600/20 text-red-500 text-sm font-medium">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="neon-glow bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all w-full h-14 rounded-lg font-bold text-white uppercase tracking-widest mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                'Login to Portal'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center pt-0 relative z-10">
            <p className="text-white/50 text-sm">
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="text-red-600 font-semibold hover:underline transition-all">
                Join now.
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Overlay pattern for texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6ofdV5I0aTo-cQfa2zzYqLdS974OQYAoBEp_uZci3wKl6G2ljuPNNHjyVKprwzBQ6XdNjZLZ8Kk6Dwu2jN75mSD5AY6DjgFu8Y8EDoUez5BAjqu3Uf3QGWJcgOEup3Fexxqmy7bTpLugzN4MTrZ5iC0kCkfd8GutD6MiY-wTsYpfe62FxlUtqzZlTvWxji33yDoL86Y18V9OOYi2dEerxzrzUR6V9w3tqMS96nXxHo0D7iO-VyCm6a2lFtUCLVPwZXt4rzrLknM5c')]" />
    </div>
  );
}

export default LoginPage;
