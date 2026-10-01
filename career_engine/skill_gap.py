from typing import List, Dict
from career_profiles import get_career_profile


def normalize_skills(skills: List[str]) -> List[str]:
    return [skill.strip().lower() for skill in skills if skill.strip()]


def calculate_skill_gap(
    student_skills: List[str],
    career_name: str
) -> Dict:

    profile = get_career_profile(career_name)

    if not profile:
        return {
            "error": f"Career '{career_name}' not found."
        }

    student_skills = normalize_skills(student_skills)

    required_skills = profile["required_skills"]
    preferred_skills = profile["preferred_skills"]

    matched_required = [
        skill for skill in required_skills
        if skill in student_skills
    ]

    missing_required = [
        skill for skill in required_skills
        if skill not in student_skills
    ]

    matched_preferred = [
        skill for skill in preferred_skills
        if skill in student_skills
    ]

    missing_preferred = [
        skill for skill in preferred_skills
        if skill not in student_skills
    ]

    total_skills = len(required_skills)

    if total_skills > 0:
        skill_match_percentage = (
            len(matched_required) / total_skills
        ) * 100
    else:
        skill_match_percentage = 0

    return {
        "career": career_name,
        "skill_match_percentage": round(skill_match_percentage, 2),
        "matched_required_skills": matched_required,
        "missing_required_skills": missing_required,
        "matched_preferred_skills": matched_preferred,
        "missing_preferred_skills": missing_preferred
    }


if __name__ == "__main__":

    student_skills = [
        "Python",
        "SQL",
        "Excel"
    ]

    result = calculate_skill_gap(
        student_skills,
        "Data Scientist"
    )

    print(result)
