<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-slide-item
        v-for="entry in storeEntries.entries"
        :key="entry.id"
        @left="onLeftSwipeEntry($event, entry)"
        @right="onRightSwipeEntry($event, entry)"
        left.color="positive"
        right.color="negative"
      >
        <template v-slot:left>
          <q-icon name="done" />
        </template>
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
        <q-item class="text-weight-bold" :class="useTextColor(entry.amount)">
          <q-item-section> {{ entry.name }} </q-item-section>

          <q-item-section side>
            {{ usecurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>

    <q-footer class="bg-transparent">
      <Balance />
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
    </q-footer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";
import { usecurrencify } from "src/use/useCurrency";
import { useTextColor } from "src/use/useTextColor";
import Balance from "src/components/entries/Balance.vue";

// stores
const storeEntries = useStoreEntries();
const $q = useQuasar();
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

// slide items
const onRightSwipeEntry = ({ reset }, entry) => {
  $q.dialog({
    title: "Delete Entry",
    message: `
    Delete Entry?
    <div class="text-weight-bold mt-md ${useTextColor(entry.amount)}">
      ${entry.name} - ${usecurrencify(entry.amount)}
    </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "positive",
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(entry.id);
    })
    .onCancel(() => {
      reset();
    });
};

const onLeftSwipeEntry = ({ reset }, entry) => {
  console.log("swiped left");
};

const addEntryformSubmit = () => {
  storeEntries.addEntry(newEntryForm);
  resetEntryForm();
};
</script>
