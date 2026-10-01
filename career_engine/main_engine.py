import os
import sys

# Ensure career_engine can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from career_engine.career_recommender import recommend_careers
from career_engine.skill_gap import analyze_skill_gap
from career_engine.course_recommender import recommend_courses
from career_engine.roadmap_generator import generate_roadmap
from career_engine.resume_parser import extract_text_from_pdf
from career_engine.resume_analyzer import analyze_resume_text

def test_manual_flow():
    print("=" * 50)
    print("TESTING MANUAL SKILL FLOW")
    print("=" * 50)
    
    student_skills = ["Python", "SQL", "Pandas", "Java", "Git"]
    print(f"1. Student Skills: {student_skills}\n")
    
    career_matches = recommend_careers(student_skills)
    print("2. Career Matches (Career Match Score):")
    for match in career_matches:
        print(f"   - {match['career']}: {match['match_score']}%")
    print()
    
    if not career_matches:
        print("No career matches found.")
        return
        
    selected_career = career_matches[0]['career']
    print(f"3. Selected Career: {selected_career}\n")
    
    gap_analysis = analyze_skill_gap(student_skills, selected_career)
    print("4. Skill Gap Analysis:")
    print(f"   - Match: {gap_analysis['skill_match_percentage']}%")
    print(f"   - Matched Required: {gap_analysis['matched_required_skills']}")
    print(f"   - Missing Required: {gap_analysis['missing_required_skills']}\n")
    
    missing_skills = gap_analysis['missing_required_skills']
    print("5. Missing Skills to Learn:")
    print(f"   {missing_skills}\n")
    
    courses = recommend_courses(missing_skills)
    print("6. Course Recommendations:")
    for skill, recs in courses.items():
        print(f"   - {skill.title()}:")
        for rec in recs:
            print(f"     * {rec['title']} ({rec['platform']} - {rec['level']})")
    print()
    
    roadmap = generate_roadmap(selected_career)
    print("7. Career Roadmap:")
    for phase in roadmap:
        print(f"   Phase {phase['phase']} ({phase['duration']}): {phase['title']}")
        print(f"   Skills: {', '.join(phase['skills'])}")
    print()

def test_resume_flow():
    print("=" * 50)
    print("TESTING RESUME PARSER FLOW")
    print("=" * 50)
    
    pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sample_resume.pdf")
    
    if not os.path.exists(pdf_path):
        print("sample_resume.pdf not found. Please provide an actual PDF file to test this flow.")
        return
        
    print(f"Found PDF: {pdf_path}")
    print("Extracting text...")
    
    text = extract_text_from_pdf(pdf_path)
    
    if text:
        print(f"Successfully extracted {len(text)} characters.")
        
        print("Analyzing skills from resume...")
        analysis = analyze_resume_text(text)
        
        print(f"Skills Found ({analysis['skill_count']}): {analysis['skills_found']}")
    else:
        print("Failed to extract text from PDF or PDF was empty.")

if __name__ == "__main__":
    test_manual_flow()
    test_resume_flow()
