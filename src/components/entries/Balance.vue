<template>
  <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
    <div class="col text-grey-7 text-h6">Balance:</div>
    <div
      :class="useTextColor(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      {{ usecurrencify(storeEntries.balance) }}
    </div>
  </div>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { usecurrencify } from "src/use/useCurrency";
import { useTextColor } from "src/use/useTextColor";

const storeEntries = useStoreEntries();
</script>
