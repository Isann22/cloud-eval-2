interface UploadResponse {
  success: boolean;
  url?: string;
  message?: string;
}

export function useUpload() {
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  /**
   * Upload a file to /api/upload and return the public S3 URL.
   * Returns null if the upload fails.
   */
  async function uploadFile(file: File): Promise<string | null> {
    isUploading.value = true;
    uploadError.value = null;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await $fetch<UploadResponse>("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.success && response.url) {
        return response.url;
      }

      uploadError.value = response.message ?? "Upload gagal";
      return null;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat upload";
      uploadError.value = message;
      return null;
    } finally {
      isUploading.value = false;
    }
  }

  return { uploadFile, isUploading, uploadError };
}
