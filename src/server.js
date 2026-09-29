require("dotenv").config();

const express = require("express");
const logger = require("./logger")
const healthRouter = require("./routes/health");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

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