Travlr Getaways - Full Stack Web Application
CS 465: Full Stack Development

Overview

Travlr Getaways is a full stack web application that includes a public customer-facing website and a secured 
administrative single-page application (SPA). The admin side allows authorized users to manage trip data through
a secure login system using JSON Web Tokens (JWT). This project demonstrates full stack development using 
Angular, Node.js, Express, and MongoDB.

Architecture
Frontend Development Comparison

This project uses multiple frontend approaches. The public-facing portion of the application uses Express with 
server-side rendered HTML and JavaScript, which is effective for simple page rendering and content delivery. 
The administrative side of the application uses an Angular single-page application (SPA), which provides a 
more dynamic and responsive user experience without requiring full page reloads.

The SPA approach allows reusable components, client-side routing, and improved state management, making it 
better suited for administrative tasks such as creating, editing, and deleting trips. Using both approaches 
in the same project demonstrates the strengths and tradeoffs between traditional server-rendered pages and 
modern SPA architecture.

Backend and Database Choice

The backend uses a NoSQL MongoDB database because of its flexibility and schema-less design. MongoDB 
integrates well with Node.js and Express, allowing data to be stored as JSON-like documents that 
align naturally with JavaScript objects. This made it easier to evolve the data model during development 
without requiring complex schema migrations.

Functionality
JSON and JavaScript Integration

JSON is a lightweight data-interchange format that is used to transfer data between the frontend and 
backend. While JavaScript is a programming language, JSON is strictly a data format. In this application, 
JSON is used to send and receive data through API endpoints, allowing Angular components to communicate 
with the Express backend in a structured and consistent way.

Code Refactoring and Reusable Components

During development, code was refactored to improve readability, reduce duplication, and improve
maintainability. For example, Angular services were used to centralize API communication instead of 
duplicating HTTP requests across multiple components. Reusable UI components allowed consistent behavior 
and styling across the application, reduced errors, and made future updates easier to implement.

Testing
API Endpoints and Security

The application uses standard HTTP methods such as GET, POST, PUT, and DELETE to interact with API 
endpoints. These endpoints were tested using Postman to verify correct request handling and data 
retrieval. After security was added, testing became more complex because protected endpoints required 
valid authentication tokens.

JWT-based authentication ensures that only authorized users can access administrative routes. 
Middleware on the backend verifies tokens before allowing access to secured endpoints, protecting 
sensitive operations such as trip management.

Reflection

This course helped me understand how all layers of a full stack application work together, from 
frontend user interfaces to backend APIs and database integration. I gained hands-on experience 
with Angular, Express, MongoDB, and authentication using JWTs. I also improved my ability to 
debug issues across the stack and refactor code for better organization and maintainability.

These skills are directly applicable to real-world development and have helped me become more 
confident and marketable as a full stack developer. The project provided a strong foundation in 
modern web development practices and security principles.
