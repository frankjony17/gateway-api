
# API Gateways - **Node.js**

API Gateway is a type of service in a microservices architecture which provides a shared layer and API for clients to communicate with internal services.
The API Gateway can route requests, transform protocols, aggregate data and implement shared logic like authentication and rate-limiters.

You can think about API Gateway as the entry point to our microservices world.
Our system can have one or multiple API Gateways, depending on the clients’ requirements.
For example, we can have a separate gateway for desktop browsers, mobile applications and public API(s) as well.

# Node.js API Gateway for frontend teams

As API Gateway provides functionality for client applications like browsers – it can be implemented and managed by the team who is responsible for the frontend application.
It also means that language the API Gateway is implemented in language should be chosen by the team who is responsible for the particular client. 
As JavaScript is the primary language to develop applications for the browser, Node.js can be an excellent choice to implement an API Gateway even if your microservices architecture is developed in a different language.
