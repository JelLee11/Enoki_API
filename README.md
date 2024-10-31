<div align="center">
  <img src="assets/logo.png" alt="Enoki API Logo" width="300"/>
  
  # Enoki API
  
  Free and open source manga API that provides seamless access to detailed manga information from various sources.

  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
    <img src="https://img.shields.io/badge/Cheerio.js-000000?style=for-the-badge" alt="Cheerio"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  </div>

  <br />

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRyanYuuki%2FEnoki_API)

</div>

## Features

- Retrieve manga title information, chapters, and images
- Explore the latest, popular, newest, and completed manga titles per source
- Dedicated search endpoints for each source for a focused search experience

## Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Cheerio** - Web scraping library
- **Axios** - HTTP client

## API Endpoints

### Root

- **`GET /`**  
  Returns a welcome message.

### Search Endpoints (by Source)

Search each source independently with the following endpoints:

- **Manganato Search**

  - **`GET /manganato/search/:query/:page?`**
    - Searches for manga titles on Manganato by query. Optional pagination with `page`, defaulting to 1.

- **Mangabat Search**
  - **`GET /mangabat/search/:query/:page?`**
    - Searches for manga titles on Mangabat by query. Optional pagination with `page`, defaulting to 1.

### Manganato Routes

| Endpoint                               | Description                                    |
| -------------------------------------- | ---------------------------------------------- |
| **`GET /manganato/details/:id`**       | Fetches details of a specific manga by ID.     |
| **`GET /manganato/read/:mangaId/:id`** | Retrieves images for a specific manga chapter. |
| **`GET /manganato/latest/:page?`**     | Lists the latest manga titles (paginated).     |
| **`GET /manganato/popular/:page?`**    | Lists popular manga titles (paginated).        |
| **`GET /manganato/newest/:page?`**     | Lists the newest manga titles (paginated).     |
| **`GET /manganato/completed/:page?`**  | Lists completed manga titles (paginated).      |

### Mangabat Routes

| Endpoint                              | Description                                    |
| ------------------------------------- | ---------------------------------------------- |
| **`GET /mangabat/details/:id`**       | Fetches details of a specific manga by ID.     |
| **`GET /mangabat/read/:mangaId/:id`** | Retrieves images for a specific manga chapter. |
| **`GET /mangabat/latest/:page?`**     | Lists the latest manga titles (paginated).     |
| **`GET /mangabat/popular/:page?`**    | Lists popular manga titles (paginated).        |
| **`GET /mangabat/newest/:page?`**     | Lists the newest manga titles (paginated).     |
| **`GET /mangabat/completed/:page?`**  | Lists completed manga titles (paginated).      |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/RyanYuuki/Enoki_API.git
   cd Enoki_API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file as needed.

4. Run the server:

   ```bash
   npm start
   ```

5. The API will be accessible at `http://localhost:5000`.

### Usage

Test the API by visiting endpoints like:

- **`http://localhost:5000/manganato/details/{id}`** – Get manga details
- **`http://localhost:5000/mangabat/search/query/page`** – Search for manga

## Folder Structure

```plaintext
enoki-api/
├── src/
│   ├── controllers/          # Controller functions for each route
│   ├── routes/               # API route definitions
│   ├── scrapers/             # Web scraping logic for each source
│   └── utils/                # Utility functions
├── assets/                   # Static assets including logo
├── .env                      # Environment variables (gitignored)
├── package.json             # Project dependencies and scripts
├── server.js               # Main server entry point
└── README.md               # Documentation
```

## Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name – [rehank220358@gmail.com](mailto:rehank220358@gmail.com)  
Project Link: [https://github.com/RyanYuuki/Enoki_API](https://github.com/RyanYuuki/Enoki_API)
