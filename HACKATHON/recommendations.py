def get_course_recommendations(missing_skills, career_goal):
    """
    Returns Coursera course recommendations based on missing skills
    """
    course_map = {
        "Python": {
            "title": "Python for Data Analysis",
            "url": "https://www.coursera.org/learn/python-data-analysis",
            "provider": "Coursera"
        },
        "SQL": {
            "title": "SQL for Data Science",
            "url": "https://www.coursera.org/learn/sql-data-science",
            "provider": "Coursera"
        },
        "Machine Learning": {
            "title": "Machine Learning Specialization",
            "url": "https://www.coursera.org/specializations/machine-learning-introduction",
            "provider": "Coursera"
        },
        "FHIR": {
            "title": "HL7 FHIR Fundamentals",
            "url": "https://www.coursera.org/projects/googlecloud-streaming-hl7-to-fhir-data-with-healthcare-api-coktd",
            "provider": "Coursera"
        },
        "Data Analytics": {
            "title": "Google Data Analytics Professional Certificate",
            "url": "https://www.coursera.org/professional-certificates/google-data-analytics",
            "provider": "Coursera"
        },
        "Healthcare Compliance": {
            "title": "HIPAA Compliance and Healthcare Security",
            "url": "https://www.coursera.org/learn/hipaa-compliance",
            "provider": "Coursera"
        },
        "EHR": {
            "title": "Electronic Health Records (EHR) Systems",
            "url": "https://www.coursera.org/learn/electronic-health-records",
            "provider": "Coursera"
        },
        "Data Visualization": {
            "title": "Data Visualization with Tableau",
            "url": "https://www.coursera.org/learn/data-visualization-tableau",
            "provider": "Coursera"
        },
        "Medical Imaging": {
            "title": "Medical Image Analysis",
            "url": "https://www.coursera.org/learn/medical-image-analysis",
            "provider": "Coursera"
        },
        "AI Ethics": {
            "title": "AI Ethics for Everyone",
            "url": "https://www.coursera.org/learn/ai-ethics-everyone",
            "provider": "Coursera"
        },
        "Statistics": {
            "title": "Statistics with Python",
            "url": "https://www.coursera.org/learn/statistics-python",
            "provider": "Coursera"
        },
        "HL7": {
            "title": "HL7 Standards for Healthcare",
            "url": "https://www.coursera.org/projects/googlecloud-ingesting-hl7v2-data-with-the-healthcare-api-xdnyz",
            "provider": "Coursera"
        },
        "HIPAA": {
            "title": "Healthcare Data Security",
            "url": "https://www.coursera.org/learn/healthcare-data-security",
            "provider": "Coursera"
        }
    }
    
    courses = []
    for skill in missing_skills[:5]:  # Limit to top 5 recommended courses
        if skill in course_map:
            courses.append(course_map[skill])
    
    return courses
