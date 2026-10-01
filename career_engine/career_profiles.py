from typing import Dict, List


CAREER_PROFILES = {
    "Data Analyst": {
        "description": "Analyze data and generate useful business insights.",
        "required_skills": [
            "python",
            "sql",
            "excel",
            "statistics",
            "pandas"
        ],
        "preferred_skills": [
            "power bi",
            "tableau",
            "numpy"
        ],
        "recommended_projects": [
            "Sales Dashboard",
            "Customer Churn Analysis",
            "Business Data Analysis"
        ],
        "certifications": [
            "Google Data Analytics",
            "Microsoft Power BI"
        ]
    },

    "Data Scientist": {
        "description": "Use statistics, programming and machine learning to solve data problems.",
        "required_skills": [
            "python",
            "sql",
            "machine learning",
            "numpy",
            "pandas",
            "statistics"
        ],
        "preferred_skills": [
            "deep learning",
            "tensorflow",
            "pytorch",
            "data visualization"
        ],
        "recommended_projects": [
            "House Price Prediction",
            "Customer Churn Prediction",
            "Fraud Detection"
        ],
        "certifications": [
            "IBM Data Science",
            "Google Advanced Data Analytics"
        ]
    },

    "Machine Learning Engineer": {
        "description": "Build, train and deploy machine learning models.",
        "required_skills": [
            "python",
            "machine learning",
            "scikit-learn",
            "numpy",
            "pandas",
            "statistics"
        ],
        "preferred_skills": [
            "tensorflow",
            "pytorch",
            "docker",
            "aws"
        ],
        "recommended_projects": [
            "ML Prediction API",
            "Recommendation System",
            "Fraud Detection System"
        ],
        "certifications": [
            "Machine Learning Specialization",
            "AWS Machine Learning"
        ]
    },

    "AI Engineer": {
        "description": "Develop AI applications using machine learning and deep learning.",
        "required_skills": [
            "python",
            "machine learning",
            "deep learning",
            "numpy",
            "pandas"
        ],
        "preferred_skills": [
            "tensorflow",
            "pytorch",
            "nlp",
            "computer vision"
        ],
        "recommended_projects": [
            "AI Chatbot",
            "Image Classification",
            "Recommendation System"
        ],
        "certifications": [
            "Deep Learning Specialization",
            "TensorFlow Developer"
        ]
    },

    "Software Developer": {
        "description": "Design and develop software applications.",
        "required_skills": [
            "programming",
            "data structures",
            "algorithms",
            "git",
            "database"
        ],
        "preferred_skills": [
            "react",
            "node.js",
            "docker",
            "cloud"
        ],
        "recommended_projects": [
            "Full Stack Web Application",
            "REST API",
            "E-Commerce Application"
        ],
        "certifications": [
            "Meta Front-End Developer",
            "AWS Cloud Practitioner"
        ]
    }
}


def get_all_careers() -> List[str]:
    return list(CAREER_PROFILES.keys())


def get_career_profile(career_name: str) -> Dict:
    return CAREER_PROFILES.get(career_name, {})


if __name__ == "__main__":
    print("Available Careers:")
    for career in get_all_careers():
        print("-", career)

    print("\nData Scientist Profile:")
    print(get_career_profile("Data Scientist"))
