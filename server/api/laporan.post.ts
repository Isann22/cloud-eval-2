import prisma from "../utils/prisma";

interface LaporanBody {
  judul: string;
  deskripsi: string;
  lokasi: string;
  imageUrl: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LaporanBody>(event);

  if (!body.judul || !body.deskripsi || !body.lokasi || !body.imageUrl) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        message: "judul, deskripsi, lokasi, dan foto wajib diisi",
      },
    });
  }

  const laporan = await prisma.laporan_kerusakan.create({
    data: {
      judul: body.judul,
      deskripsi: body.deskripsi,
      lokasi: body.lokasi,
      imageUrl: body.imageUrl,
    },
  });

  return { success: true, data: laporan };
});
