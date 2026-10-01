COURSE_MAPPING = {
    "python": [
        {"title": "Python for Everybody", "level": "Beginner", "platform": "Coursera"},
        {"title": "Complete Python Bootcamp", "level": "Intermediate", "platform": "Udemy"}
    ],
    "sql": [
        {"title": "SQL for Data Science", "level": "Beginner", "platform": "Coursera"},
        {"title": "The Complete SQL Bootcamp", "level": "Beginner", "platform": "Udemy"}
    ],
    "machine learning": [
        {"title": "Machine Learning Specialization", "level": "Intermediate", "platform": "Coursera"},
        {"title": "Machine Learning A-Z", "level": "Beginner", "platform": "Udemy"}
    ],
    "statistics": [
        {"title": "Statistics with Python", "level": "Intermediate", "platform": "Coursera"},
        {"title": "Intro to Statistics", "level": "Beginner", "platform": "Udacity"}
    ],
    "pandas": [
        {"title": "Data Analysis with Pandas and Python", "level": "Intermediate", "platform": "Udemy"}
    ],
    "numpy": [
        {"title": "Deep Learning Prerequisites: The Numpy Stack", "level": "Beginner", "platform": "Udemy"}
    ],
    "deep learning": [
        {"title": "Deep Learning Specialization", "level": "Advanced", "platform": "Coursera"}
    ],
    "nlp": [
        {"title": "Natural Language Processing Specialization", "level": "Advanced", "platform": "Coursera"}
    ],
    "git": [
        {"title": "Version Control with Git", "level": "Beginner", "platform": "Coursera"}
    ],
    "docker": [
        {"title": "Docker Mastery", "level": "Intermediate", "platform": "Udemy"}
    ],
    "cloud": [
        {"title": "AWS Certified Cloud Practitioner", "level": "Beginner", "platform": "A Cloud Guru"},
        {"title": "Google Cloud Fundamentals", "level": "Beginner", "platform": "Coursera"}
    ],
    "data visualization": [
        {"title": "Data Visualization with Python", "level": "Intermediate", "platform": "Coursera"}
    ]
}

def recommend_courses(missing_skills):
    recommendations = {}
    for skill in missing_skills:
        skill_lower = skill.lower()
        if skill_lower in COURSE_MAPPING:
            recommendations[skill_lower] = COURSE_MAPPING[skill_lower]
        else:
            recommendations[skill_lower] = [{"title": f"Learn {skill.title()}", "level": "Varies", "platform": "Coursera / Udemy"}]
    return recommendations
