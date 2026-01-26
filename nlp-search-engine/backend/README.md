# nlp-search-engine Backend

This is the backend service for the nlp-search-engine project, built using FastAPI. This service handles the API requests and serves the machine learning models for natural language processing tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the required dependencies, navigate to the `backend` directory and run:

```bash
pip install -r requirements.txt
```

## Usage

To run the FastAPI application locally, use the following command:

```bash
uvicorn app.main:app --reload
```

This will start the server at `http://127.0.0.1:8000`. You can access the interactive API documentation at `http://127.0.0.1:8000/docs`.

## Docker

To deploy the backend using Docker, follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t nlp-search-engine-backend .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 8000:8000 nlp-search-engine-backend
   ```

The application will be accessible at `http://localhost:8000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.