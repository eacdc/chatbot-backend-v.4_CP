# Chatbot Project

A full-stack chatbot application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Structure

```
chatbot-project/
├── chatbot-frontend/     # React frontend application
├── chatbot-backend/      # Node.js/Express backend server
├── scripts/             # Utility scripts for deployment and maintenance
└── render.yaml          # Render deployment configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd chatbot-project
```

2. Install backend dependencies:
```bash
cd chatbot-backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../chatbot-frontend
npm install
```

4. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Copy the example environment variables from `.env.example` files

### Development

1. Start the backend server:
```bash
cd chatbot-backend
npm run dev
```

2. Start the frontend development server:
```bash
cd chatbot-frontend
npm start
```

### Deployment

The application is configured for deployment on Render. The `render.yaml` file contains the deployment configuration.

## Features

- User authentication and authorization
- Real-time chat functionality
- File upload support
- Responsive design
- MongoDB database integration
- Question Mode for interactive learning
  - Configurable through the admin panel
  - Supports structured question formats
  - Includes migration script for converting existing content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Chatbot Frontend Project

This is a static frontend for the chatbot project that can be deployed to Render.

## Deployment Instructions for Render

1. Create a new Static Site on Render
2. Connect your GitHub repository 
3. Configure the build settings:
   - Build Command: `cd chatbot-frontend && npm install && npm run build`
   - Publish Directory: `chatbot-frontend/build`
4. Add environment variables if needed
5. Deploy the site

## Local Development

To run the project locally:

```bash
cd chatbot-frontend
npm install
npm start
```

This will start the development server at http://localhost:3000.

## Important Note

This is a static deployment of the frontend only. Backend functionality is not included.
If you need API functionality, you'll need to:

1. Update the `API_URL` in `chatbot-frontend/src/config.js` to point to your backend API.
2. Deploy a separate backend service and connect it to this frontend.

## Project Structure

The project contains:
- `chatbot-frontend/`: The React frontend application
- `render.yaml`: Configuration file for Render deployment

## License

This project is licensed under the MIT License. 