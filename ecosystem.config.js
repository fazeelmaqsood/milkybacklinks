/**
 * PM2 — MilkyBacklinks (port 3001, alongside milkyseo on 3000)
 * Usage: pm2 start ecosystem.config.js && pm2 save
 */

const fs = require("fs");
const path = require("path");

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) out[key] = value;
  }
  return out;
}

function loadMergedEnvFromFiles(appDir) {
  return {
    ...readEnvFile(path.join(appDir, ".env")),
    ...readEnvFile(path.join(appDir, ".env.local")),
    ...readEnvFile(path.join(appDir, ".env.production")),
    ...readEnvFile(path.join(appDir, ".env.production.local")),
  };
}

const _fileEnv = loadMergedEnvFromFiles(__dirname);
const STANDALONE_DIR = path.join(__dirname, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: "milkybacklinks",
      script: path.join(STANDALONE_DIR, "server.js"),
      cwd: STANDALONE_DIR,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      min_uptime: "5s",
      restart_delay: 2000,
      env: {
        ..._fileEnv,
        NODE_ENV: "production",
        PORT: 3001,
        HOSTNAME: "0.0.0.0",
      },
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      watch: false,
    },
  ],
};
