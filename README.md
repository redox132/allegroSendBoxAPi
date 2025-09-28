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

---

## Project Overview

This project allows developers to interact with a mock (Sendbox) Allegro API for product management. It provides endpoints for editing, and listing products.

---

## Dependencies

The project relies on the following npm packages:

- **express** – Web framework for Node.js  
- **axios** – HTTP client for making API requests  
- **nodemon** – Development tool for automatically restarting the server  
- **dotenv** – Loads environment variables from `.env`  
- **body-parser** – Parses incoming request bodies  
- **node-fetch** – Fetch API for Node.js  
- **express-rate-limit** – Protects your API from excessive requests  
... add more few ones

> Note: The full list of dependencies is available in `package.json`.
- You can simply hit: npm install and you are ready to go

---

## Installation

1. Clone the repository:  
- bash
git clone https://github.com/yourusername/allegrosandbox.git
cd allegrosandbox 

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
 - npm run startServer