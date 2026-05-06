# assignment4
Containerized Counter Application — Concurrency Safe
Overview
A full-stack containerized web application that maintains a shared counter stored in a database, handling multiple concurrent increment requests without losing any updates.
Built as part of the e-Yantra Summer Internship Program assignment.

Problem Statement
When 1000 requests are fired simultaneously to increment a counter, naive implementations lose updates due to race conditions. This application solves that using atomic SQL operations ensuring every single increment is recorded — no lost updates.

Architecture
Three services running in separate Docker containers communicating over a shared network:

Frontend — HTML, CSS, JavaScript — simple UI with increment button and load test
Backend — Node.js with Express — REST API handling increment logic
Database — MySQL — stores the counter value persistently


Tech Stack

Frontend — HTML, CSS, Vanilla JavaScript
Backend — Node.js, Express.js
Database — MySQL
Containerization — Docker, Docker Compose


Concurrency Strategy
The core of concurrency safety is this single atomic SQL operation:
sqlUPDATE counter SET value = value + 1 WHERE id = 1;
Instead of read → modify → write (which causes race conditions), this operation happens entirely inside the database engine which handles concurrent access internally. The database queues simultaneous requests and processes each one safely — guaranteeing no lost updates even under 1000 simultaneous requests.

How to Run
Make sure Docker Desktop is installed and running.
Clone the repository:
git clone https://github.com/YOURUSERNAME/counter-app.git
Navigate into the folder:
cd counter-app
Build and run all containers:
docker-compose up --build
Open browser and go to:
http://localhost:80

API Documentation
GET /counter
Returns current counter value.
Response:
json{ "value": 42 }
POST /increment
Atomically increments counter by 1 and returns updated value.
Response:
json{ "value": 43 }

Load Testing
Click the Load Test — 1000 Requests button on the UI. It fires 1000 parallel POST requests simultaneously and displays how many were successfully recorded. Expected result — exactly 1000 out of 1000.
## Testing High-Load Scenarios

Two methods were used to test concurrency:

1. **UI Load Test Button** — fires 1000 simultaneous POST requests 
   directly from the browser using Promise.all(). The final counter 
   value is compared against the expected value to verify zero lost updates.

2. **Manual Verification** — counter is reset to 0, load test is fired, 
   final value is checked to confirm it equals exactly 1000.

Result — all 1000 requests were recorded successfully with no lost 
updates, confirming the atomic SQL strategy works correctly under 
high concurrency.

Features

Real time counter display
Single increment button
Load test button firing 1000 concurrent requests
Atomic SQL ensuring zero lost updates
Clean elegant UI
Fully containerized with Docker
