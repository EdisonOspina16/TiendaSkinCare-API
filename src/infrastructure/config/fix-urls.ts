import { prisma, pool } from "../prisma/prisma-client";

async function main() {
  console.log("Starting URL cleanup in database...");

  const products = await prisma.product.findMany({
    where: {
      imageUrl: {
        contains: "storage.supabase.co/storage/v1/s3"
      }
    }
  });

  console.log(`Found ${products.length} products with incorrect URLs.`);

  for (const product of products) {
    const incorrectPrefix = "https://einvjcyonydcieeekaer.storage.supabase.co/storage/v1/s3";
    const correctPrefix = "https://einvjcyonydcieeekaer.supabase.co/storage/v1/object/public";

    if (product.imageUrl.startsWith(incorrectPrefix)) {
      const newUrl = product.imageUrl.replace(incorrectPrefix, correctPrefix);
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl: newUrl }
      });
      console.log(`Updated product: ${product.name}`);
      console.log(`  Old: ${product.imageUrl}`);
      console.log(`  New: ${newUrl}`);
    }
  }

  console.log("URL cleanup finished successfully.");
}

main()
  .catch((e) => {
    console.error("Error during URL cleanup:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
