import os

EXCLUDED_EXT = {".pyc", ".exe", ".cfg",".py",".txt"}
EXCLUDED_DIRS = {"__pycache__", "venv", "node_modules"}

MEDIA_EXT = {".mp4", ".mp3", ".png", ".jpg", ".jpeg", ".webp"}

# ---------------------
# OUTPUT CAPTURE (FILE ONLY, NO PRINT)
# ---------------------

OUTPUT_LINES = []

def emit(line: str):
    OUTPUT_LINES.append(line)


# ---------------------
# HELPERS
# ---------------------

def is_media_only_folder(path):
    """Return True if folder contains ONLY media files (no subfolders, no other extensions)."""
    files = []
    for name in os.listdir(path):
        if name.startswith("."):
            continue
        full = os.path.join(path, name)
        if os.path.isdir(full):
            return False
        ext = os.path.splitext(name)[1].lower()
        files.append(ext)

    if not files:
        return False
    
    return all(ext in MEDIA_EXT for ext in files)


# ---------------------
# TREE BUILDER
# ---------------------

def print_tree(root, prefix="", mode="all"):
    items = []
    for name in os.listdir(root):
        if name.startswith("."):
            continue
        if name in EXCLUDED_DIRS:
            continue

        path = os.path.join(root, name)

        if os.path.isfile(path):
            _, ext = os.path.splitext(name)
            if mode == "folders":
                continue
            if ext.lower() in EXCLUDED_EXT:
                continue

        items.append(name)

    items = sorted(items)

    for idx, name in enumerate(items):
        path = os.path.join(root, name)
        is_last = idx == len(items) - 1
        connector = "└── " if is_last else "├── "

        emit(prefix + connector + name)

        if os.path.isdir(path):
            if is_media_only_folder(path):
                media_files = sorted(
                    f for f in os.listdir(path) if not f.startswith(".")
                )

                ex_prefix = prefix + ("    " if is_last else "│   ")
                for f in media_files[:2]:
                    emit(ex_prefix + "├── " + f)
                emit(ex_prefix + "└── ..")
                continue

            extension = "    " if is_last else "│   "
            print_tree(path, prefix + extension, mode=mode)


# ---------------------
# RUN
# ---------------------

ROOT_PATH = "/home/manika/Infineo/landing-page-old/Infineo-Landing-Page"

emit("=== TREE STRUCTURE ===")
print_tree(ROOT_PATH, mode="all")

# ---------------------
# WRITE TO FILE (ALWAYS OVERWRITE)
# ---------------------

output_filename = "tree_structure.txt"
output_path = os.path.join(os.getcwd(), output_filename)

with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(OUTPUT_LINES))
