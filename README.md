# Healthcare Informatics
Healthcare skill intelligence system

Project overview & features:
This digital platform captures, organizes, and analyzes a user's academic, project, and skill data with a focus on healthcare informatics. By identifying gaps and providing actionable insights, it acts as an evolving tool to support long-term professional development and personalized learning paths. 
--------------------------------------------------------------------
Tech Stack:
Frontend - HTML, CSS, Javascript
Backend - Python
Database - Python
--------------------------------------------------------------------
Setup steps & How to run locally (copy-paste commands):
git clone https://github.com/krishadesai-18/Code-and-Chaos.git
cd Code-and-Chaos
python -m venv venv
pip install -r requirements.txt
python main.py
To create environment variable:
touch .env
SECRET_KEY=supersecretkey123
DATABASE_URL=sqlite:///database.db
--------------------------------------------------------------------
Environment variable examples:
SECRET_KEY=supersecretkey123
DATABASE_URL=sqlite:///database.db
ADMIN_EMAIL=admin@example.com
DEBUG=True

Database Configuration
DATABASE_URL=sqlite:///database.db

Server Configuration
HOST=127.0.0.1
PORT=5500
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
No secrets are committed to the repository
