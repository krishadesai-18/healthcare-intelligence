# Healthcare Informatics
Healthcare skill intelligence system

Project overview & features:
This digital platform captures, organizes, and analyzes a user's academic, project, and skill data with a focus on healthcare informatics. By identifying gaps and providing actionable insights, it acts as an evolving tool to support long-term professional development and personalized learning paths. 
--------------------------------------------------------------------
Tech Stack:
Frontend - HTML, CSS, Javascript
Backend - Python
Database - Python-based database management
--------------------------------------------------------------------
Setup steps & How to run locally (copy-paste commands):
python --version
git --version
git clone <https://github.com/krishadesai-18/Code-and-Chaos/tree/main>
cd <HACKATHON>
python -m venv venv
venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
pip install requests python-dotenv

Create a file named .env in the root directory
(use .env.example as reference)

# Coursera API Configuration
COURSERA_API_KEY=your_coursera_api_key_here
COURSERA_API_URL=https://api.coursera.org/api/courses.v1

# Database Configuration
DATABASE_URL=sqlite:///database.db

# Application Security
SECRET_KEY=your_secret_key_here

# Environment
ENV=development
--------------------------------------------------------------------
# Coursera API Configuration
COURSERA_API_KEY=your_coursera_api_key_here
COURSERA_API_URL=https://api.coursera.org/api/courses.v1

# Database Configuration
DATABASE_URL=sqlite:///database.db

# Application Security
SECRET_KEY=your_secret_key_here

# Environment
ENV=development
--------------------------------------------------------------------
Test login credentials (if needed)
Users can register using any email and password
No real email verification is implemented
--------------------------------------------------------------------
Basic error handling:
Invalid username or password
If the account is already created and the user tries to sign in it will ask them to log in
--------------------------------------------------------------------
Confirmation of no secrets in the repo:
We acknowledge the use of the Coursera API as an external learning resource to enable course recommendations aligned with identified skill gaps.
We also acknowledge the use of Visual Studio Code with GitHub Copilot as a development support tool for code suggestions and productivity enhancement during implementation.

All system design, logic formulation, feature integration, and final implementation decisions were independently carried out by the team.
