import "dotenv/config";
import { app } from "./app";
import { env } from "./infrastructure/config/env";
import { pool } from "./infrastructure/prisma/prisma-client";

const PORT = env.port || 4000;

async function start() {
  try {
    // Verify DB connection
    await pool.query("SELECT 1");
    console.log("✅ Conexión a la base de datos establecida");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📋 API disponible en http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

start();
