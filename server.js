const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory job store
const jobs = [];

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    engine: "mayflow",
    message: "MayFlow Engine is alive",
  });
});

// Create job
app.post("/api/jobs", (req, res) => {
  const { name, input } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Job name is required" });
  }

  const job = {
    id: Date.now(),
    name,
    input: input || "",
    status: "queued",
    createdAt: new Date().toISOString(),
  };

  jobs.push(job);
  res.json(job);
});

// List jobs
app.get("/api/jobs", (req, res) => {
  res.json({
    count: jobs.length,
    jobs,
  });
});

// 🔁 Simple job processor
setInterval(() => {
  const job = jobs.find((j) => j.status === "queued");
  if (!job) return;

  console.log("Processing job:", job.id);
  job.status = "processing";

  setTimeout(() => {
    job.status = "completed";
    job.completedAt = new Date().toISOString();
    console.log("Completed job:", job.id);
  }, 8000);
}, 3000);

app.listen(PORT, () => {
  console.log(`MayFlow Engine running on port ${PORT}`);
});
