<template>
  <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3 align-center">
    <div class="col text-grey-7 text-h6">Balance:</div>
    <div
      :class="useTextColor(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      <div class="row">
        <div class="col">
          {{ usecurrencify(storeEntries.balance) }}
        </div>
      </div>
      <div class="row" v-if="storeEntries.balancePaid">
        <div class="col text-caption text-grey-6">
          Paid:
          <span
            class="text-weight-bold"
            :class="useTextColor(storeEntries.balcnePaid)"
          >
            {{ usecurrencify(storeEntries.balancePaid) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { usecurrencify } from "src/use/useCurrency";
import { useTextColor } from "src/use/useTextColor";

const storeEntries = useStoreEntries();
</script>
