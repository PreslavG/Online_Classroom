import express from "express";
import { join } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Serve built files
app.use(express.static(join(__dirname, "dist")));

// Fallback to index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
