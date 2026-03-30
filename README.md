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

   Title tag (exists, 30–65 chars) 
   Meta description (exists, 70–160 chars)
   H1 count (exactly one)
   Canonical tag present  Noindex detection
   HTTP status
   Page size > 2MB
   Internal link count
   
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
project-root/
├── docker-compose.yml        
├── .gitignore
├── backend/
│   ├── Dockerfile            
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/db.js
│       ├── controllers/auditController.js
│       ├── models/auditModel.js
│       ├── routes/auditRoutes.js
│       └── services/
│           ├── crawler.js
│           └── seoAnalyzer.js
└── frontend/
    ├── Dockerfile            
    ├── nginx.conf            
    ├── .env                  
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/auditApi.js
        ├── utils/issuesMeta.js
        └── pages/
            ├── StartAudit.jsx
            ├── AuditOverview.jsx
            └── PageBreakdown.jsx
```

👩‍💻 Author

Shreya Popat

