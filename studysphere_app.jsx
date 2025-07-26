// Root project structure for StudySphere
// /studysphere-app
// ├── client  (Frontend - React)
// └── server  (Backend - Node.js/Express)

// ======================================
// CLIENT - React Frontend (client/src/App.jsx)
// ======================================

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChatBot from "./components/ChatBot.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;

// ======================================
// ChatBot Component (client/src/components/ChatBot.jsx)
// ======================================

import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat", { message: input });
      const botReply = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorReply = { sender: "bot", text: "Oops! Something went wrong." };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBot;

// ======================================
// Home Page Component (client/src/pages/Home.jsx)
// ======================================

import React from "react";

const Home = () => {
  return <h1>Welcome to StudySphere</h1>;
};

export default Home;

// ======================================
// Dashboard Page Component (client/src/pages/Dashboard.jsx)
// ======================================

import React from "react";

const Dashboard = () => {
  return <h2>This is your personalized dashboard.</h2>;
};

export default Dashboard;

// ======================================
// Navbar Component (client/src/components/Navbar.jsx)
// ======================================

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

// ======================================
// Basic Styling (client/src/App.css)
// ======================================

.chat-container {
  padding: 1rem;
  border: 1px solid #ccc;
  max-width: 500px;
  margin: 1rem auto;
  font-family: sans-serif;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message.user {
  text-align: right;
  color: blue;
  margin: 0.5rem 0;
}

.message.bot {
  text-align: left;
  color: green;
  margin: 0.5rem 0;
}

input {
  width: 70%;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}

// ======================================
// SERVER - Express API (server/index.js)
// ======================================

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }],
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    res.status(500).send("Error connecting to AI");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

// ======================================
// .env file (server/.env)
// ======================================
// OPENAI_API_KEY=your_openai_key_here

// ======================================
// PACKAGE INSTALLATION
// ======================================
// Frontend: npm install react-router-dom axios
// Backend: npm install express cors dotenv openai body-parser

// ======================================
// Run commands
// ======================================
// client: npm start (inside /client)
// server: node index.js (inside /server)

// Note: This is a minimal MVP starter. You can expand with Firebase auth, dashboards, charts, etc.
