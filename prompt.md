The University of Lahore
BSCS
Spring – 2026
Web Engineering
Assignment 03 Total Marks 30 Due Date: 13-May-2026
Assignment Title: Single Page Application Development using React, Firebase Firestore, and
Hosting
Assignment Overview:
Students will implement Single Page Application (SPA) routing using React Router DOM,
build a full CRUD application using Firebase Firestore with dynamic routing, deploy the
application on Firebase Hosting (or any other hosting platform), and manage source code using
GitHub.
Assignment Tasks:
Task 1: Implement SPA Routing using React Router DOM
 Configure React Router DOM for SPA navigation.
 Create multiple routes such as:
o Home
o Create Item
o View All Items
o View Single Item (Dynamic Route)
o Edit Item
 Ensure navigation occurs without page reloads.
 Maintain a consistent layout (Navbar) across all routes.
Task 2: Build a CRUD Application using Firebase Firestore with Dynamic Routing
Functional Requirements:
a. Create
 Design a form to collect data.
 Store form data in Firebase Firestore.
b. Read (All Documents)
 Fetch and display all documents from a Firestore collection.
 Display data dynamically in a list or card layout.
c. Read (Single Document - Dynamic Routing)
 Use React Router DOM dynamic routing (/path/:id) to fetch and display a single
Firestore document.
d. Update
 Allow editing of an existing Firestore document.
 Pre-fill form fields with existing data and update Firestore on submission.
e. Delete
 Allow deletion of an existing Firestore document.
 Update UI immediately after deletion.
Task 3: Deploy React Application
 Deploy the React application using:
o Firebase Hosting OR
o Any other reliable hosting platform (e.g., Vercel).
 Ensure the deployed app is publicly accessible via a live HTTPS URL.
 Place the Live URL at the top of the report.
Task 4: GitHub Repository
 Push complete source code to a GitHub repository.
 Ensure repository includes:
o Proper folder structure
o README.md file
 Place the GitHub repository link below the live URL at the top of the report.
Submission Requirements:
Submit a PDF file containing the following:
1. Live Project Link: -
o Hosted URL (placed at the top of the document).
2. GitHub Repository Link: -
o Repository URL placed below the live link.
3. VS Code Screenshot: -
o Full-screen screenshot showing project structure and files.
4. Webpage Screenshots: -
o Screenshots of:
1. All routes/pages
2. CRUD operations (Create, Read, Update, Delete)
3. Dynamic route page (single document view)
Evaluation Criteria (Rubric)
Criteria Excellent (5) Good (4)
Satisfactory
(3)
Marginal (2) Poor (1)
GitHub
Repository &
Live
Deployment
GitHub repo
and live
hosted URL
provided, fully
functional,
and reflect
latest code
Both links present
but minor
deployment or
sync issues
Links provided
but app
partially
working
One link
missing or
broken
-
SPA Routing
(React Router
DOM)
Complete SPA
routing with
multiple
routes and
dynamic
routes
implemented
correctly
Minor routing
issues or missing
one route
Basic routing
working
without
dynamic
routes
Routing
partially
functional
Routing
without SPA
routing using
react router
dom
Firestore
CRUD - Create
& Read
Form
correctly
stores data and
all data
fetched and
displayed
dynamically
Minor UI or
validation issues
Create or Read
partially
working
Only one
operation
working
Not
implemented
properly
Firestore
CRUD -
Update &
Delete
Update and
Delete fully
functional
with real-time
UI updates
Minor logical or
UI issues
Only Update
or Delete
working
Partial or
unstable
behavior
Not
implemented
properly
Dynamic
Routing with
Firestore and
react router
dom
Single
document
fetched
correctly
using dynamic
route
parameters
Minor issues in
fetching or
rendering
Dynamic
routing present
but unstable
Route exists
but data not
fetched
correctly
Not
implemented
properly
Code Quality
& Project
Structure
Clean,
modular React
components,
proper hooks
usage,
readable code
Mostly clean with
minor structure
issues
Acceptable but
inconsistent
structure
Poor
organization
and repeated
code
Disorganized
codebase