import { prisma, pool } from "../src/infrastructure/prisma/prisma-client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@pielpura.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPielPura2026!";
  const name = "Admin Piel Pura";

  console.log("Seeding started...");

  // 1. Create admin
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name,
      password: hashedAdminPassword,
      role: "ADMIN"
    }
  });

  console.log(`Admin user seeded: ${admin.email}`);

  // 2. Create products
  const products = [
    {
      name: "Sérum Facial Hidratante",
      price: 65.00,
      description: "Sérum intensivo con ácido hialurónico y extractos botánicos para una hidratación profunda y luminosidad natural.",
      category: "Rostro",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      showInDiary: true
    },
    {
      name: "Contorno de Ojos Revitalizante",
      price: 45.00,
      description: "Fórmula ligera que reduce bolsas y ojeras, aportando firmeza y frescura a la delicada zona de los ojos.",
      category: "Rostro",
      imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
      showInDiary: true
    },
    {
      name: "Aceite Facial Nutritivo",
      price: 55.00,
      description: "Mezcla de aceites orgánicos prensados en frío para nutrir y restaurar la barrera cutánea durante la noche.",
      category: "Rostro",
      imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      showInDiary: false
    },
    {
      name: "Mascarilla Arcilla Purificante",
      price: 38.00,
      description: "Mascarilla de arcilla rosa y caolín para limpiar poros en profundidad sin resecar la piel.",
      category: "Rostro",
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      showInDiary: false
    },
    {
      name: "Jabón Corporal Relajante",
      price: 50.00,
      description: "Gel limpiador corporal con aceites esenciales de lavanda y eucalipto para una experiencia de spa en casa.",
      category: "Cuerpo",
      imageUrl: "https://images.unsplash.com/photo-1607006342456-ba2521846b01?auto=format&fit=crop&w=600&q=80",
      showInDiary: false
    },
    {
      name: "Loción Corporal Hidratante",
      price: 30.00,
      description: "Crema corporal fluida de rápida absorción con manteca de karité y extracto de avena.",
      category: "Cuerpo",
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      showInDiary: false
    }
  ];

  for (const product of products) {
    // Check if product already exists to avoid duplicates when seeding multiple times
    const existing = await prisma.product.findFirst({
      where: { name: product.name }
    });
    if (!existing) {
      await prisma.product.create({
        data: product
      });
    }
  }

  console.log("Products seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
