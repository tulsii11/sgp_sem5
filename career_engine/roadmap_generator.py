ROADMAPS = {
    "Data Analyst": [
        {"phase": 1, "duration": "1-2 Months", "title": "Foundation", "skills": ["Python", "Excel", "Basic Statistics"]},
        {"phase": 2, "duration": "2-3 Months", "title": "Data Wrangling & DB", "skills": ["SQL", "Pandas"]},
        {"phase": 3, "duration": "1-2 Months", "title": "Visualization", "skills": ["Data Visualization", "Tableau", "Power BI"]},
        {"phase": 4, "duration": "1-2 Months", "title": "Advanced", "skills": ["Machine Learning Basics", "Projects"]}
    ],
    "Data Scientist": [
        {"phase": 1, "duration": "2 Months", "title": "Programming & Math", "skills": ["Python", "Statistics", "Linear Algebra"]},
        {"phase": 2, "duration": "2 Months", "title": "Data Manipulation", "skills": ["SQL", "Pandas", "NumPy"]},
        {"phase": 3, "duration": "3 Months", "title": "Machine Learning", "skills": ["Scikit-learn", "Machine Learning", "Model Evaluation"]},
        {"phase": 4, "duration": "2-3 Months", "title": "Advanced & Deployment", "skills": ["Deep Learning", "Cloud Basics", "Projects"]}
    ],
    "Machine Learning Engineer": [
        {"phase": 1, "duration": "2 Months", "title": "Software Eng & Math", "skills": ["Python", "Algorithms", "Statistics"]},
        {"phase": 2, "duration": "2 Months", "title": "ML Foundation", "skills": ["Machine Learning", "Scikit-learn", "Data Preprocessing"]},
        {"phase": 3, "duration": "3 Months", "title": "Deep Learning & Frameworks", "skills": ["Deep Learning", "TensorFlow", "PyTorch"]},
        {"phase": 4, "duration": "3 Months", "title": "Deployment & MLOps", "skills": ["Docker", "Kubernetes", "Cloud (AWS/Azure)", "CI/CD"]}
    ],
    "AI Engineer": [
        {"phase": 1, "duration": "2 Months", "title": "Programming Foundation", "skills": ["Python", "C++", "Data Structures"]},
        {"phase": 2, "duration": "3 Months", "title": "ML & Deep Learning", "skills": ["Deep Learning", "PyTorch", "TensorFlow"]},
        {"phase": 3, "duration": "3 Months", "title": "Specialization", "skills": ["NLP", "Computer Vision", "LLMs"]},
        {"phase": 4, "duration": "2 Months", "title": "Production", "skills": ["Cloud Deployments", "Generative AI", "Optimization"]}
    ],
    "Software Developer": [
        {"phase": 1, "duration": "2 Months", "title": "Fundamentals", "skills": ["Programming (Python/Java/C++)", "Data Structures", "Algorithms"]},
        {"phase": 2, "duration": "2 Months", "title": "Version Control & DB", "skills": ["Git", "GitHub", "SQL", "Relational Databases"]},
        {"phase": 3, "duration": "3 Months", "title": "Web/Backend Dev", "skills": ["JavaScript", "React", "Node.js", "APIs"]},
        {"phase": 4, "duration": "2 Months", "title": "Deployment & Agile", "skills": ["Docker", "Cloud Basics", "Agile Methodologies"]}
    ]
}

def generate_roadmap(career_name):
    return ROADMAPS.get(career_name, [])
