

import cv2
import time
from collections import Counter
from PIL import Image
from transformers import pipeline
import sys


MODEL_ID        = "dima806/facial_emotions_image_detection"
DURATION_SEC    = 120    # 2 minutes
INFERENCE_EVERY = 2.0    # run prediction every 2 seconds (60 predictions total)


print("Loading model... (first run downloads ~90 MB, please wait)")
emotion_pipe = pipeline(
    "image-classification",
    model=MODEL_ID,
    top_k=1,
    device=-1,   # CPU; change to 0 for CUDA GPU
)
print(f"Model ready. Observing for {DURATION_SEC // 60} minute(s)... do not close this window.\n")


def open_camera():
    # On Windows, DirectShow is often more stable than MSMF for continuous reads.
    backend_candidates = []
    if sys.platform.startswith("win"):
        backend_candidates = [cv2.CAP_DSHOW, cv2.CAP_MSMF]
    else:
        backend_candidates = [cv2.CAP_ANY]

    for backend in backend_candidates:
        cap_obj = cv2.VideoCapture(0, backend)
        if cap_obj.isOpened():
            return cap_obj
        cap_obj.release()
    return None


cap = open_camera()
if cap is None:
    print("ERROR: Cannot access webcam. Close other apps using camera and check camera permissions.")
    sys.exit(1)

cap.set(cv2.CAP_PROP_FRAME_WIDTH,  640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

emotion_counts  = Counter()
last_inference  = 0.0
start_time      = time.time()
sample_number   = 0

while True:
    elapsed = time.time() - start_time

    # Stop after DURATION_SEC
    if elapsed >= DURATION_SEC:
        break

    ret, frame = cap.read()
    if not ret:
        # Prevent tight warning loops when camera temporarily fails.
        time.sleep(0.05)
        continue

    now = time.time()
    if now - last_inference >= INFERENCE_EVERY:
        last_inference = now
        sample_number += 1

        pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

        try:
            result = emotion_pipe(pil_img)
            top_label = result[0]["label"].lower()
            emotion_counts[top_label] += 1

            # Simple progress indicator (no camera window)
            remaining = int(DURATION_SEC - elapsed)
            print(f"  [{sample_number:>3}] Detected: {top_label:<12}  |  {remaining}s remaining")

        except Exception as e:
            print(f"  Inference error: {e}")

cap.release()
cv2.destroyAllWindows()


print("\n" + "=" * 45)
print("         EMOTION DETECTION COMPLETE")
print("=" * 45)

if not emotion_counts:
    print("No emotions detected. Check your webcam.")
else:
    dominant_emotion = emotion_counts.most_common(1)[0][0]
    dominant_count   = emotion_counts.most_common(1)[0][1]
    total_samples    = sum(emotion_counts.values())

    print(f"\n  Dominant Emotion : {dominant_emotion.upper()}")
    print(f"  Detected in      : {dominant_count}/{total_samples} samples "
          f"({dominant_count/total_samples*100:.1f}%)")

    print("\n  Full Breakdown:")
    for emotion, count in emotion_counts.most_common():
        bar = "#" * count
        print(f"    {emotion:<12} {bar}  ({count})")

    # SAVE TO JSON FILE
    import os, json, sys
    from datetime import datetime

    backend_dir  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logs_dir     = os.path.join(backend_dir, "emotion_logs")
    os.makedirs(logs_dir, exist_ok=True)
    
    timestamp    = datetime.now().strftime("%Y%m%d_%H%M%S")
    user_email   = sys.argv[1] if len(sys.argv) > 1 else "anonymous"
    clean_email  = user_email.replace("@", "_at_").replace(".", "_")
    
    file_name    = f"emotion_scan_{clean_email}_{timestamp}.json"
    file_path    = os.path.join(logs_dir, file_name)

    data = {
        "timestamp": timestamp,
        "email": user_email,
        "dominant_emotion": dominant_emotion,
        "confidence": round((dominant_count / total_samples) * 100, 2),
        "total_samples": total_samples,
        "breakdown": dict(emotion_counts)
    }

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
        
    print(f"\nSaved emotion log successfully to {file_path}")

print("=" * 45)
