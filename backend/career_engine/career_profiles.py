CAREER_PROFILES = {
    "Data Analyst": {
        "description": "Analyzes data to help businesses make decisions.",
        "required_skills": ["python", "sql", "excel", "data visualization", "pandas", "statistics"],
        "preferred_skills": ["tableau", "power bi", "r", "machine learning"],
        "recommended_projects": ["Sales Data Dashboard", "Customer Churn Analysis"],
        "certifications": ["Google Data Analytics Professional Certificate", "IBM Data Analyst"]
    },
    "Data Scientist": {
        "description": "Extracts insights and builds models from complex data.",
        "required_skills": ["python", "sql", "machine learning", "statistics", "pandas", "numpy", "scikit-learn"],
        "preferred_skills": ["deep learning", "nlp", "tensorflow", "pytorch", "cloud"],
        "recommended_projects": ["Predictive Maintenance Model", "Recommendation System"],
        "certifications": ["IBM Data Science Professional Certificate", "AWS Certified Machine Learning"]
    },
    "Machine Learning Engineer": {
        "description": "Designs and deploys machine learning models into production.",
        "required_skills": ["python", "machine learning", "deep learning", "software engineering", "docker", "sql"],
        "preferred_skills": ["kubernetes", "aws", "azure", "mlops", "tensorflow", "pytorch"],
        "recommended_projects": ["Model Deployment API", "Real-time Object Detection"],
        "certifications": ["AWS Certified Machine Learning - Specialty", "Google Professional Machine Learning Engineer"]
    },
    "AI Engineer": {
        "description": "Develops intelligent systems, including NLP and Computer Vision applications.",
        "required_skills": ["python", "deep learning", "nlp", "computer vision", "tensorflow", "pytorch"],
        "preferred_skills": ["c++", "cloud", "generative ai", "llms"],
        "recommended_projects": ["Chatbot with LLMs", "Facial Recognition System"],
        "certifications": ["Azure AI Engineer Associate", "DeepLearning.AI Specialized Certifications"]
    },
    "Software Developer": {
        "description": "Builds and maintains software applications.",
        "required_skills": ["python", "java", "c++", "javascript", "git", "sql", "data structures"],
        "preferred_skills": ["react", "node.js", "docker", "cloud", "agile"],
        "recommended_projects": ["Full-Stack Web App", "RESTful API Development"],
        "certifications": ["AWS Certified Developer - Associate", "Microsoft Certified: Azure Developer"]
    }
}

def get_all_careers():
    return list(CAREER_PROFILES.keys())

def get_career_profile(career_name):
    return CAREER_PROFILES.get(career_name)
