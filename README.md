# 📊 Insta Insights Hub (Frontend UI)

This repository contains the frontend user interface for **Insta Insights Hub**, an AI-powered web application designed to analyze Instagram profiles and generate actionable content strategies. 

## 🖥️ Project Overview

This React-based frontend serves as the user-facing layer of the application. It captures target Instagram handles and beautifully renders complex, multi-part AI reports returned from the backend orchestrator.

### Key Features
* **Clean Input Interface:** A streamlined search bar for users to submit Instagram handles.
* **State Management:** Graceful handling of loading states while waiting for the AI agents to process the data.
* **Dynamic Report Rendering:** Clearly displays the compiled JSON payload from the backend into three distinct, readable sections:
  * 🧠 Niche & Frequency Analysis
  * ✍️ Content & Strategy Formulation
  * 🤝 Engagement & Action Plan
* **Error Handling:** Built-in safeguards to display clean toast notifications if the webhook connection fails or returns empty data.

## 🚀 Tech Stack
* **Framework:** React
* **Styling:** Tailwind CSS
* **Tooling:** Vite, TypeScript

## 🔌 Backend Connection
*Note: The backend logic for this application is handled separately via an [n8n](https://n8n.io/) webhook orchestrator. The frontend sends a POST request to the n8n endpoint, which triggers an Apify scraper and parallel AI analysis agents, returning the final data to this UI.*
