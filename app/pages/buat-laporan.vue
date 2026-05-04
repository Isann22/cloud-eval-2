<script setup lang="ts">
useHead({ title: "LaporFasum – Buat Laporan" });

const router = useRouter();
const toast = useToast();
const { uploadFile, isUploading, uploadError } = useUpload();

const judul = ref("");
const deskripsi = ref("");
const lokasi = ref("");
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isSubmitting = ref(false);

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  selectedFile.value = file;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = file ? URL.createObjectURL(file) : null;
}

function removeFile() {
  selectedFile.value = null;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = null;
}

async function handleSubmit() {
  if (!judul.value.trim() || !deskripsi.value.trim() || !lokasi.value.trim()) {
    toast.add({
      title: "Form tidak lengkap",
      description: "Judul, deskripsi, dan lokasi wajib diisi.",
      color: "error",
    });
    return;
  }

  if (!selectedFile.value) {
    toast.add({
      title: "Foto wajib dilampirkan",
      description: "Pilih foto bukti kerusakan sebelum mengirim laporan.",
      color: "error",
    });
    return;
  }

  isSubmitting.value = true;

  try {
    let imageUrl: string | undefined;

    if (selectedFile.value) {
      const url = await uploadFile(selectedFile.value);
      if (!url) {
        toast.add({
          title: "Upload gambar gagal",
          description: uploadError.value ?? "Coba lagi.",
          color: "error",
        });
        return;
      }
      imageUrl = url;
    }

    await $fetch("/api/laporan", {
      method: "POST",
      body: {
        judul: judul.value.trim(),
        deskripsi: deskripsi.value.trim(),
        lokasi: lokasi.value.trim(),
        imageUrl,
      },
    });

    toast.add({
      title: "Laporan berhasil dikirim!",
      description: "Terima kasih telah melaporkan kerusakan fasilitas.",
      color: "success",
    });

    router.push("/laporan");
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.";
    toast.add({
      title: "Gagal mengirim laporan",
      description: message,
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Form -->
    <div class="max-w-2xl mx-auto px-6 py-10">
      <UCard>
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <UFormField label="Judul Laporan" required>
            <UInput
              v-model="judul"
              placeholder="Contoh: Lampu jalan mati di Jl. Merdeka"
              :disabled="isSubmitting"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Deskripsi" required>
            <UTextarea
              v-model="deskripsi"
              placeholder="Jelaskan kerusakan yang terjadi secara singkat..."
              :rows="4"
              :disabled="isSubmitting"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Lokasi" required>
            <UInput
              v-model="lokasi"
              placeholder="Contoh: Jl. Merdeka Raya No. 10, Jakarta"
              :disabled="isSubmitting"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Foto Bukti" required>
            <div class="space-y-3">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                :disabled="isSubmitting || isUploading"
                @change="onFileChange"
              />
              <div
                v-if="previewUrl"
                class="relative w-full rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  :src="previewUrl"
                  alt="Preview gambar"
                  class="w-full max-h-56 object-cover"
                />
                <UButton
                  type="button"
                  variant="solid"
                  color="error"
                  size="xs"
                  icon="i-heroicons-x-mark"
                  class="absolute top-2 right-2"
                  aria-label="Hapus gambar"
                  @click="removeFile"
                />
              </div>
            </div>
          </UFormField>

          <div class="flex justify-end gap-3 pt-2">
            <UButton
              to="/laporan"
              variant="outline"
              color="neutral"
              :disabled="isSubmitting"
            >
              Batal
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="isSubmitting || isUploading"
              :disabled="isSubmitting || isUploading"
              icon="i-heroicons-paper-airplane"
            >
              Kirim Laporan
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>
