# FAQ API with Caching and Translation
This project is a RESTful API for managing Frequently Asked Questions (FAQs) with support for multiple languages and caching using Redis. It allows you to create, read, update, and delete FAQs, and automatically translates them into Hindi (`hi`) and Bengali (`bn`) using Google Translate.

## Screenshots
### FAQ List View
![FAQ List View](bharat-fd/public/localhost_3000_editor.png)
*FAQ management interface showing the list of questions and answers*

### FAQ
![FAQ List View](bharat-fd/public/Screenshot 2025-02-02 134135.png)
*Multi-language support showing translations in Hindi and Bengali*


## Features
- **CRUD Operations**: Create, Read, Update, and Delete FAQs.
- **Multi-language Support**: Automatically translates FAQs into Hindi and Bengali.
- **Caching**: Uses Redis to cache FAQs for faster retrieval.
- **Scalable**: Built with Express.js and MongoDB for scalability.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://devkapadia123:C6oy6ytt0hFCNLWV@cluster0.oqv8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   REDIS=rediss://red-cuff9f2j1k6c73fqo3a0:7pmTl5eMcMWvKMaulUG4TVw4XOCfiaHX@singapore-redis.render.com:6379
   ```
4. **Run the application**:
   ```bash
   npm start
   ```
The API will be running at `http://localhost:8000`.

## API Endpoints
### Get All FAQs
`GET /api/faqs`
Query Parameters:
- `lang` (optional): Language code (en, hi, bn). Default is en.
Example:
```bash
curl http://localhost:8000/api/faqs?lang=hi
```

### Create a New FAQ
`POST /api/faqs`
Body:
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a runtime environment for executing JavaScript code."
}
```
Example:
```bash
curl -X POST http://localhost:8000/api/faqs \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Node.js?", "answer": "Node.js is a runtime environment for executing JavaScript code."}'
```

### Update an FAQ
`PUT /api/faqs/:id`
Body:
```json
{
  "question": "What is Express.js?",
  "answer": "Express.js is a web framework for Node.js."
}
```
Example:
```bash
curl -X PUT http://localhost:8000/api/faqs/12345 \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Express.js?", "answer": "Express.js is a web framework for Node.js."}'
```

### Delete an FAQ
`DELETE /api/faqs/:id`
Example:
```bash
curl -X DELETE http://localhost:8000/api/faqs/12345
```

## Code Structure
- `models/faqSchema.js`: Defines the FAQ schema and translation logic.
- `routes/faqRoutes.js`: Contains the API routes for FAQs.
- `utils/cacheService.js`: Handles Redis caching operations.
- `index.js`: Entry point for the application.

## Dependencies
- **Express.js**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Redis**: In-memory data store for caching.
- **Google Translate API**: For translating FAQs into multiple languages.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
