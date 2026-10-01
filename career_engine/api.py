from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
import os

from career_recommender import recommend_careers
from skill_gap import calculate_skill_gap
from course_recommender import recommend_courses
from roadmap_generator import generate_roadmap
from resume_parser import extract_text_from_pdf
from resume_analyzer import analyze_resume

app = FastAPI(title="Career Engine API")

class ManualSkillsRequest(BaseModel):
    skills: List[str]

def generate_career_report(student_skills: List[str]):
    """Helper function to run the logic and return a JSON report."""
    # 1. Match Careers
    matches = recommend_careers(student_skills)
    if not matches:
        return {"error": "No matching careers found."}

    # 2. Pick top career
    top_career = matches[0]["career"]

    # 3. Gap Analysis
    gap = calculate_skill_gap(student_skills, top_career)
    missing_required = gap.get("missing_required_skills", [])
    missing_preferred = gap.get("missing_preferred_skills", [])
    missing_skills = missing_required + missing_preferred

    # 4. Recommendations & Roadmap
    courses = recommend_courses(missing_skills)
    roadmap = generate_roadmap(top_career)

    return {
        "student_skills": student_skills,
        "career_matches": matches,
        "top_career": top_career,
        "skill_gap": gap,
        "recommended_courses": courses,
        "roadmap": roadmap
    }


@app.post("/api/manual-flow")
async def process_manual_flow(request: ManualSkillsRequest):
    """
    Endpoint for Flow 1: Manual Skill Entry
    Receives JSON list of skills and returns the full career report.
    """
    if not request.skills:
        raise HTTPException(status_code=400, detail="No skills provided.")
        
    report = generate_career_report(request.skills)
    return report


@app.post("/api/resume-flow")
async def process_resume_flow(file: UploadFile = File(...)):
    """
    Endpoint for Flow 2: Resume Upload
    Receives a PDF resume, parses it, finds skills, and returns the full career report.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # Save uploaded file temporarily
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    try:
        # Extract and Analyze
        text = extract_text_from_pdf(temp_file_path)
        analysis = analyze_resume(text)
        found_skills = analysis.get("skills_found", [])

        if not found_skills:
            return {"error": "No recognizable skills found in the resume."}

        # Generate Report using extracted skills
        report = generate_career_report(found_skills)
        return report

    finally:
        # Clean up the temporary file safely
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
