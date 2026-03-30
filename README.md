# Technical SEO Audit Tool

A full-stack Technical SEO Audit Tool that analyzes any website and generates SEO insights such as title tags, meta descriptions, headings, images, navigation, and broken links.
The application is containerized using Docker for easy setup and consistent environment execution.



🚀 How to Run via Docker

## Prerequisites

* Docker installed
* Docker Compose installed

## Steps

Clone the repository

```bash
git clone <repository-url>
cd SEO-AUDIT_TOOL
```

Run the application using Docker

```bash
docker compose up --build
```

After successful build, open:

Frontend
[http://localhost:3000](http://localhost:3000)

Backend
[http://localhost:5000](http://localhost:5000)

---

# 🛠 Tech Stack Choices and Why

## Frontend

**React (Vite)**

* Fast development environment
* Component-based architecture
* Easy UI development

## Backend

**Node.js + Express**

* Lightweight and fast
* Easy REST API development
* Good integration with scraping libraries

## Database

**MongoDB**

* Flexible schema
* Easy integration with Node.js
* Efficient for storing audit results

## Web Scraping

**Axios + Cheerio**

* Lightweight scraping
* Fast HTML parsing
* Easy SEO data extraction

## Containerization

**Docker**

* Consistent environment
* Easy project setup
* Simple deployment



🔎 Assumptions on Navigation Detection

Navigation detection is based on:

* Presence of `<nav>` elements
* Header elements
* Anchor tags inside navigation
* Menu-based structures

If navigation elements are found, the website is considered to have proper navigation.

---

🔄 How Data Flows (Backend → Frontend)

1. User enters website URL in frontend
2. Frontend sends request to backend API
3. Backend fetches website HTML using Axios
4. HTML is parsed using Cheerio
5. SEO checks are performed:

   * Title check
   * Meta description check
   * Headings analysis
   * Images alt detection
   * Broken links detection
   * Navigation detection
6. SEO score is calculated
7. Data is stored in MongoDB
8. Backend sends response to frontend
9. Frontend displays SEO audit results



✨ Features

* SEO score calculation
* Title tag analysis
* Meta description check
* Heading analysis
* Image alt detection
* Broken links detection
* Navigation detection
* MongoDB storage
* Docker support



📈 What I Would Improve With More Time

* Add sitemap.xml detection
* Add robots.txt analysis
* Multi-page crawling
* Lighthouse integration
* Historical audit tracking
* Export report as PDF
* Improve UI with charts
* Add authentication system



📁 Project Structure

```
SEO-AUDIT_TOOL
│
├── frontend
│   └── Dockerfile
│
├── backend
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

👩‍💻 Author

Shreya Popat

