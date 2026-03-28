import torch
import torch.nn as nn
import torchvision.models as models
from PIL import Image
import torchvision.transforms as transforms

# ---------- MODEL DEFINITION ----------
def build_model(num_classes, freeze_backbone=True):
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
    
    if freeze_backbone:
        for param in model.features.parameters():
            param.requires_grad = False

    in_features = model.classifier[1].in_features
    
    model.classifier = nn.Sequential(
        nn.Dropout(0.4),
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.Dropout(0.3),
        nn.Linear(256, num_classes),
    )
    
    return model


# ---------- DEFINE CLASSES ----------
class_names = ["Browsing_Normal", "Rest", "Stressed"]
num_classes = len(class_names)

# ---------- LOAD MODEL ----------
model = build_model(num_classes, freeze_backbone=False)
import os
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "best_mouse_model.pth")
model.load_state_dict(torch.load(model_path, map_location="cpu"))
model.eval()
print("Model loaded successfully")


# ---------- TRANSFORM ----------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225]),
])


# ---------- PREDICT FUNCTION ----------
def predict(image_path):
    img = Image.open(image_path).convert("RGB")
    img = transform(img).unsqueeze(0)

    with torch.no_grad():
        outputs = model(img)
        probs = torch.softmax(outputs, dim=1)
        pred = torch.argmax(probs, dim=1)

    dominant_class = class_names[pred.item()]
    probs_dict = {class_names[i]: float(probs[0][i].item()) for i in range(num_classes)}
    
    return dominant_class, probs_dict

# ---------- TESTS/ARGS PIPELINE ----------
if __name__ == "__main__":
    import sys
    import json
    import os
    
    if len(sys.argv) > 3:
        image_path = sys.argv[1]
        user_email = sys.argv[2]
        timestamp = sys.argv[3]
        
        try:
            dominant_class, probs_dict = predict(image_path)
            confidence = round(probs_dict[dominant_class] * 100, 2)
            
            # Prepare to save identically to emotion_logs
            backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            mouse_res_dir = os.path.join(backend_dir, "mouse_res")
            os.makedirs(mouse_res_dir, exist_ok=True)
            
            clean_email = user_email.replace("@", "_at_").replace(".", "_")
            
            res_file = f"mouse_res_{clean_email}_{timestamp}.json"
            res_path = os.path.join(mouse_res_dir, res_file)
            
            out_data = {
                "timestamp": timestamp,
                "email": user_email,
                "dominant_emotion": dominant_class,
                "confidence": confidence,
                "breakdown": {k: round(v * 100, 2) for k, v in probs_dict.items()}
            }
            
            with open(res_path, 'w', encoding='utf-8') as f:
                json.dump(out_data, f, indent=4)
                
            print(f"Successfully evaluated mouse art and saved to {res_path}")
        except Exception as e:
            print(f"Failed to process {image_path}: {e}")
            sys.exit(1)
    else:
        print("Required arguments missing. Usage: python mouseF.py <image_path> <email> <timestamp>")