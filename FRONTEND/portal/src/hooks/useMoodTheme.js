import { useEffect, useState } from 'react';

export function useMoodTheme() {
  const [mood, setMood] = useState('neutral');

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/emotion/mood');
        if (response.ok) {
          const data = await response.json();
          if (data.mood && data.mood !== mood) {
            setMood(data.mood);
            document.body.setAttribute('data-theme', data.mood);
            console.log("Mood theme updated:", data.mood);
          }
        }
      } catch (error) {
        console.error("Failed to fetch mood theme:", error);
      }
    };

    // Fetch immediately
    fetchMood();

    // Poll every 30 seconds
    const interval = setInterval(fetchMood, 30000);
    return () => clearInterval(interval);
  }, [mood]);

  return mood;
}
