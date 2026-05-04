<script setup lang="ts">
interface Laporan {
  id: number;
  judul: string;
  deskripsi: string;
  lokasi: string;
  imageUrl?: string | null;
  createdAt: string;
}

const props = defineProps<{ laporan: Laporan }>();

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

const formattedDate = computed(() =>
  formatter.format(new Date(props.laporan.createdAt)),
);
</script>

<template>
  <NuxtLink :to="`/laporan/${laporan.id}`" class="block group">
    <UCard
      class="overflow-hidden h-full transition-shadow group-hover:shadow-md"
    >
      <template v-if="laporan.imageUrl" #header>
        <img
          :src="laporan.imageUrl"
          :alt="`Foto laporan: ${laporan.judul}`"
          class="w-full h-48 object-cover transition-transform group-hover:scale-[1.02]"
        />
      </template>

      <div class="space-y-1">
        <h3
          class="font-semibold text-sm leading-snug text-gray-900 group-hover:text-primary transition-colors"
        >
          {{ laporan.judul }}
        </h3>
        <p class="text-sm text-gray-400 line-clamp-2">
          {{ laporan.deskripsi }}
        </p>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-map-pin" class="w-3.5 h-3.5" />
            {{ laporan.lokasi }}
          </span>
          <time :datetime="laporan.createdAt">{{ formattedDate }}</time>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
