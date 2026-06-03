import "dotenv/config";
import express from "express";
import cors from "cors";
import { env } from "./infrastructure/config/env";
import { errorMiddleware } from "./interface/middlewares/errorMiddleware";

import authRoutes from "./interface/routes/v1/auth.routes";
import productsRoutes from "./interface/routes/v1/products.routes";
import cartRoutes from "./interface/routes/v1/cart.routes";
import ordersRoutes from "./interface/routes/v1/orders.routes";
import diaryRoutes from "./interface/routes/v1/diary.routes";
import uploadRoutes from "./interface/routes/v1/upload.routes";

const app = express();

// Middlewares globales
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "🌸 Tienda SkinCare API está viva y lista para cuidar tu piel 🌸",
    timestamp: new Date().toISOString()
  });
});

// Rutas versionadas
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/diary", diaryRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Manejador de errores global (debe ir al final)
app.use(errorMiddleware);

export { app };
