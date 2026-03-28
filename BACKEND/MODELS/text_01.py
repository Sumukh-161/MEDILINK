#!/usr/bin/env python3
"""
Emotion Classifier using DeBERTa
Model: Somya26/deberta-emotion-classifier
Labels: anger, fear, joy, sadness, surprise

Requirements:
    pip install transformers torch
"""

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# ── Config ────────────────────────────────────────────────────────────────────
MODEL_NAME = "Somya26/deberta-emotion-classifier"
EMOTIONS   = ["anger", "fear", "joy", "sadness", "surprise"]
THRESHOLD  = 0.5   # probability cutoff to flag an emotion as "detected"

# ── Load model & tokenizer ────────────────────────────────────────────────────
print(f"Loading model: {MODEL_NAME} ...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model     = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
print(f"Running on: {device}\n")

# ── Inference function ────────────────────────────────────────────────────────
def predict_emotions(text: str) -> dict[str, float]:
    """Return a dict of {emotion: probability} for the given text."""
    inputs  = tokenizer(text, return_tensors="pt", truncation=True, max_length=512).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.sigmoid(outputs.logits).squeeze().cpu().tolist()
    return dict(zip(EMOTIONS, probs))

# ── Pretty-print helper ───────────────────────────────────────────────────────
def print_results(text: str, scores: dict[str, float]) -> None:
    print(f'Text: "{text}"')
    print("-" * 40)
    for emotion, prob in sorted(scores.items(), key=lambda x: x[1], reverse=True):
        bar      = "█" * int(prob * 30)
        detected = "  ← detected" if prob >= THRESHOLD else ""
        print(f"  {emotion:<10} {prob:5.1%}  {bar}{detected}")
    top = max(scores, key=scores.get)
    print(f"\n  Dominant emotion: {top.upper()} ({scores[top]:.1%})\n")

# ── Run ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys
    import json
    import os

    if len(sys.argv) > 1:
        # Expected workflow: passed a JSON chat log file path
        chat_file = sys.argv[1]
        try:
            with open(chat_file, 'r', encoding='utf-8') as f:
                chat_data = json.load(f)
            
            # Extract messages sent by patient only to ignore the doctor
            patient_messages = [
                m.get('text', '') for m in chat_data.get('messages', [])
                if m.get('sender') == 'patient'
            ]
            
            if not patient_messages:
                print(f"No patient messages found in {chat_file}. Exiting.")
                sys.exit(0)
            
            # Combine text intelligently
            combined_text = " ".join(patient_messages)
            
            # Run Huggingface DeBERTa inference payload
            scores = predict_emotions(combined_text)
            
            # Extract dominant emotion stats natively
            dominant_emotion = max(scores, key=scores.get)
            confidence = round(scores[dominant_emotion] * 100, 2)
            
            # Prepare to save identically to emotion_logs
            backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            chat_res_dir = os.path.join(backend_dir, "chat_res")
            os.makedirs(chat_res_dir, exist_ok=True)
            
            email = chat_data.get("patient_email", "anonymous")
            clean_email = email.replace("@", "_at_").replace(".", "_")
            consult_id = chat_data.get("consultation_id", "unknown")
            timestamp = chat_data.get("saved_at", "unknown")
            
            res_file = f"chat_res_{clean_email}_consult_{consult_id}_{timestamp}.json"
            res_path = os.path.join(chat_res_dir, res_file)
            
            out_data = {
                "timestamp": timestamp,
                "email": email,
                "consultation_id": consult_id,
                "dominant_emotion": dominant_emotion,
                "confidence": confidence,
                "total_messages_analyzed": len(patient_messages),
                "breakdown": {k: round(v * 100, 2) for k, v in scores.items()}
            }
            
            with open(res_path, 'w', encoding='utf-8') as f:
                json.dump(out_data, f, indent=4)
                
            print(f"Successfully evaluated chat text and saved to {res_path}")
            
        except Exception as e:
            print(f"Failed to process {chat_file}: {e}")
            sys.exit(1)
    else:
        # Fallback test samples if run manually without arguments
        samples = [
            "I am so happy today!",
            "This makes me incredibly angry.",
            "I'm scared of what might happen next.",
            "I miss them so much, it hurts.",
            "Wow, I did not see that coming at all!",
        ]

        for sample in samples:
            scores = predict_emotions(sample)
            print_results(sample, scores)