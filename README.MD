# Project Vault

A searchable archive of final-year student projects — documenting the **problem, aims, approach, development challenges, mistakes, and lessons learned**.

Project Vault is built as a **static website** using plain HTML, CSS, and JavaScript ES modules.

All project information is stored in a single JSON file, so adding a new project requires only editing the data file — **no code changes required**.

---


### 📄 Project Details

Each project has a dedicated page containing:

* Student information
* Project name
* Problem statement
* Aim
* Objectives
* Development approach
* Development challenges (main one)
* Mistakes made
* Lessons learned (main one)
* Summary of growth
* Technology stack
* Hosted project
* GitHub repository (main one)
* Contact
* Social media



> The exact structure may change as the project evolves. The important part for contributors is the `assets/js/data/projects.json` file, where project information is stored.

---

# ➕ Adding a Project

Adding a project does **not** require changing HTML or JavaScript.

Simply open:

```text
assets/js/data/projects.json
```

Find the `projects` array and add a new project object.

### Example

```json
{
  "id": "pv-021",
  "slug": "my-awesome-project",
  "fullName": "Your Full Name",
  "studentId": "CS-2026-001",
  "projectName": "My Awesome Project",
  "category": "Web Development",
  "year": 2026,
  "status": "completed",
  "featured": false,
  "createdAt": "2026-09-16",
  "techStack": [
    "React",
    "Node.js",
    "PostgreSQL"
  ],
  "problemStatement": "One paragraph describing the real-world problem you set out to solve.",
  "aim": "One sentence describing what you set out to build.",
  "objectives": [
    "Objective 1 — make it measurable",
    "Objective 2",
    "Objective 3"
  ],
  "approach": "A paragraph explaining how you actually built the project, including phases, decisions, and trade-offs.",
  "developmentChallenges": [
    "Challenge 1 — what broke and how you dealt with it",
    "Challenge 2"
  ],
  "mistakes": [
    "Mistake 1 — be honest, this is one of the most useful parts.",
    "Mistake 2"
  ],
  "learning": [
    "Lesson 1",
    "Lesson 2"
  ],
  "summaryOfGrowth": "A short reflection on what changed in how you think, build, debug, or work.",
  "links": {
    "hosted": "https://my-project.example.com",
    "github": "https://github.com/you/my-project",
    "contact": "mailto:you@example.com",
    "social": "https://www.linkedin.com/in/you"
  }
}
```

Save the file and reload the website.

Your project will automatically appear in the archive and, where applicable, on the home page.

---

# 📋 Project Data Fields

| Field                   | Type    |    Required | Description                       |
| ----------------------- | ------- | ----------: | --------------------------------- |
| `id`                    | string  |           ✅ | Unique project identifier         |
| `slug`                  | string  | Recommended | Unique URL segment                |
| `fullName`              | string  |           ✅ | Student's full name               |
| `studentId`             | string  |           ✅ | Student ID                        |
| `projectName`           | string  |           ✅ | Project title                     |
| `category`              | string  |           ✅ | Project domain/category           |
| `year`                  | number  |           ✅ | Batch/year                        |
| `status`                | string  |          No | `completed` or `ongoing`          |
| `featured`              | boolean |          No | Shows project in featured section |
| `createdAt`             | string  |           ✅ | Date project was added            |
| `techStack`             | array   |           ✅ | Technologies used                 |
| `problemStatement`      | string  |           ✅ | Problem the project solves        |
| `aim`                   | string  |           ✅ | Main aim of the project           |
| `objectives`            | array   |           ✅ | Project objectives                |
| `approach`              | string  |           ✅ | How the project was developed     |
| `developmentChallenges` | array   |           ✅ | Technical/development challenges  |
| `mistakes`              | array   |           ✅ | Mistakes made during development  |
| `learning`              | array   |           ✅ | Lessons learned                   |
| `summaryOfGrowth`       | string  |           ✅ | Personal/professional growth      |
| `links.hosted`          | string  |          No | Live project URL                  |
| `links.github`          | string  |          No | GitHub repository                 |
| `links.contact`         | string  |          No | Email/contact URL                 |
| `links.social`          | string  |          No | Social media/profile URL          |

---

# 📌 Field Guidelines

## `id`

Every project must have a unique ID.

Recommended format:

```text
pv-001
pv-002
pv-003
```

Example:

```json
"id": "pv-021"
```

---

## `slug`

The slug is used in the project detail page URL.

Use:

* lowercase
* hyphens
* no spaces
* unique values

Example:

```json
"slug": "smart-grocery-management"
```

Avoid:

```text
Smart Grocery Management
smart_grocery_management
smart grocery management
```

Although the site can generate a slug from `projectName`, explicitly defining one is recommended.

This prevents project URLs from changing if the project name is later modified.

---

## `category`

Categories are free text.

For example:

```json
"category": "Web Development"
```

Other examples:

```text
Artificial Intelligence
Mobile Development
Cybersecurity
Data Science
IoT
Networking
Blockchain
Software Engineering
```

New category values automatically become available in the project filters.

---

## `status`

Only use one of:

```text
completed
ongoing
```

Example:

```json
"status": "completed"
```

If omitted, the project defaults to:

```text
completed
```

---

## `featured`

Use:

```json
"featured": true
```

to display the project in the featured section on the home page.

Use featured projects sparingly.

Recommended:

> **2–4 featured projects**

Most projects should use:

```json
"featured": false
```

---

## `createdAt`

Use ISO date format:

```text
YYYY-MM-DD
```

Example:

```json
"createdAt": "2026-09-16"
```

This value is used when sorting projects by newest/oldest.

---

## `techStack`

