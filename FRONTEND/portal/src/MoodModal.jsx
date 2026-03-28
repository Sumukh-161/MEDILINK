import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

export default function MoodModal({ mood }) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (mood === 'sad' && !sessionStorage.getItem('moodAlertShown')) {
      setIsOpen(true);
      fetchTherapist();
      // Only show once per session so we don't annoy the user
      sessionStorage.setItem('moodAlertShown', 'true');
    } else if (mood !== 'sad') {
      setIsOpen(false);
      sessionStorage.removeItem('moodAlertShown'); // reset if mood improves
    }
  }, [mood]);

  const fetchTherapist = async () => {
    try {
      const resp = await fetch('http://127.0.0.1:8000/consultation_booking/');
      if (resp.ok) {
        const result = await resp.json();
        if (result.success && result.data) {
          // Find a therapist/psychiatrist or default to the first doctor
          const therapist = result.data.find(d => 
            d.specialization.toLowerCase().includes('psych') || 
            d.doctor_type.toLowerCase().includes('therapist')
          ) || result.data[0];
          setSuggestion(therapist);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
        >
           <X className="w-5 h-5"/>
        </button>
        
        <div className="text-center mb-7 mt-2">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl shadow-sm border border-indigo-100">
            🫂
          </div>
          <h2 className="text-[22px] font-bold text-gray-800 mb-2 leading-tight">We noticed you might be feeling down.</h2>
          <p className="text-gray-500 text-sm leading-relaxed px-2">
            It's completely okay to feel this way. Sometimes speaking to a professional can help you navigate through these tough feelings.
          </p>
        </div>

        {suggestion ? (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 mb-8">
             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">
                {suggestion.doctor_name.charAt(0)}
             </div>
             <div className="flex-1 text-left">
                <h4 className="font-bold text-gray-800 text-[15px]">{suggestion.doctor_name}</h4>
                <p className="text-[12px] text-indigo-600 font-bold mb-0.5">{suggestion.specialization}</p>
                <p className="text-[11px] text-gray-500 font-medium">{suggestion.experience_years} years exp. • {suggestion.city}</p>
             </div>
          </div>
        ) : (
          <div className="animate-pulse bg-gray-100 h-[88px] rounded-2xl mb-8 border border-gray-50"></div>
        )}

        <div className="flex gap-3">
           <button 
              onClick={() => setIsOpen(false)} 
              className="flex-1 px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition"
            >
              Maybe Later
            </button>
           <button 
              onClick={() => { 
                setIsOpen(false); 
                window.location.href = '/home'; // Or some event to trigger the booking section opening
              }} 
              className="flex-1 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-200/50 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </button>
        </div>
      </div>
    </div>
  );
}
