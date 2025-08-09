# Career Path AI
An AI-powered career guidance web app that helps students explore suitable career paths based on their skills, interests, and regional job trends.

🛠️ Built for Prayatna’25 Hackathon – PrayACThon

👥 Team: Digital Dynamo

👩‍💻 Team Members: Mohana, Amsa, Suganthi, Parthasarathi

📌 Key Features

🤖 AI Chatbot – Career assistant powered by Open AI or OpenRouter

🧠 Questionnaire – Understands user interests and preferences

🎯 Skill Game – Interactive assessments to gauge abilities

📊 Dashboard – Visualizes results and job matches

🌍 Region Jobs – Filters jobs by location

📁 Jobs Data – Uses a static jobs.json dataset, with potential for real-time API integration


🧱 Project Structure

career-ai/

├── client/           # React frontend

│   ├── src/components/

│   ├── src/data/jobs.json

│   └── App.js

├── server/           # Express backend

│   ├── index.js

│   └── .env (not pushed)

└── README.md         # This file

⚙️ Tech Stack

🌐 Frontend (client/)

React.js

Open AI / OpenRouter API

CSS Modules

Axios (for HTTP requests)

Chart.js (or similar for visualizations)

🔧 Backend (server/)

Node.js + Express

CORS

dotenv (for API key management)

body-parser

Static job dataset (extendable to a database)

🔁 Data Flow

User enters via the React interface

Chatbot or questionnaire collects input

User interacts with Skill Game

Axios sends data to the Express backend

Backend returns job matches from jobs.json or other sources

Dashboard and Region Jobs display results

🧪 How to Run Locally

🔹 Step 1: Setup Frontend


cd client

npm install

npm start

# App runs at http://localhost:3000
🔹 Step 2: Setup Backend

cd ../server

npm install

node index.js
# Server runs at http://localhost:5000

🔹 Step 3: Create a .env file inside server/ and add:

API_KEY=your_open_api_key

OPENROUTER_API_KEY=your_real_openrouter_api_key_here

✨ Key Highlights

Personalized, AI-powered career advice

Local job filtering

Built-in skill assessment modules

Modular and scalable architecture

📈 Future Enhancements

Integrate real-time job APIs

Add user authentication

Enhance the recommendation engine with ML

Deploy to cloud platforms (Netlify/Vercel + Render)

🙏 Acknowledgements

This is a step toward helping students make smarter career choices with technology.
