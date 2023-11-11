<template>
  <v-dialog :model-value="modelValue" width="auto" max-width="760"
    @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title>{{ item.name?.official }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-img v-if="item.flags?.png" class="mb-2" :width="300" :src="item.flags?.png" :alt="item.name.official"></v-img>
        <v-row dense>
          <v-col v-for="(detail, key) in country" :key="key" cols="12" md="6">
            <TopAlignLabel :title="detail.title" :value="detail.value" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="$emit('update:modelValue', false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TopAlignLabel from './TopAlignLabel.vue'
import { getNativeName, yesNoText, getLanguages } from '@/utils/country.utils'
import { join } from 'lodash-es'

const props = defineProps<{
  modelValue: boolean
  item?: any
}>()
defineEmits([
  'update:modelValue'
])
const country = computed(() => {
  const item = props.item
  return {
    cca2: {
      title: 'Country Code 2 character',
      value: item.cca2
    },
    cca3: {
      title: 'Country Code 3 character',
      value: item.cca3
    },
    callingCode: {
      title: 'Calling Code',
      value: item.idd?.root
    },
    altSpellings: {
      title: 'Alternative Name',
      value: join(item.altSpellings, ', ')
    },
    nativeName: {
      title: 'Native Name',
      value: getNativeName(item)
    },
    independent: {
      title: 'Independent',
      value: yesNoText(item.yesNoText)
    },
    unMember: {
      title: 'UN Member',
      value: yesNoText(item.unMember)
    },
    capital: {
      title: 'Capital',
      value: join(item.capital, ', ')
    },
    region: {
      title: 'Region',
      value: item.region
    },
    subregion: {
      title: 'Subregion',
      value: item.subregion
    },
    languages: {
      title: 'Languages',
      value: getLanguages(item)
    },
    timezones: {
      title: 'Timezones',
      value: join(item.timezones, ', ')
    }
  }
})
</script>
