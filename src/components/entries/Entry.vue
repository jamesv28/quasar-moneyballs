<template>
  <q-slide-item
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
      <q-item-section>
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="entry.name"
          v-slot="scope"
          :cover="false"
          :offset="[16, 12]"
          anchor="top left"
          label-set="Ok"
          auto-save
          buttons
        >
          <q-input
            v-model="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none"
            autofocus
            dense
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section side>
        {{ usecurrencify(entry.amount) }}
        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="entry.amount"
          auto-save
          v-slot="scope"
          anchor="top left"
          :cover="false"
          :offset="[16, 12]"
          buttons
          label-set="ok"
        >
          <q-input
            v-model.number="scope.value"
            dense
            autofocus
            input-class="text-weight-bold"
            type="number"
            setup="0.01"
            @keyup.enter="scope.set"
            class="letter-spacing-none text-right"
          />
        </q-popup-edit>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { usecurrencify } from "src/use/useCurrency";
import { useTextColor } from "src/use/useTextColor";
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";

const $q = useQuasar();
const storeEntries = useStoreEntries();

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
});
// slide items
const onRightSwipeEntry = ({ reset }) => {
  $q.dialog({
    title: "Delete Entry",
    message: `
    Delete Entry?
    <div class="text-weight-bold mt-md ${useTextColor(props.entry.amount)}">
      ${props.entry.name} - ${usecurrencify(props.entry.amount)}
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
      storeEntries.deleteEntry(props.entry.id);
    })
    .onCancel(() => {
      reset();
    });
};

const onLeftSwipeEntry = ({ reset }, entry) => {
  console.log("swiped left");
};

const onNameUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { name: value });
};

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value });
};
</script>
