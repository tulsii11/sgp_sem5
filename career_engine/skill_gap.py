from .career_profiles import get_career_profile

def analyze_skill_gap(student_skills, career_name):
    student_skills_lower = [s.lower().strip() for s in student_skills]
    
    profile = get_career_profile(career_name)
    if not profile:
        return {"error": "Career not found."}
        
    required_skills = [s.lower() for s in profile.get("required_skills", [])]
    preferred_skills = [s.lower() for s in profile.get("preferred_skills", [])]
    
    matched_required = [s for s in required_skills if s in student_skills_lower]
    missing_required = [s for s in required_skills if s not in student_skills_lower]
    
    matched_preferred = [s for s in preferred_skills if s in student_skills_lower]
    missing_preferred = [s for s in preferred_skills if s not in student_skills_lower]
    
    match_percentage = 0
    if required_skills:
        match_percentage = (len(matched_required) / len(required_skills)) * 100.0
        
    return {
        "career": career_name,
        "skill_match_percentage": round(match_percentage, 2),
        "matched_required_skills": matched_required,
        "missing_required_skills": missing_required,
        "matched_preferred_skills": matched_preferred,
        "missing_preferred_skills": missing_preferred
    }
