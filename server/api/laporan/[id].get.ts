import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: "ID tidak valid" });
  }

  const laporan = await prisma.laporan_kerusakan.findUnique({
    where: { id },
  });

  if (!laporan) {
    throw createError({ statusCode: 404, message: "Laporan tidak ditemukan" });
  }

  return { success: true, data: laporan };
});
