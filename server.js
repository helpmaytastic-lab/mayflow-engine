import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// in-memory storage (for now)
const jobs = [];

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    engine: "mayflow",
    message: "MayFlow Engine is alive"
  });
});

// GET all jobs
app.get("/api/jobs", (req, res) => {
  res.json({
    count: jobs.length,
    jobs
  });
});

// CREATE a job
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
    createdAt: new Date().toISOString()
  };

  jobs.push(job);

  res.status(201).json(job);
});

// start server
app.listen(PORT, () => {
  console.log(`MayFlow Engine running on port ${PORT}`);
});
