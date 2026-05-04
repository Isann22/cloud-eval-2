<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

interface Laporan {
  id: number;
  judul: string;
  deskripsi: string;
  lokasi: string;
  imageUrl?: string | null;
  createdAt: string;
}

interface LaporanDetailResponse {
  success: boolean;
  data: Laporan;
}

const { data, error } = await useFetch<LaporanDetailResponse>(
  `/api/laporan/${id}`,
);

const laporan = computed(() => data.value?.data);

useHead({
  title: computed(() =>
    laporan.value ? `${laporan.value.judul} – LaporFasum` : "LaporFasum",
  ),
});

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeStyle: "short",
});

const formattedDate = computed(() =>
  laporan.value ? formatter.format(new Date(laporan.value.createdAt)) : "",
);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-6 py-10">
      <!-- Back -->
      <UButton
        to="/laporan"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-arrow-left"
        size="sm"
        class="mb-6"
      >
        Kembali ke daftar
      </UButton>

      <!-- Error -->
      <UAlert
        v-if="error"
        color="error"
        icon="i-heroicons-exclamation-triangle"
        title="Laporan tidak ditemukan"
        :description="error.message"
      />

      <!-- Detail -->
      <template v-else-if="laporan">
        <!-- Foto -->
        <div
          v-if="laporan.imageUrl"
          class="rounded-xl overflow-hidden mb-8 border border-gray-200"
        >
          <img
            :src="laporan.imageUrl"
            :alt="`Foto laporan: ${laporan.judul}`"
            class="w-full max-h-96 object-cover"
          />
        </div>

        <UCard>
          <div class="space-y-5">
            <!-- Header -->
            <div>
              <h1 class="text-xl font-bold text-gray-900 leading-snug">
                {{ laporan.judul }}
              </h1>
              <div class="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                  {{ laporan.lokasi }}
                </span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                  {{ formattedDate }}
                </span>
              </div>
            </div>

            <USeparator />

            <!-- Deskripsi -->
            <div>
              <p
                class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2"
              >
                Deskripsi
              </p>
              <p class="text-gray-700 leading-relaxed text-sm">
                {{ laporan.deskripsi }}
              </p>
            </div>
          </div>
        </UCard>
      </template>
    </div>
  </div>
</template>
