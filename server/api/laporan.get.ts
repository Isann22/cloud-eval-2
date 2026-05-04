import prisma from "../utils/prisma";

export default defineEventHandler(async () => {
  const data = await prisma.laporan_kerusakan.findMany({
    orderBy: { createdAt: "desc" },
  });

  return { success: true, data };
});
