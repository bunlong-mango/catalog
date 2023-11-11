<template>
  <div v-if="!isNil(value)" class="py-1">
    <div class="text-subtitle-2 text-medium-emphasis">
      {{ title }}
    </div>
    <div>
      {{ value }}
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { isNil } from 'lodash-es'

const props = defineProps<{
  title: string
  value?: string
}>()
</script>
  