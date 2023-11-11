<template>
  <v-container fluid>
    <div class="text-h4 mb-3">Country Catalog</div>
    <v-row>
      <v-col md="4" sm="6" lg="3" cols="12">
        <v-text-field :model-value="textToSearch" placeholder="Search country name" clearable density="compact"
          hide-details="auto" variant="outlined" @update:model-value="setTextToSearch" />
      </v-col>
      <v-col md="4" sm="6" lg="3" cols="12">
        <v-select label="Sort Name By" density="compact" hide-details="auto" variant="outlined" :items="sortByOptions"
          :model-value="sortBy" @update:model-value="setSortBy" />
      </v-col>
    </v-row>

    <v-data-iterator v-model:sort-by="sortBy" :search="textToSearch" :custom-filter="filterByName" filter-keys="name"
      :items="items" items-per-page="25">
      <template v-slot:default="{ items }">
        <v-row>
          <template v-for="({ raw: item }, i) in items" :key="i">
            <v-col lg="3" md="4" sm="6" cols="12">
              <v-card max-width="400px" min-height="400px">
                <v-img :src="item.flags?.png" :alt="item.name.official"></v-img>
                <v-card-title class="title">
                  {{ item.name?.official }}
                </v-card-title>
                <v-card-text>
                  <LabelValue title="Country Code 2 character" :value="item.cca2" />
                  <LabelValue title="Country Code 3 character" :value="item.cca3" />
                  <LabelValue title="Calling Code" :value="item.idd?.root" />
                  <LabelValue title="Alternative Name" :value="join(item.altSpellings, ', ')" />
                  <LabelValue title="Native Name" :value="getNativeName(item)" />
                </v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { ofetch } from 'ofetch'
import { join, isNil, throttle } from 'lodash-es'
import LabelValue from './LabelValue.vue'
import { getNativeName } from '@/utils/country.utils'

// Search
const textToSearch = ref('')
const setTextToSearch = throttle((val: string) => {
  textToSearch.value = val
}, 250, { leading: true })
const filterByName = (value: any, query: string) => {
  if (isNil(value) || isNil(query)) {
    return false
  }
  const officialName = value.official ?? ''
  const commonName = value.common ?? ''
  const nativeName = getNativeName({ name: value })
  const fullName = officialName + commonName + nativeName
  return fullName.toString().toLocaleUpperCase().indexOf(query.toString().toLocaleUpperCase()) !== -1
}

// Sort
type SortItem = {
  key: string;
  order?: boolean | 'asc' | 'desc';
};
const sortBy = ref<SortItem[]>([{ key: 'name.official', order: 'asc' }])
const sortByOptions = [
  {
    title: 'Ascending',
    value: { key: 'name.official', order: 'asc' }
  },
  {
    title: 'Descending',
    value: { key: 'name.official', order: 'desc' }
  }
]
const setSortBy = (val: any) => {
  sortBy.value = [val]
}

const items = ref([])

const URL_COUNTRY = 'https://restcountries.com/v3.1/all'
try {
  const data = await ofetch(URL_COUNTRY)
  items.value = data
} catch (e) {
  console.log(e)
}
</script>
  
<style scoped>
.title:hover {
  cursor: pointer;
}
</style>