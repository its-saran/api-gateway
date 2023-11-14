# API Gateway

![Project Cover](/images/api_gateway.jpg)

A feature-rich API Gateway built with Express and Node.js, designed to handle various aspects of microservices architectures. This gateway includes inbuilt authentication, proxy routing, rate limiting, logging, and monitoring.

## Features

- **Inbuilt Authentication:** Secure your APIs with a built-in authentication system. Easily manage and authenticate users within the gateway.

- **Proxy Routing:** Route requests to different microservices or external APIs based on configurable rules.

- **Rate Limiting:** Protect your APIs from abuse by implementing rate limiting. Control the number of requests a client can make within a specified time frame.

- **Logging:** Comprehensive logging of requests and responses for debugging and auditing purposes.

- **Monitoring:** Monitor the health and performance of your API Gateway with built-in tools.

## Prerequisites

- Node.js and npm installed

- Firebase service account keys: Place your Firebase service account keys in the `secrets/firebase.json` file.


## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/its-saran/api-gateway.git

2. Install dependencies:

    ```bash
    cd api-gateway
    npm install

3. Configure API Gateway:

    - Customize the endpoints, rate limiting settings, and other configurations in config/config.json.

    - Example endpoints are shown in config.json

4. Start the server:

    ```bash=
    npm start
    ```
    Your API Gateway is now running at http://localhost:3000.


