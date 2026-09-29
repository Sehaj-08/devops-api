const express = require("express");
const logger = require("../logger")
const router = express.Router();

router.get("/", (req, res) => {
    logger.info({ip:req.ip} , "Health api accessed")
    res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

module.exports = router;