ROADMAPS = {

    "Data Analyst": [
        {
            "phase": 1,
            "duration": "2-4 weeks",
            "title": "Foundation",
            "skills": ["Excel", "SQL", "Statistics"]
        },
        {
            "phase": 2,
            "duration": "3-5 weeks",
            "title": "Data Analysis",
            "skills": ["Python", "Pandas", "NumPy"]
        },
        {
            "phase": 3,
            "duration": "3-5 weeks",
            "title": "Visualization",
            "skills": ["Power BI", "Tableau", "Data Visualization"]
        },
        {
            "phase": 4,
            "duration": "4-6 weeks",
            "title": "Projects",
            "skills": ["Dashboard", "Business Analysis"]
        }
    ],

    "Data Scientist": [
        {
            "phase": 1,
            "duration": "3-4 weeks",
            "title": "Programming Foundation",
            "skills": ["Python", "NumPy", "Pandas"]
        },
        {
            "phase": 2,
            "duration": "4-6 weeks",
            "title": "Statistics and ML",
            "skills": ["Statistics", "Machine Learning", "Scikit-learn"]
        },
        {
            "phase": 3,
            "duration": "4-6 weeks",
            "title": "Advanced ML",
            "skills": ["Deep Learning", "NLP"]
        },
        {
            "phase": 4,
            "duration": "4-6 weeks",
            "title": "Portfolio",
            "skills": ["ML Projects", "Deployment", "GitHub"]
        }
    ],

    "Machine Learning Engineer": [
        {
            "phase": 1,
            "duration": "3-4 weeks",
            "title": "Python and Data",
            "skills": ["Python", "NumPy", "Pandas"]
        },
        {
            "phase": 2,
            "duration": "4-6 weeks",
            "title": "Machine Learning",
            "skills": ["Machine Learning", "Scikit-learn"]
        },
        {
            "phase": 3,
            "duration": "4-6 weeks",
            "title": "Deployment",
            "skills": ["FastAPI", "Docker", "Git"]
        },
        {
            "phase": 4,
            "duration": "4-6 weeks",
            "title": "Production ML",
            "skills": ["Cloud", "MLOps", "Monitoring"]
        }
    ],

    "AI Engineer": [
        {
            "phase": 1,
            "duration": "3-4 weeks",
            "title": "Python and ML",
            "skills": ["Python", "Machine Learning"]
        },
        {
            "phase": 2,
            "duration": "4-6 weeks",
            "title": "Deep Learning",
            "skills": ["Neural Networks", "TensorFlow", "PyTorch"]
        },
        {
            "phase": 3,
            "duration": "4-6 weeks",
            "title": "AI Specialization",
            "skills": ["NLP", "Computer Vision"]
        },
        {
            "phase": 4,
            "duration": "4-6 weeks",
            "title": "AI Projects",
            "skills": ["AI Applications", "Deployment"]
        }
    ],

    "Software Developer": [
        {
            "phase": 1,
            "duration": "3-4 weeks",
            "title": "Programming Foundation",
            "skills": ["Programming", "Data Structures", "Algorithms"]
        },
        {
            "phase": 2,
            "duration": "3-5 weeks",
            "title": "Development",
            "skills": ["Git", "Database", "APIs"]
        },
        {
            "phase": 3,
            "duration": "4-6 weeks",
            "title": "Web Development",
            "skills": ["React", "Node.js"]
        },
        {
            "phase": 4,
            "duration": "4-6 weeks",
            "title": "Portfolio",
            "skills": ["Full Stack Project", "GitHub"]
        }
    ]
}


def generate_roadmap(career_name):

    return ROADMAPS.get(
        career_name,
        []
    )


if __name__ == "__main__":

    roadmap = generate_roadmap("Data Scientist")

    for phase in roadmap:
        print(phase)
