from .career_profiles import get_all_careers, get_career_profile

def recommend_careers(student_skills):
    student_skills_lower = set([s.lower().strip() for s in student_skills])
    
    career_scores = []
    
    for career in get_all_careers():
        profile = get_career_profile(career)
        required = set([s.lower() for s in profile.get("required_skills", [])])
        preferred = set([s.lower() for s in profile.get("preferred_skills", [])])
        
        req_match = len(required.intersection(student_skills_lower))
        pref_match = len(preferred.intersection(student_skills_lower))
        
        req_score = (req_match / len(required)) * 100 if required else 0
        pref_score = (pref_match / len(preferred)) * 100 if preferred else 0
        
        # 70% weight for required, 30% weight for preferred
        total_score = (0.7 * req_score) + (0.3 * pref_score)
        
        career_scores.append({
            "career": career,
            "match_score": round(total_score, 2),
            "matched_required": list(required.intersection(student_skills_lower)),
            "matched_preferred": list(preferred.intersection(student_skills_lower))
        })
        
    # Sort by match score descending
    career_scores.sort(key=lambda x: x["match_score"], reverse=True)
    return career_scores
