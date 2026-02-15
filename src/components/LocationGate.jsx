import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCurrentPosition } from '../utils/geolocation';
import api from '../services/api';

export default function LocationGate() {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('userCoords');
    if (stored) {
      setStatus('allowed');
      return;
    }
    checkLocation();
  }, []);

  async function checkLocation() {
    try {
      setStatus('checking');
      const coords = await getCurrentPosition();
      const { data } = await api.post('/auth/verify-location', {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (data.withinGym) {
        sessionStorage.setItem('userCoords', JSON.stringify(coords));
        setStatus('allowed');
      } else {
        setError('You must be within the gym to use this app.');
        setStatus('denied');
      }
    } catch (err) {
      if (err.code === 1) {
        setError('Location permission denied. Please enable location access.');
      } else {
        setError('Unable to verify your location. Please try again.');
      }
      setStatus('denied');
    }
  }

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Verifying your location...</p>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-white text-lg font-semibold text-center">Location Required</p>
        <p className="text-gray-400 text-sm text-center max-w-xs">{error}</p>
        <button
          onClick={checkLocation}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <Outlet />;
}
