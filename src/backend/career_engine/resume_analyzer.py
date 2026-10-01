import re

KNOWN_SKILLS = [
    "python", "java", "c++", "javascript", "sql", "react", "node.js", 
    "machine learning", "deep learning", "nlp", "computer vision", 
    "tensorflow", "pytorch", "pandas", "numpy", "scikit-learn", 
    "docker", "aws", "azure", "git", "github", "mongodb", "mysql", "postgresql"
]

def analyze_resume_text(text):
    if not text:
        return {"skills_found": [], "skill_count": 0}
        
    text_lower = text.lower()
    
    skills_found = []
    for skill in KNOWN_SKILLS:
        # Use regex to find whole word matches if possible, or simple inclusion for multi-word
        # For simplicity in this engine, simple substring match bounded by non-word chars
        escaped_skill = re.escape(skill)
        # Boundary matching (handling cases where skill might be at start/end of string or surrounded by punctuation/spaces)
        pattern = r'\b' + escaped_skill + r'\b'
        if re.search(pattern, text_lower):
            skills_found.append(skill)
            
    # Fallback to direct inclusion if regex boundary fails for skills with special chars like c++
    # Specifically for C++ or Node.js which might have word boundary issues
    if "c++" not in skills_found and "c++" in text_lower:
        skills_found.append("c++")
    if "node.js" not in skills_found and "node.js" in text_lower:
        skills_found.append("node.js")
            
    # Remove duplicates just in case
    skills_found = list(set(skills_found))
        
    return {
        "skills_found": skills_found,
        "skill_count": len(skills_found)
    }
