<template>
  <div class="q-pa-md">
    <NothingHere v-if="!storeEntries.entries.length" />
    <q-list bordered separator v-else>
      <Entries
        v-for="entry in storeEntries.entries"
        :key="entry.id"
        :entry="entry"
      />
    </q-list>

    <q-footer class="bg-transparent">
      <Balance />
      <AddEntries />
    </q-footer>
  </div>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";

import Balance from "src/components/entries/Balance.vue";
import AddEntries from "src/components/entries/AddEntries.vue";
import Entries from "src/components/entries/Entry.vue";
import NothingHere from "src/components/entries/NothingHere.vue";

const storeEntries = useStoreEntries();
</script>
