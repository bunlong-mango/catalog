<template>
  <v-container fluid>
    <div class="text-h4 mb-3">Country Catalog</div>

    <v-data-iterator :items="items" items-per-page="25">
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
import { join } from 'lodash-es'
import LabelValue from './LabelValue.vue'
import { getNativeName } from '@/utils/country.utils'

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