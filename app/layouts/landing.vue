<template>
  <UHeader title="LaporFasum" to="/">
    <template #right>
      <UButton
        to="/laporan"
        color="neutral"
        variant="ghost"
        size="sm"
        label="Laporan"
      />
      <UButton
        to="/buat-laporan"
        color="primary"
        size="sm"
        label="Buat Laporan"
        class="rounded-full px-5"
      />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-sm text-muted">© 2026 LaporFasum</p>
    </template>
    <template #right>
      <p class="text-sm text-muted">Dibuat untuk warga, oleh warga.</p>
    </template>
  </UFooter>
</template>
