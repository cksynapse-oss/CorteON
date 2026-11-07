import urllib.request
import os
from PIL import Image

os.makedirs('public/images', exist_ok=True)

# Curated high-resolution photographs:
# 1. Authentic Wikimedia Commons photos for Chamba town, Chamba Rumal, Himachal apple harvest
# 2. Authentic Unsplash educational & collaborative photography (licensed for commercial & non-commercial use)
PHOTO_SOURCES = [
    {
        "filename": "home-hero.webp",
        "url": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Chamba_Town.jpg",
        "fallback_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
        "crop_size": (1600, 900),
        "desc": "Chamba town valley, Ravi river and Himalayan mountains"
    },
    {
        "filename": "pathway-school.webp",
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 800),
        "desc": "High school classroom science and mathematics teaching with structured blackboard"
    },
    {
        "filename": "pathway-college.webp",
        "url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 800),
        "desc": "College student focused on competitive examination preparation with notebooks and practice tests"
    },
    {
        "filename": "pathway-business.webp",
        "url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 800),
        "desc": "Young team collaborating around laptops on practical business project planning"
    },
    {
        "filename": "chamba-landscape.webp",
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/d0/View_of_chamba_town.jpg",
        "fallback_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 750),
        "desc": "Panoramic view of Chamba town and historic settlements"
    },
    {
        "filename": "chamba-rumal-artisan.webp",
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Chamba_Rumal_.jpg",
        "fallback_url": "https://upload.wikimedia.org/wikipedia/commons/7/7e/19th_Century_Chamba_Rumal.jpg",
        "crop_size": (1000, 700),
        "desc": "Authentic Chamba Rumal heritage silk-on-cotton double-sided embroidery"
    },
    {
        "filename": "chamba-hospitality.webp",
        "url": "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=85",
        "crop_size": (1000, 700),
        "desc": "Himalayan travel experience and mountain wooden homestay hospitality"
    },
    {
        "filename": "chamba-agro-products.webp",
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Apple_Harvest_Season_in_Himachal_Pradesh.jpg",
        "fallback_url": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1000&q=85",
        "crop_size": (1000, 700),
        "desc": "Fresh apple harvest in Himachal Pradesh mountain orchards"
    },
    {
        "filename": "synapse-chamba-centre.webp",
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 750),
        "desc": "Offline study desks and learning classroom setup"
    },
    {
        "filename": "about-synapse.webp",
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 750),
        "desc": "Teacher and students discussing problem-solving in a serious educational classroom"
    },
    {
        "filename": "home-learning.webp",
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85",
        "crop_size": (1200, 800),
        "desc": "Student reading and preparing in study classroom"
    },
    {
        "filename": "subject-class-science.webp",
        "url": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=85",
        "crop_size": (800, 500),
        "desc": "Science laboratory and numerical problem solving equipment"
    },
    {
        "filename": "communication-speaking.webp",
        "url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
        "crop_size": (800, 500),
        "desc": "Professional communication, speaking and presentation practice"
    },
    {
        "filename": "ai-literacy-workshop.webp",
        "url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=85",
        "crop_size": (800, 500),
        "desc": "Applied AI tools and workflow exploration on laptops"
    },
    {
        "filename": "foundation-study.webp",
        "url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=85",
        "crop_size": (800, 500),
        "desc": "Structured books and study materials for competitive aptitude"
    },
    {
        "filename": "question-bank-practice.webp",
        "url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=85",
        "crop_size": (800, 500),
        "desc": "Exam question paper and timed practice preparation"
    },
    {
        "filename": "business-teamwork.webp",
        "url": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85",
        "crop_size": (800, 500),
        "desc": "Business strategy workshop and customer discovery discussion"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for item in PHOTO_SOURCES:
    dest_path = os.path.join('public/images', item['filename'])
    temp_path = dest_path + '.temp'
    print(f"Downloading {item['filename']}...")
    
    success = False
    for url in [item['url'], item.get('fallback_url')]:
        if not url:
            continue
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as response, open(temp_path, 'wb') as out_file:
                out_file.write(response.read())
            
            # Process with PIL
            with Image.open(temp_path) as img:
                img = img.convert('RGB')
                target_w, target_h = item['crop_size']
                
                # Aspect crop
                img_ratio = img.width / img.height
                target_ratio = target_w / target_h
                
                if img_ratio > target_ratio:
                    new_w = int(img.height * target_ratio)
                    offset = (img.width - new_w) // 2
                    img = img.crop((offset, 0, offset + new_w, img.height))
                else:
                    new_h = int(img.width / target_ratio)
                    offset = (img.height - new_h) // 2
                    img = img.crop((0, offset, img.width, offset + new_h))
                
                img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
                img.save(dest_path, 'WEBP', quality=85)
            
            os.remove(temp_path)
            success = True
            print(f"  ✓ Saved {item['filename']} ({target_w}x{target_h})")
            break
        except Exception as e:
            print(f"  ⚠️ Failed from {url[:50]}...: {e}")
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    if not success:
        print(f"  ❌ Could not download {item['filename']}")

print("\nDone fetching photographs!")
