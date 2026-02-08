import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory job store (for now)
const jobs = [];

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    engine: "mayflow",
    message: "MayFlow Engine is alive",
  });
});

/**
 * List jobs
 */
app.get("/api/jobs", (req, res) => {
  res.json({
    count: jobs.length,
    jobs,
  });
});

/**
 * Create job (REAL endpoint)
 */
app.post("/api/jobs", (req, res) => {
  const { name, inputText } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Job name is required" });
  }

  const job = {
    id: randomUUID(),
    name,
    inputText: inputText || "",
    status: "queued",
    createdAt: new Date().toISOString(),
  };

  jobs.push(job);

  console.log("🆕 Job created:", job);

  res.status(201).json(job);
});

/**
 * Get single job
 */
app.get("/api/jobs/:id", (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json(job);
});

app.listen(PORT, () => {
  console.log(`🚀 MayFlow Engine running on port ${PORT}`);
});
