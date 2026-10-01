SKILL_KEYWORDS = [

    "python",
    "java",
    "c++",
    "javascript",
    "sql",
    "react",
    "node.js",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "tensorflow",
    "pytorch",
    "pandas",
    "numpy",
    "scikit-learn",
    "docker",
    "aws",
    "azure",
    "git",
    "github",
    "mongodb",
    "mysql",
    "postgresql"
]


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILL_KEYWORDS:

        if skill in text:

            found_skills.append(skill)

    return found_skills


def analyze_resume(text):

    skills = extract_skills(text)

    return {
        "skills_found": skills,
        "skill_count": len(skills)
    }


if __name__ == "__main__":

    sample_text = """
    I am a Python developer with experience
    in machine learning, pandas, numpy,
    SQL and GitHub.
    """

    result = analyze_resume(
        sample_text
    )

    print(result)
