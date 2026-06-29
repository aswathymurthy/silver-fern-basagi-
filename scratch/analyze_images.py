import os
import struct

assets_dir = r"c:\Users\Aswathy\Desktop\silver-fern\silver-fern\public\assets"

def get_image_info(path):
    size = os.path.getsize(path)
    ext = os.path.splitext(path)[1].lower()
    
    if ext == '.png':
        try:
            with open(path, 'rb') as f:
                header = f.read(24)
                if header[:8] == b'\x89PNG\r\n\x1a\n':
                    w, h = struct.unpack('>II', header[16:24])
                    return f"PNG, {w}x{h}, size={size} bytes"
                elif header[:4] == b'\xff\xd8\xff\xe0' or header[:4] == b'\xff\xd8\xff\xe1':
                    return f"JPEG disguised as PNG, size={size} bytes"
                return f"PNG (bad header), size={size} bytes"
        except Exception as e:
            return f"PNG error: {e}"
            
    elif ext in ('.jpg', '.jpeg'):
        return f"JPEG, size={size} bytes"
        
    return f"Unknown ({ext}), size={size} bytes"

for f in sorted(os.listdir(assets_dir)):
    path = os.path.join(assets_dir, f)
    if os.path.isfile(path):
        print(f"{f:20s}: {get_image_info(path)}")
