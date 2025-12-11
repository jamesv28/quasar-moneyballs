<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item
        v-for="entry in entries"
        :key="entry.id"
        class="text-weight-bold"
        :class="useTextColor(entry.amount)"
      >
        <q-item-section> {{ entry.name }} </q-item-section>

        <q-item-section side>
          {{ usecurrencify(entry.amount) }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usecurrencify } from "src/use/useCurrency";
import { useTextColor } from "src/use/useTextColor";
const entries = ref([
  {
    id: 0,
    name: "slary",
    amount: 1599.99,
  },
  {
    id: 1,
    name: "rent",
    amount: -990.0,
  },
  {
    id: 2,
    name: "phone",
    amount: -49.0,
  },
  {
    id: 3,
    name: "random",
    amount: 0.0,
  },
]);
</script>
