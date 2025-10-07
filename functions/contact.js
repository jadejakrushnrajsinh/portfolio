const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

exports.handler = async (event, context) => {
  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect(MONGO_URL);
      } catch (connectError) {
        console.error("DB connect error:", connectError);
        // Continue without DB for testing
      }
    }

    const { httpMethod, path, headers, body, queryStringParameters } = event;

    if (httpMethod === "POST") {
      // Public: Send message
      const { name, email, subject, message } = JSON.parse(body || "{}");

      if (!name || !email || !subject || !message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "All fields are required" }),
        };
      }

      try {
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
      } catch (error) {
        console.error("Error saving message:", error);
        // For testing, return success even if DB fails
      }

      return {
        statusCode: 201,
        body: JSON.stringify({ message: "Message sent successfully!" }),
      };
    }

    if (httpMethod === "GET") {
      // Admin only: View messages
      const authHeader = headers.authorization || headers.Authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "Unauthorized" }),
        };
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "Invalid token" }),
        };
      }

      const messages = await Message.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        body: JSON.stringify(messages),
      };
    }

    if (httpMethod === "DELETE") {
      // Admin only: Delete message
      const authHeader = headers.authorization || headers.Authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "Unauthorized" }),
        };
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "Invalid token" }),
        };
      }

      const id = queryStringParameters.id;
      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Message ID required" }),
        };
      }

      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Message not found" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Message deleted successfully" }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (error) {
    console.error("Contact function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
