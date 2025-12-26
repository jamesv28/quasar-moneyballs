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

    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Balance:</div>
        <div :class="useTextColor(balance)" class="col text-h6 text-right">
          {{ usecurrencify(balance) }}
        </div>
      </div>
      <q-form
        @submit="addEntry"
        class="row q-pa-md q-pb-sm q-gutter-sm bg-primary"
      >
        <div class="col">
          <q-input
            v-model="newEntryForm.name"
            ref="nameRef"
            outlined
            label="Name"
            bg-color="white"
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="newEntryForm.amount"
            input-class="text-right"
            outlined
            label="Amount"
            bg-color="white"
            dense
            type="number"
            step="0.01"
          />
        </div>
        <div class="col col-auto">
          <q-btn type="submit" round color="primary" icon="add" />
        </div>
      </q-form>
    </q-footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { uid } from "quasar";
import { usecurrencify } from "src/use/useCurrency";
import { useTextColor } from "src/use/useTextColor";

const entries = ref([
  {
    id: 0,
    name: "salary",
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
// balance
const balance = computed(() => {
  return entries.value.reduce((acc, { amount }) => {
    return acc + amount;
  }, 0);
});

const nameRef = ref(null);

const addEntryformDefault = {
  name: "",
  amount: null,
};
// add entry
const newEntryForm = reactive({
  ...addEntryformDefault,
});

const resetEntryForm = () => {
  Object.assign(newEntryForm, addEntryformDefault);
  nameRef.value.focus();
};

const addEntry = () => {
  const newEntry = Object.assign({}, newEntryForm, { id: uid() });
  entries.value.push(newEntry);
  resetEntryForm();
};
</script>
