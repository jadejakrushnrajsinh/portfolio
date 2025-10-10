FROM node:18

WORKDIR /app

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend code
COPY backend/ ./backend/

# Copy client static files
COPY client/ ./client/

# Set working directory to backend
WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "start"]
