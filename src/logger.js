const pino = require("pino");

const fileStream = pino.destination({
  dest: "/var/log/devops-api/my-api.log",
  mkdir: true,
  sync: false,
});

const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  pino.multistream([
    { stream: process.stdout },
    { stream: fileStream },
  ])
);

module.exports = logger;