Use short, recognizable technology names.

Good:

```json
"techStack": [
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker"
]
```

Avoid unnecessarily detailed versions:

```text
React.js v18.3.1
PostgreSQL 16.4
Node.js v22.12.0
```

Keep the values simple and searchable.

---

# ✍️ Writing Guidelines

Project Vault is intended to preserve **real student experiences**, not just polished project descriptions.

Be honest and specific.

### Problem Statement

Explain:

1. What problem exists?
2. Who experiences the problem?
3. Why does it matter?

Recommended length:

> **2–4 sentences**

---

### Aim

Describe the main purpose of the project in one clear sentence.

Recommended:

> **1 sentence**

---

### Objectives

Add approximately:

> **3–5 measurable objectives**

Example:

```json
"objectives": [
  "Allow users to create and manage grocery lists.",
  "Provide real-time stock information.",
  "Generate monthly spending reports."
]
```

---

### Approach

Explain **how you actually built the project**.

Mention things such as:

* Development phases
* Architecture decisions
* Technologies
* Important design decisions
* Trade-offs
* Testing
* Deployment

Recommended:

> **1 paragraph**

---

### Development Challenges

Describe things that were genuinely difficult.

Good examples:

* Authentication problems
* Database design issues
* API integration problems
* Deployment failures
* Performance issues
* Difficult debugging
* Team coordination

Recommended:

> **2–5 items**

---

### Mistakes

This is one of the most valuable sections of Project Vault.

Don't try to make the project look perfect.

Examples:

```text
Started development without properly designing the database schema.
```

```text
Did not test the application on mobile until near the end of development.
```

```text
Used a solution without understanding how it worked, which made debugging harder later.
```

Recommended:

> **2–5 honest mistakes**

---

### Learning

Describe what you actually learned from building the project.

This can include:

* Technical knowledge
* Problem solving
* Debugging
* Teamwork
* Communication
* Project planning
* Deployment
* Time management

Recommended:

> **2–5 items**

---

### Summary of Growth

Explain how the project changed you as a developer.

For example:

```text
Before this project, I mostly focused on writing code.
After completing it, I understood the importance of planning,
testing, documentation, and maintaining software after deployment.
```

Recommended:

> **2–4 sentences**

---

# 🔗 Links

Links are optional.

If a project does not have a particular link, use an empty string:

```json
"links": {
  "hosted": "",
  "github": "",
  "contact": "",
  "social": ""
}
```

Empty links are automatically skipped by the website.

Supported values include:

### Hosted Project

```json
"hosted": "https://example.com"
```

### GitHub

```json
"github": "https://github.com/username/project"
```

### Email

```json
"contact": "example@gmail.com"
```

### Social Profile

```json
"social": "https://www.linkedin.com/in/username"
```

---

# ✅ Before Submitting

Before adding a project, check:

* [ ] `id` is unique
* [ ] `slug` is unique
* [ ] Student name is correct
* [ ] Student ID is correct
* [ ] Project name is correct
* [ ] Category is correct
* [ ] Batch/year is correct
* [ ] Status is `completed` or `ongoing`
* [ ] `createdAt` uses `YYYY-MM-DD`
* [ ] Technology names are consistent
* [ ] Problem statement is clear
* [ ] Aim is included
* [ ] Objectives are included
* [ ] Development approach is explained
* [ ] Challenges are honest
* [ ] Mistakes are specific
* [ ] Lessons learned are included
* [ ] Growth summary is included
* [ ] Links are valid or empty
* [ ] JSON is valid

---

# 🔍 Validate the JSON

A single JSON syntax error can prevent the entire project archive from loading.

### Option 1 — JSONLint

Paste your JSON into:

**https://jsonlint.com**

### Option 2 — Node.js

From the project root, run:

```bash
node -e "JSON.parse(require('fs').readFileSync('assets/js/data/projects.json'))"
```

If there is no output, the JSON is valid.

---

# 🚀 Running Locally

Because Project Vault is a static website, there is no backend or database to configure.

You can serve it using any static server.

### Using Python

```bash
npx serve .
or 
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Using VS Code

You can also use a static development extension such as **Live Server**.

---

# 🗃️ Why Static JSON?

Project Vault intentionally starts without a backend.

The goal is to keep the project:

* Simple
* Cheap to host
* Easy to maintain
* Easy for students to contribute to
* Fast
* Easy to understand
* Free from database maintenance

Adding a project should be as simple as:

```text
Open JSON
    ↓
Add project
    ↓
Validate JSON
    ↓
Commit
    ↓
Deploy
```

No database administration or API development is required.

---

# 🔮 Future Possibilities

The current version intentionally keeps the architecture simple.

Possible future improvements include:

* Admin dashboard
* Backend API
* Database storage
* Student authentication
* Project submission forms
* Project approval workflow
* Image/project screenshots
* GitHub API integration
* Advanced search
* Student profiles
* Project analytics
* Similar project recommendations
* AI-powered project discovery

These features are **not required for the current version**.

---

# 🤝 Contributing

If you are adding a student project:

1. Add your project to `assets/js/data/projects.json`.
2. Follow the existing JSON structure.
3. Keep your information accurate.
4. Be honest about challenges and mistakes.
5. Validate the JSON.
6. Test the website locally.
7. Commit your changes.
8. Create a pull request if the repository uses PR-based contributions.

The goal is not just to showcase successful projects.

> **The goal is to preserve the journey behind them.**

---

## Project Vault

**A place where final-year projects become reusable knowledge for the next generation of developers.**

## Builder 

**Keshav Roka**

GitHub: [@keshavroka55](https://github.com/keshavroka55)
