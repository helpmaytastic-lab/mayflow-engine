import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    engine: "mayflow",
    message: "MayFlow Engine is alive"
  });
});

/**
 * Create render job (REAL endpoint, logic comes next)
 */
app.post("/api/jobs", async (req, res) => {
  const { name, prompt } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Job name is required" });
  }

  // For now: just acknowledge job
  res.json({
    success: true,
    job: {
      id: Date.now(),
      name,
      status: "queued"
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MayFlow Engine running on port ${PORT}`);
});
