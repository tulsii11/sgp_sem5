import os
try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

def extract_text_from_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        return None
        
    if PdfReader is None:
        raise ImportError("pypdf is not installed. Please install it using 'pip install pypdf'")
        
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return None
