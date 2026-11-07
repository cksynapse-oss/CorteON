import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/images', exist_ok=True)

assets = [
    {
        "filename": "home-learning.webp",
        "title": "Synapse Learning Community",
        "subtitle": "Structured Online Courses · Chamba, HP",
        "tag": "LEARNING COMMUNITY",
        "dim": (1200, 675)
    },
    {
        "filename": "foundation-study.webp",
        "title": "Foundation Pack",
        "subtitle": "General Awareness · Reasoning · Quantitative Aptitude",
        "tag": "FOUNDATION STUDY",
        "dim": (800, 500)
    },
    {
        "filename": "question-bank-practice.webp",
        "title": "Question Bank & Practice",
        "subtitle": "Exam-Pattern Timed Practice & Performance Review",
        "tag": "EXAM PRACTICE",
        "dim": (800, 500)
    },
    {
        "filename": "subject-class-science.webp",
        "title": "Subject Classes",
        "subtitle": "Physics · Chemistry · Biology · Mathematics",
        "tag": "CLASS 11–12",
        "dim": (800, 500)
    },
    {
        "filename": "communication-speaking.webp",
        "title": "Communication Skills",
        "subtitle": "English + Hindi Speaking, Reading & Writing",
        "tag": "COMMUNICATION",
        "dim": (800, 500)
    },
    {
        "filename": "ai-literacy-workshop.webp",
        "title": "Applied AI Literacy",
        "subtitle": "Practical Workflows, Tools & Responsible Use",
        "tag": "AI WORKSHOP",
        "dim": (800, 500)
    },
    {
        "filename": "business-teamwork.webp",
        "title": "Business Development",
        "subtitle": "3 Months Learning + 3 Months Mentored Internship",
        "tag": "BUSINESS & INTERNSHIP",
        "dim": (800, 500)
    },
    {
        "filename": "chamba-rumal-artisan.webp",
        "title": "Chamba Rumal & Heritage Apparel",
        "subtitle": "Artisan Coordination · Product Development in Progress",
        "tag": "VENTURE PLACEHOLDER",
        "dim": (800, 500)
    },
    {
        "filename": "chamba-hospitality.webp",
        "title": "Chamba Travel & Experiences",
        "subtitle": "Hospitality & Visitor Model in Development",
        "tag": "VENTURE PLACEHOLDER",
        "dim": (800, 500)
    },
    {
        "filename": "chamba-agro-products.webp",
        "title": "Chamba FMCG & Agro-Products",
        "subtitle": "Local Produce Concept in Development",
        "tag": "VENTURE PLACEHOLDER",
        "dim": (800, 500)
    },
    {
        "filename": "synapse-chamba-centre.webp",
        "title": "Synapse Centre",
        "subtitle": "Behind the Post Office, Chamba, Himachal Pradesh",
        "tag": "CENTRE BASE",
        "dim": (800, 500)
    }
]

# Design tokens
PAPER = (243, 238, 228)
INK = (21, 19, 15)
MUTED = (92, 87, 75)
HAIR = (216, 208, 191)
SPARK = (217, 72, 31)

for item in assets:
    w, h = item["dim"]
    img = Image.new("RGB", (w, h), color=PAPER)
    draw = ImageDraw.Draw(img)
    
    # Outer border
    draw.rectangle([(16, 16), (w - 17, h - 17)], outline=HAIR, width=1)
    # Inner border
    draw.rectangle([(24, 24), (w - 25, h - 25)], outline=HAIR, width=1)
    
    # Accent dot & tag
    draw.ellipse([(44, 44), (54, 54)], fill=SPARK)
    
    # Text rendering using default font
    draw.text((64, 42), item["tag"], fill=SPARK)
    
    # Center titles
    draw.text((44, h // 2 - 20), item["title"], fill=INK)
    draw.text((44, h // 2 + 10), item["subtitle"], fill=MUTED)
    
    # Watermark / brand mark at bottom
    draw.text((44, h - 50), "SYNAPSE · CENTRE FOR LEARNING & INNOVATION · CHAMBA", fill=MUTED)
    
    out_path = os.path.join("public/images", item["filename"])
    img.save(out_path, "WEBP", quality=85)
    print(f"Generated {out_path}")
