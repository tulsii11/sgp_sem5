COURSES = {

    "python": [
        {
            "title": "Python Programming",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ],

    "sql": [
        {
            "title": "SQL Fundamentals",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ],

    "machine learning": [
        {
            "title": "Machine Learning Fundamentals",
            "level": "Intermediate",
            "platform": "Online Course"
        }
    ],

    "statistics": [
        {
            "title": "Statistics for Data Science",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ],

    "pandas": [
        {
            "title": "Pandas for Data Analysis",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ],

    "numpy": [
        {
            "title": "NumPy Fundamentals",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ],

    "deep learning": [
        {
            "title": "Deep Learning Fundamentals",
            "level": "Intermediate",
            "platform": "Online Course"
        }
    ],

    "nlp": [
        {
            "title": "Natural Language Processing",
            "level": "Intermediate",
            "platform": "Online Course"
        }
    ],

    "git": [
        {
            "title": "Git and GitHub Fundamentals",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ],

    "docker": [
        {
            "title": "Docker Fundamentals",
            "level": "Intermediate",
            "platform": "Online Course"
        }
    ],

    "cloud": [
        {
            "title": "Cloud Computing Fundamentals",
            "level": "Beginner",
            "platform": "Online Course"
        }
    ]
}


def get_courses_for_skill(skill):

    skill = skill.strip().lower()

    return COURSES.get(skill, [])


def recommend_courses(missing_skills):

    recommendations = []

    for skill in missing_skills:

        courses = get_courses_for_skill(skill)

        for course in courses:

            recommendations.append({
                "skill": skill,
                "title": course["title"],
                "level": course["level"],
                "platform": course["platform"]
            })

    return recommendations


if __name__ == "__main__":

    missing_skills = [
        "python",
        "sql",
        "machine learning"
    ]

    result = recommend_courses(missing_skills)

    for course in result:
        print(course)
