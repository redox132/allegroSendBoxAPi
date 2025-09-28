# Allegro Sandbox API

Allegro Sandbox API is a REST API for managing Allegro products safely.  
It is a safe playground for developers to test their code before deploying to production.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Dependencies](#dependencies)  
- [Installation](#installation)  
- [Environment Setup](#environment-setup)  
- [Running the Server](#running-the-server)  
- [API documentions](#api-documentation)


## Project Overview

This project allows developers to interact with a mock (Sendbox) Allegro API for product management. It provides endpoints for editing, and listing products.

---

## Dependencies

The project relies on the following npm packages:

- **express**: Web framework for Node.js  
- **axios**: HTTP client for making API requests  
- **nodemon**: Development tool for automatically restarting the server  
- **dotenv**: Loads environment variables from `.env`  
- **body-parser**: Parses incoming request bodies  
- **node-fetch**: Fetch API for Node.js  
- **express-rate-limit**: Protects your API from excessive requests  
... add more few ones

> Note: The full list of dependencies is available in `package.json`.
- You can simply hit: npm install and you are ready to go


## Installation

1. Clone the repository:  
- bash
git clone https://github.com/redox132/allegroSendBoxAPi.git
cd allegroSendBoxAPi

## Environment Setup
i have provided a .env.example for Environment Setup. It contains the following:

**can be found at allegro app**
- **ALLEGRO_CLIENT_ID**=client_id
- **ALLEGRO_CLIENT_SECRET**=client_secret

- **ALLEGRO_AUTH_BASE_URL**=https://allegro.pl.allegrosandbox.pl
- **ALLEGRO_SANDBOX_BASE_URL**=https://api.allegro.pl.allegrosandbox.pl

- **ALLEGRO_REDIRECT_URI**=https://yourSite.com/callback

## Running the Server

 You can run it via nodemon: 
 - npm run dev

## Future enprovments

- Using a server as reverse proxy an a load balancer for high trafic and security
- Using docker to run multiple instances of Node.js


## API documentions
For the API docs, you cann access them as follows:
 - if you have already installed the project and run it locally, visit: http://localhost:3000/api-docs 
 - if you have not run the project locally, visit: https://nontransforming-nell-robustly.ngrok-free.dev/api-docs
 - Postman also available for fast and easy testing: https://documenter.getpostman.com/view/47124316/2sB3QDwYk9