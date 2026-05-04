<script setup lang="ts">
definePageMeta({ layout: "landing" });

useHead({ title: "LaporFasum – Laporkan Kerusakan Fasilitas Umum" });

import type { ButtonProps } from "@nuxt/ui";

const heroLinks: ButtonProps[] = [
  {
    label: "Mulai Lapor",
    to: "/buat-laporan",
    color: "primary",
    size: "lg",
    class: "rounded-full px-8 font-semibold",
  },
  {
    label: "Lihat Laporan",
    to: "/laporan",
    color: "neutral",
    variant: "outline",
    size: "lg",
    trailingIcon: "i-heroicons-arrow-right",
    class: "rounded-full px-7",
  },
];

const features = [
  {
    icon: "i-heroicons-map-pin",
    title: "Catat Lokasi",
    description:
      "Tulis alamat atau nama jalan agar laporan mudah ditemukan dan ditindaklanjuti.",
  },
  {
    icon: "i-heroicons-camera",
    title: "Lampirkan Foto",
    description:
      "Satu foto lebih kuat dari seribu kata. Upload langsung dari HP kamu.",
  },
  {
    icon: "i-heroicons-bolt",
    title: "Langsung Terkirim",
    description:
      "Laporan tersimpan seketika dan bisa dilihat oleh siapa saja. Tanpa akun.",
  },
];
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <UPageHero
      headline="Terbuka untuk umum · Tanpa registrasi"
      title="Laporkan kerusakan fasilitas umum."
      description="Jalan berlubang, lampu mati, trotoar rusak — foto, tulis lokasinya, dan kirim. Tidak perlu akun, tidak perlu ribet."
      :links="heroLinks"
      :ui="{
        title: 'text-4xl sm:text-5xl',
      }"
    />

    <!-- Feature cards -->
    <div class="max-w-5xl mx-auto px-6 pb-16">
      <div class="border-t border-gray-100 pt-12">
        <p
          class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center"
        >
          Cara kerja
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <UPageCard
            v-for="f in features"
            :key="f.title"
            :icon="f.icon"
            :title="f.title"
            :description="f.description"
            variant="outline"
          />
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="max-w-5xl mx-auto px-6 pb-24">
      <div class="bg-gray-50 rounded-2xl px-8 py-12 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          Lihat kerusakan di sekitarmu?
        </h2>
        <p class="text-gray-400 text-sm mb-7 max-w-sm mx-auto">
          Butuh 30 detik. Tidak perlu daftar. Langsung lapor sekarang.
        </p>
        <UButton
          to="/buat-laporan"
          size="lg"
          color="primary"
          class="rounded-full px-10 font-semibold"
        >
          Buat Laporan Sekarang
        </UButton>
      </div>
    </div>
  </div>
</template>
