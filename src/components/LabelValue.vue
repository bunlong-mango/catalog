<template>
  <p>
    <span class="font-weight-bold">{{ title + ':' }} </span>
    {{ value }}
  </p>
</template>
  
<script setup lang="ts">
const props = defineProps<{
  title: string
  value?: string
}>()
</script>