<template>
  <div class="q-pa-md">
    <NothingHere v-if="!storeEntries.entries.length" />
    <q-list bordered separator v-else>
      <Sortable :list="storeEntries.entries" item-key="id" tag="div">
        <template #item="{ element, index }">
          <Entries :key="element.id" :entry="element" />
        </template>
      </Sortable>
    </q-list>

    <q-footer class="bg-transparent">
      <Balance />
      <AddEntries />
    </q-footer>
  </div>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { Sortable } from "sortablejs-vue3";

import Balance from "src/components/entries/Balance.vue";
import AddEntries from "src/components/entries/AddEntries.vue";
import Entries from "src/components/entries/Entry.vue";
import NothingHere from "src/components/entries/NothingHere.vue";

const storeEntries = useStoreEntries();
</script>
