import os
from career_recommender import recommend_careers
from skill_gap import calculate_skill_gap
from course_recommender import recommend_courses
from roadmap_generator import generate_roadmap
from resume_parser import extract_text_from_pdf
from resume_analyzer import analyze_resume


def run_skill_flow(student_skills):
    print("--- 1. Student Skills ---")
    print(f"Input Skills: {student_skills}")

    print("\n--- 2. Career Match ---")
    matches = recommend_careers(student_skills)
    for match in matches:
        print(f" - {match['career']}: {match['match_score']}% Match")

    if not matches:
        print("No matches found.")
        return

    # 3. Select Career (We pick the top match automatically for the flow)
    top_career = matches[0]["career"]
    print(f"\n--- 3. Select Career ---")
    print(f"Selected Top Match: {top_career}")

    print("\n--- 4. Skill Gap Analysis & 5. Missing Skills ---")
    gap = calculate_skill_gap(student_skills, top_career)
    missing_required = gap.get("missing_required_skills", [])
    missing_preferred = gap.get("missing_preferred_skills", [])
    
    missing_skills = missing_required + missing_preferred
    
    print(f"Missing Required Skills: {missing_required}")
    print(f"Missing Preferred Skills: {missing_preferred}")

    print("\n--- 6. Course Recommendations ---")
    courses = recommend_courses(missing_skills)
    if not courses:
        print("No courses needed or available.")
    else:
        for course in courses:
            print(f" - [{course['skill'].title()}] {course['title']} ({course['platform']})")

    print("\n--- 7. Career Roadmap ---")
    roadmap = generate_roadmap(top_career)
    for phase in roadmap:
        print(f" - Phase {phase['phase']} ({phase['duration']}): {phase['title']} -> {phase['skills']}")


def run_resume_flow(pdf_path):
    print("====================================")
    print("      TESTING RESUME UPLOAD FLOW    ")
    print("====================================")
    print("--- 1. Resume PDF ---")
    print(f"Reading file: {pdf_path}")
    
    if not os.path.exists(pdf_path):
        print(f"Notice: '{pdf_path}' not found. Please provide an actual PDF file to test this flow.")
        return

    print("\n--- 2. PDF Text Extraction ---")
    try:
        text = extract_text_from_pdf(pdf_path)
        print(f"Successfully extracted {len(text)} characters of text.")
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return

    print("\n--- 3. Skill Detection ---")
    analysis = analyze_resume(text)
    skills = analysis.get("skills_found", [])
    print(f"Skills detected in resume: {skills}")
    
    if not skills:
        print("No known skills could be extracted from the resume.")
        return

    print("\n--- Continuing to Main Flow ---")
    run_skill_flow(skills)


if __name__ == "__main__":
    print("====================================")
    print("      TESTING MANUAL SKILL FLOW     ")
    print("====================================")
    sample_skills = ["python", "sql", "pandas", "numpy", "machine learning"]
    run_skill_flow(sample_skills)
    
    print("\n\n")
    # This will safely tell the user a PDF is needed without throwing an error crash
    run_resume_flow("sample_resume.pdf")
