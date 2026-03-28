import { useEffect, useRef } from 'react';

const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function useEmotionScanner(userEmail, cameraConsentGranted = true) {
  const isScanningRef = useRef(false);

  useEffect(() => {
    // Only run if we have a logged-in user and explicit camera consent
    if (!userEmail || !cameraConsentGranted) return;

    const triggerScan = async () => {
      if (isScanningRef.current) return;
      
      console.log("Triggering background emotion scan...");
      isScanningRef.current = true;
      
      try {
        const response = await fetch("http://127.0.0.1:8000/emotion/trigger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });
        
        if (response.ok) {
          console.log("Emotion scan successfully triggered on backend.");
        } else {
          console.error("Failed to trigger emotion scan:", response.status);
        }
      } catch (error) {
        console.error("Error triggering emotion scan:", error);
      } finally {
        isScanningRef.current = false;
      }
    };

    // Trigger an initial scan immediately upon component mount (after login)
    // The backend lock now safely prevents this from double-spawning the camera during StrictMode.
    triggerScan();

    // Set up the interval for every 10 minutes
    const intervalId = setInterval(triggerScan, INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [userEmail]);
}
