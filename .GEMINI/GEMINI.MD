# GEMINI.md

# FieldUp

AI-powered cricket intelligence platform for local teams, academies, and athletes.

---

# Project Vision

FieldUp helps grassroots cricket teams and players use AI-powered analytics, injury prediction, and tactical insights without requiring expensive professional infrastructure.

The platform focuses on:

* local cricket teams
* school and college cricket
* cricket academies
* individual players

The system relies primarily on user-uploaded cricket data rather than official professional datasets.

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI

## Backend

* Node.js
* Express
* JavaScript (Vanilla)
* MongoDB
* Mongoose

## AI Service

* FastAPI
* Python
* Scikit-learn
* Pandas
* NumPy

## LLM Integration

* Gemini API

---

# 10-Day Backend Sprint Plan (Division of Work)

| Days | **Radhika (Teammate)** | **User (You)** |
|------|------------------------|----------------|
| **1-2** | **Models:** Design and implement all Mongoose models (User, Team, Player, Match, Performance, Fitness). | **Core:** App architecture setup, Database connection, Global error handling, and Middleware. |
| **3-4** | **Auth:** Implementation of registration, login, JWT issuance, and password hashing logic. | **Data APIs:** CRUD operations for Match scorecards and Fitness/Wellness data logs. |
| **5-6** | **Management:** CRUD operations for Teams, Academies, and detailed Player profiles. | **AI Setup:** FastAPI boilerplate setup, Pydantic schemas, and basic prediction routing. |
| **7-8** | **Logic:** Performance metrics calculations (Strike rates, economy, form trends). | **AI Logic:** Injury Risk ML model integration and Node.js-to-FastAPI communication bridge. |
| **9-10** | **Validation:** End-to-end testing, Postman documentation, and bug squashing. | **Gemini:** Integration of Gemini API for tactical match strategy and coaching insights. |

---

# Architecture

Frontend communicates with the Node.js backend.

The Node.js backend:

* handles authentication
* stores cricket data
* manages APIs
* communicates with FastAPI AI service
* communicates with Gemini API

FastAPI handles:

* injury prediction
* performance scoring
* analytics models
* cricket intelligence calculations

Gemini handles:

* tactical strategy generation
* natural language insights
* AI-generated coaching recommendations

---

# Core Features

## 1. AI Match Strategy Generator

Inputs:

* player form
* batting statistics
* bowling statistics
* fatigue data
* opponent weaknesses
* match conditions

Outputs:

* lineup suggestions
* batting order recommendations
* bowling plans
* tactical insights
* winning probability

---

## 2. Injury Risk Predictor

Uses:

* workload
* fatigue
* sleep
* recovery score

Predicts:

* injury probability
* burnout risk
* recovery recommendations

---

## 3. AI Performance Analyzer

Tracks:

* batting consistency
* bowling economy
* strike rate trends
* player stamina
* recent form

Provides:

* performance scores
* strengths and weaknesses
* AI-generated improvement insights

---

# Target Users

* Local cricket teams
* Coaches
* Captains
* Cricket academies
* School and college teams
* Individual cricketers

---

# Database Models

## User

Stores:

* name
* email
* password
* role
* teamId

Roles:

* coach
* player
* captain
* admin

---

## Team

Stores:

* team name
* coach
* players
* academy
* city

---

## Player

Stores:

* batting style
* bowling style
* role
* statistics
* fitness data

---

## Match

Stores:

* teams
* scorecard
* venue
* result
* overs
* match type

---

## Performance

Stores:

* runs
* strike rate
* wickets
* economy
* catches
* stamina score

---

## Fitness

Stores:

* fatigue
* sleep
* workload
* recovery score

---

# Backend Structure

backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── app.js

---

# AI Service Structure

ai-service/
├── models/
├── routes/
├── services/
├── utils/
├── app.py
└── requirements.txt

---

# Coding Guidelines

## General

* Use JavaScript for backend
* Use TypeScript for frontend
* Use clean modular architecture
* Avoid large files
* Prefer reusable services and utilities

## Backend

* Use MVC structure
* Controllers should stay thin
* Business logic belongs in services
* Use async/await
* Use proper error handling

## Database

* Use Mongoose schemas
* Use references instead of deeply nested objects where possible

## AI Service

* Keep ML logic isolated
* Separate preprocessing from prediction
* Use sklearn for MVP models

---

# Important Constraints

* Focus only on cricket initially
* Prioritize MVP speed over advanced ML
* Avoid TensorFlow initially
* No computer vision in MVP
* Use lightweight analytics and user-generated data

---

# Future Scope

Possible future features:

* video analysis
* pose estimation
* wearable integrations
* live match analytics
* advanced deep learning models
* multi-sport support

---

# Product Philosophy

The goal is not to compete with professional IPL analytics systems initially.

The goal is to make AI-powered cricket intelligence accessible to grassroots and local cricket ecosystems.
