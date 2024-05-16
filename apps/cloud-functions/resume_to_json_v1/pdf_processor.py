import fitz
import base64

# Count variable is to get the number of pages in the pdf
def convert_page_to_image(page):
    try:
        zoom = 2 # to increase the resolution
        mat = fitz.Matrix(zoom, zoom)
        pix_byte = page.get_pixmap(matrix = mat).tobytes()
        return base64.b64encode(pix_byte).decode('utf-8')
    except Exception as e:
        print(e)

def convert_pdf_to_images(pdf_buffer):
    doc = fitz.open(stream=pdf_buffer, filetype="pdf")
    temp_images = []
    try:
        count = len(doc)
        for i in range(len(doc)):
            page = doc.load_page(i)
            image_bytes = convert_page_to_image(page)
            temp_images.append(image_bytes)
    except Exception as e:
        print(e)
    finally:
        doc.close()
    return temp_images