import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Home Viewing Booking API Server running on port http://localhost:${PORT}`);
  console.log(`📖 Health check available at: http://localhost:${PORT}/api/health`);
});
