# ⚖️ High Court of Judicature at Allahabad Chatbot

A web-based chatbot application currently being developed during my internship at the High Court of Judicature at Allahabad. The project aims to simplify case information retrieval by providing an interactive conversational interface for accessing court case details through integrated court APIs.

---

# 📌 Project Overview

The High Court of Judicature at Allahabad Chatbot allows users to search and retrieve case information through a simple chat interface instead of navigating multiple screens manually.

The system is being developed using Spring Boot, JavaScript, HTML, and CSS, with integration to the High Court of Judicature at Allahabad Case Status APIs.

---

# 🚀 Current Features

## 🔍 Case Search (Implemented)

Users can search for cases using:

* Case Type
* Case Number
* Case Year

The chatbot validates user input and retrieves matching case records from the backend APIs.

---

## 📄 Case Summary (Implemented)

Displays:

* Case Number
* Party Name
* Current Case Status

along with quick access to detailed information.

---

## 📖 Detailed Case Information (Implemented)

A dedicated **View More** page displays:

### Case Information

* Case Number
* Status
* Case Type
* District
* State
* Petitioner
* Respondent
* Petitioner Advocate
* Respondent Advocate
* Category
* Subcategory
* CINO
* Registration Date
* First Listing Date
* Next Listing Date
* Bench Type
* Bench Name
* Cause List

---

### Party Details

Displays:

#### Petitioners

* Complete petitioner list

#### Respondents

* Complete respondent list

---

### IA Details

Displays:

* Filing Number
* Filing Date
* Status
* Application Number

---

### Listing History

Displays:

* Listing Date
* Bench Name
* Court Number
* Order Information

---

### Lower Court Details

Displays:

* Lower Court Case Number
* Case Year
* District
* Decision Date
* Judge Information
* Court Type

---

### Act Details

Displays:

* Relevant Act Information
* Section Information

(when available from API)

---

# 🎨 UI Features

## Implemented

* Interactive Chat Interface
* Responsive Layout
* Dark Mode Support
* Scrollable Detailed View
* Separate View More Page
* Structured Tables
* Back Navigation
* Print Functionality
* Loading Indicators
* Error Handling

---

# 🛠️ Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

## Backend

* Java
* Spring Boot
* Maven

## APIs

* High Court of Judicature at Allahabad Case Status APIs

---

# 📂 Project Structure

```text
chatbot-ahc/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/ahc/chatbot/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── service/
│   │   │       └── config/
│   │   │
│   │   └── resources/
│   │       └── static/
│   │           ├── css/
│   │           ├── js/
│   │           ├── images/
│   │           ├── index.html
│   │           └── view-more.html
│
└── pom.xml
```

---

# 🔄 Current Workflow

```text
User
  ↓
Chat Interface
  ↓
Case Details Query
  ↓
Spring Boot Backend
  ↓
Court APIs
  ↓
Case Summary
  ↓
View More
  ↓
Detailed Case Information
```

---

# 🧪 Testing Completed

* Valid Case Search
* Invalid Case Search
* View More Functionality
* IA Details Retrieval
* Listing History Retrieval
* Lower Court Details Retrieval
* Act Details Retrieval
* Print Preview Testing
* UI Responsiveness Testing
* Large Case ID Handling using Long datatype

---

# 🚧 Features Currently Under Development

## No-Flow Search

Searching cases without complete case details using combinations of:

* Petitioner Name
* Respondent Name
* Advocate Name
* Judge Name
* Court Number
* District

(Currently awaiting API integration.)

---

## Enhanced Search Experience

Planned improvements:

* Better loading animations
* Improved search feedback
* Faster response handling

---

## UI Improvements

Planned enhancements:

* Better print formatting
* Improved mobile responsiveness
* Advanced table styling
* Accessibility improvements

---

## Error Handling Improvements

Planned:

* API timeout handling
* User-friendly validation messages
* Retry mechanisms

---

# 📈 Major Improvements Implemented 

* Developed chatbot-based case search flow
* Integrated Court APIs
* Implemented View More architecture
* Added Lower Court Details integration
* Added Act Details integration
* Added Print functionality
* Implemented responsive UI
* Added Dark Mode support
* Improved handling of large Case IDs using Long datatype
* Structured data presentation using tables

---

# 👨‍💻 Developer

**JavaPyWizard**



---

# 🏛️ Internship Status

This project is currently under active development as part of an ongoing internship at the High Court of Judicature at Allahabad Computer Centre Department. New features and enhancements are continuously being added based on project requirements and feedback.
