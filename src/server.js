require("dotenv").config();
const { randomUUID } = require("crypto");

const express = require("express");
const logger = require("./logger")
const healthRouter = require("./routes/health");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
//this middle ware will fetch the req id from the req attatch it with response and send to client for debugging 

app.use((req, res, next) => {
  req.requestId = req.headers["x-request-id"] || randomUUID();

  res.setHeader("X-Request-ID", req.requestId);

  logger.info(
    {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
    },
    "request received"
  );

  next();
});

app.get("/", (req, res) => {
    logger.info({ip:req.ip} , "Root api route accessed")
    res.json({
        message: "DevOps API is running"
    });
});

app.use("/api/health", healthRouter);

app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on port ${PORT}`);
});