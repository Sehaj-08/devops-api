const express = require("express");
const healthRouter = require("./routes/health");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "DevOps API is running"
    });
});

app.use("/api/health", healthRouter);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});