from career_profiles import CAREER_PROFILES


def normalize_skills(skills):

    return [
        skill.strip().lower()
        for skill in skills
        if skill.strip()
    ]


def calculate_career_score(
    student_skills,
    career_profile
):

    student_skills = normalize_skills(student_skills)

    required_skills = career_profile[
        "required_skills"
    ]

    preferred_skills = career_profile[
        "preferred_skills"
    ]

    required_matches = sum(
        skill in student_skills
        for skill in required_skills
    )

    preferred_matches = sum(
        skill in student_skills
        for skill in preferred_skills
    )

    required_score = (
        required_matches / len(required_skills)
        if required_skills
        else 0
    )

    preferred_score = (
        preferred_matches / len(preferred_skills)
        if preferred_skills
        else 0
    )

    final_score = (
        required_score * 70
        +
        preferred_score * 30
    )

    return round(final_score, 2)


def recommend_careers(student_skills):

    recommendations = []

    for career_name, profile in CAREER_PROFILES.items():

        score = calculate_career_score(
            student_skills,
            profile
        )

        recommendations.append({
            "career": career_name,
            "match_score": score
        })

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return recommendations


if __name__ == "__main__":

    student_skills = [
        "python",
        "sql",
        "pandas",
        "numpy",
        "machine learning"
    ]

    recommendations = recommend_careers(
        student_skills
    )

    for recommendation in recommendations:
        print(recommendation)
