import os
import json
import asyncio
from datetime import datetime
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MOUSE_DIR = os.path.join(BASE_DIR, "mouse_res")
CHAT_DIR = os.path.join(BASE_DIR, "chat_res")
EMOTION_DIR = os.path.join(BASE_DIR, "emotion_logs")
OUTPUT_DIR = os.path.join(BASE_DIR, "user_mood")

# Emotion Mappings
EMOTION_MAP = {
    # Happy mappings
    "joy": "happy",
    "happy": "happy",
    "Browsing_Normal": "happy",

    # Angry mappings
    "anger": "angry",
    "angry": "angry",
    "Stressed": "angry",

    # Sad mappings
    "sadness": "sad",
    "sad": "sad",

    # Fear mappings
    "fear": "fear",

    # Surprise mappings
    "surprise": "surprise",

    # Neutral mappings
    "neutral": "neutral",
    "Rest": "neutral",
}

def get_most_recent_log(directory):
    if not os.path.exists(directory):
        return None
    files = glob.glob(os.path.join(directory, "*"))
    files = [f for f in files if f.endswith(".json") or f.endswith(".log")]
    if not files:
        return None
    return max(files, key=os.path.getmtime)

def extract_dominant_emotion(file_path):
    if not file_path or not os.path.exists(file_path):
        return None
    try:
        if file_path.endswith('.json'):
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("dominant_emotion")
        else:
            with open(file_path, "r", encoding="utf-8") as f:
                for line in f:
                    try:
                        data = json.loads(line)
                        if "dominant_emotion" in data:
                            return data["dominant_emotion"]
                    except:
                        pass
    except:
        pass
    return None

def aggregate_mood():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    mouse_file = get_most_recent_log(MOUSE_DIR)
    chat_file = get_most_recent_log(CHAT_DIR)
    emotion_file = get_most_recent_log(EMOTION_DIR)

    emotions = {
        "mouse": extract_dominant_emotion(mouse_file),
        "chat": extract_dominant_emotion(chat_file),
        "emotion": extract_dominant_emotion(emotion_file),
    }

    mood_counts = {}
    valid_emotions = []

    for source, raw_emotion in emotions.items():
        if raw_emotion:
            mapped_mood = EMOTION_MAP.get(raw_emotion, raw_emotion.lower())
            mood_counts[mapped_mood] = mood_counts.get(mapped_mood, 0) + 1
            valid_emotions.append({
                "source": source,
                "raw": raw_emotion,
                "mapped": mapped_mood
            })

    if not valid_emotions:
        return

    dominant_mood = max(mood_counts, key=mood_counts.get)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    result = {
        "timestamp": timestamp,
        "aggregated_dominant_mood": dominant_mood,
        "mood_counts": mood_counts,
        "sources_used": valid_emotions
    }

    output_file = os.path.join(OUTPUT_DIR, f"aggregated_mood_{timestamp}.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4)
    print(f"Aggregated mood '{dominant_mood}' saved to {output_file}")

async def mood_aggregator_task():
    """Background task to run every 15 minutes."""
    while True:
        try:
            aggregate_mood()
        except Exception as e:
            print(f"Error in mood aggregator: {e}")
        # Wait 15 minutes before running again
        await asyncio.sleep(15 * 60)
