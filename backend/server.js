require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    // Basic environment validation to fail-fast on misconfiguration
    // DB_PASS is optional (blank password supported)
    const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_HOST', 'JWT_SECRET'];
    const missing = requiredEnv.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');
    if (missing.length) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and models synced');

    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
