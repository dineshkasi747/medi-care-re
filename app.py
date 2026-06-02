import fitz
import re
import json
import os

PDF_FILE = "4-WeR4Help_2023-24_Tenure_Activity_Report_New.pdf"

doc = fitz.open(PDF_FILE)

events = []

# Create folder for images
os.makedirs("images", exist_ok=True)

for page_num, page in enumerate(doc):

    text = page.get_text()

    # Extract title
    title_match = re.search(r"Event:\s*(.*)", text)

    if not title_match:
        continue

    # Extract date
    date_match = re.search(r"Date:\s*(.*)", text)

    # Extract place
    place_match = re.search(r"Place:\s*(.*)", text)

    # Extract volunteers
    volunteer_match = re.search(
        r"No\s*of\s*Volunteers[:]?\s*(\d+)",
        text,
        re.IGNORECASE
    )

    # Extract description
    desc_match = re.search(
        r"Event\s*Description\s*:(.*?)(Volunteers distributing|Orphanage visit|Volunteers participating|$)",
        text,
        re.DOTALL | re.IGNORECASE
    )

    description = ""

    if desc_match:
        description = re.sub(
            r"\s+",
            " ",
            desc_match.group(1)
        ).strip()

    # Extract images
    image_paths = []

    image_list = page.get_images(full=True)

    for img_index, img in enumerate(image_list):

        xref = img[0]

        base_image = doc.extract_image(xref)

        image_bytes = base_image["image"]

        image_ext = base_image["ext"]

        image_name = f"event_{page_num+1}_{img_index}.{image_ext}"

        image_path = os.path.join("images", image_name)

        with open(image_path, "wb") as image_file:
            image_file.write(image_bytes)

        image_paths.append(image_path)

    # Create event object
    event = {
        "title": title_match.group(1).strip(),

        "date": date_match.group(1).strip()
        if date_match else "",

        "place": place_match.group(1).strip()
        if place_match else "",

        "volunteers": volunteer_match.group(1).strip()
        if volunteer_match else "",

        "description": description,

        "images": image_paths
    }

    events.append(event)

# Save JSON
with open("events.json", "w", encoding="utf-8") as f:
    json.dump(events, f, indent=4, ensure_ascii=False)

print("✅ Extraction Completed")
print(json.dumps(events, indent=4, ensure_ascii=False))