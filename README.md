# Manga API

Welcome to the ultimate Manga API! This API delivers popular manga sources directly to your fingertips, allowing seamless access to manga titles, chapters, and more from some of the best manga sites.

## Features

- Fetch detailed information about manga titles.
- Access manga chapters with images.
- Explore the latest, popular, newest, and completed manga titles.
- Organized routes and structure for easy scaling and maintenance.

## Technologies

- Node.js
- Express
- Cheerio (for web scraping)
- Axios (for HTTP requests)

## API Endpoints

### Root

- **`GET /`**  
  Returns a welcome message.

### Manganato Routes

| Endpoint                                 | Description                                    |
|------------------------------------------|------------------------------------------------|
| **`GET /manganato/details/:id`**         | Fetches details of a specific manga by ID.     |
| **`GET /manganato/read/:mangaId/:id`**   | Retrieves images for a specific manga chapter. |
| **`GET /manganato/latest/:page?`**       | Lists the latest manga titles (paginated).     |
| **`GET /manganato/popular/:page?`**      | Lists popular manga titles (paginated).        |
| **`GET /manganato/newest/:page?`**       | Lists the newest manga titles (paginated).     |
| **`GET /manganato/completed/:page?`**    | Lists completed manga titles (paginated).      |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/manga-api.git
   cd manga-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file for any configuration you need (e.g., API keys, if required).

4. Run the server:

   ```bash
   npm start
   ```

5. Your API should now be running on `http://localhost:5000`.

### Deployment

Want to deploy this API quickly? Use Vercel to deploy in just a few clicks.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/RyanYuuki/Manga_Scrapers)

### Usage

After running the server, you can test the API by visiting endpoints like:

- **`http://localhost:5000/manganato/details/{id}`** – Get manga details
- **`http://localhost:5000/manganato/latest`** – Get the latest manga titles

You can also use tools like [Postman](https://www.postman.com/) to test the endpoints.

## Folder Structure

```plaintext
manga-api/
├── src/
│   ├── controllers/          # Controller functions for each route
│   ├── routes/               # API route definitions
│   ├── scrapers/             # Web scraping logic for each source
│   └── utils/                # Utility functions
├── .env                      # Environment variables (gitignored)
├── package.json              # Project dependencies and scripts
├── server.js                 # Main server entry point
└── README.md                 # Documentation
```

## Contributing

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name – [rehank220358@egmail.com](mailto:rehank220358@gmail.com)  
Project Link: [https://github.com/RyanYuuki/Manga_Scrapper](https://github.com/RyanYuuki/Manga_Scrapers)
```
