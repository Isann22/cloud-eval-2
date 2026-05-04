<script setup lang="ts">
useHead({ title: "LaporFasum – Daftar Laporan" });

interface Laporan {
  id: number;
  judul: string;
  deskripsi: string;
  lokasi: string;
  imageUrl?: string | null;
  createdAt: string;
}

interface LaporanResponse {
  success: boolean;
  data: Laporan[];
}

const { data, error } = await useFetch<LaporanResponse>("/api/laporan");
const allLaporan = computed(() => data.value?.data ?? []);

// Search
const query = ref("");

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return allLaporan.value;
  return allLaporan.value.filter(
    (l) =>
      l.judul.toLowerCase().includes(q) ||
      l.lokasi.toLowerCase().includes(q) ||
      l.deskripsi.toLowerCase().includes(q),
  );
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-6 py-10">
      <!-- Page header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
            Daftar Laporan
          </h1>
          <p class="text-sm text-gray-400 mt-1">
            {{ filtered.length }} dari {{ allLaporan.length }} laporan
          </p>
        </div>

        <!-- Search -->
        <UInput
          v-model="query"
          icon="i-heroicons-magnifying-glass"
          placeholder="Cari judul, lokasi, deskripsi..."
          class="w-full sm:w-72"
          :ui="{ base: 'rounded-full' }"
        />
      </div>

      <!-- Error -->
      <UAlert
        v-if="error"
        color="error"
        icon="i-heroicons-exclamation-triangle"
        title="Gagal memuat laporan"
        :description="error.message"
        class="mb-6"
      />

      <!-- Empty — no data at all -->
      <div v-else-if="allLaporan.length === 0" class="text-center py-24">
        <p class="text-4xl mb-4">📋</p>
        <p class="text-gray-500 font-medium">Belum ada laporan</p>
        <p class="text-sm text-gray-400 mt-1 mb-6">
          Jadilah yang pertama melaporkan kerusakan.
        </p>
        <UButton to="/buat-laporan" color="primary" class="rounded-full px-6">
          Buat Laporan Pertama
        </UButton>
      </div>

      <!-- Empty — no search results -->
      <div v-else-if="filtered.length === 0" class="text-center py-24">
        <p class="text-4xl mb-4">🔍</p>
        <p class="text-gray-500 font-medium">
          Tidak ada hasil untuk "{{ query }}"
        </p>
        <p class="text-sm text-gray-400 mt-1 mb-6">Coba kata kunci lain.</p>
        <UButton variant="ghost" color="neutral" @click="query = ''">
          Hapus pencarian
        </UButton>
      </div>

      <!-- Grid -->
      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <LaporanCard v-for="item in filtered" :key="item.id" :laporan="item" />
      </div>
    </div>
  </div>
</template>
