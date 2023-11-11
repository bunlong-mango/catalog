<template>
  <v-app>
    <v-main>
      <Suspense>
        <CountryCatalog />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import CountryCatalog from "@/components/CountryCatalog.vue";
</script>
