<template>
  <q-form
    @submit="addEntryformSubmit"
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
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStoreEntries } from "src/stores/storeEntries";

const storeEntries = useStoreEntries();
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

const addEntryformSubmit = () => {
  storeEntries.addEntry(newEntryForm);
  resetEntryForm();
};
</script>
