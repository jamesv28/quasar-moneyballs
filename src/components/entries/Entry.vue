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
      <q-item-section> {{ entry.name }} </q-item-section>

      <q-item-section side>
        {{ usecurrencify(entry.amount) }}
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
</script>
