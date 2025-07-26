📚 StudySphere
StudySphere is an AI-powered personalized student dashboard with an integrated chatbot to assist learners in organizing their studies, answering queries, and navigating educational resources.

🚀 Features
🧠 AI Chatbot (OpenAI GPT Integration)

📊 Personalized Dashboard for students

🏠 Clean and modern Home page

🌐 Full-stack web app (React + Node.js)

🔐 Ready for expansion with authentication, database, and more

📁 Project Structure
bash
Copy
Edit
/studysphere-app
├── client       # React frontend
└── server       # Express backend with OpenAI API
⚙️ Built With
Frontend: React, React Router, Axios

Backend: Node.js, Express

AI Service: OpenAI API (GPT-4)

Styling: CSS (with option for Tailwind)

Dev Tools: Vite, dotenv, body-parser, CORS

📸 Screenshots

Imaginary user interface of StudySphere app

🛠️ Getting Started
Prerequisites
Node.js v18+

npm or yarn

OpenAI API Key

Installation
bash
Copy
Edit
# Clone the repo
git clone https://github.com/NagaPrasad123/Study-Sphere/tree/main
cd studysphere-app

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
Setup .env
In the /server directory, create a .env file:

env
Copy
Edit
OPENAI_API_KEY=your_openai_api_key
Run the App
bash
Copy
Edit
# Start server
cd server
node index.js

# In new terminal: Start client
cd client
npm run dev
📬 API Endpoint
css
Copy
Edit
POST /api/chat
Body: { message: "Your question here" }
Response: { reply: "AI response" }
📌 Future Scope
Firebase Authentication

MongoDB Integration for user data

Study Planner & Progress Tracker

Notes & To-Do List Features

Voice-enabled AI chat

🧑‍💻 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

📄 License
This project is licensed under the MIT License.
