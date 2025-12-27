import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { uid, Notify } from "quasar";

export const useStoreEntries = defineStore("entries", () => {
  // state
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

  // getters
  const balance = computed(() => {
    return entries.value.reduce((acc, { amount }) => {
      return acc + amount;
    }, 0);
  });

  // actions
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, { id: uid() });
    entries.value.push(newEntry);
    // resetEntryForm();
  };

  const deleteEntry = (entryId) => {
    const idx = entries.value.findIndex((entry) => entry.id === entryId);
    entries.value.splice(idx, 1);
    Notify.create({
      type: "positive",
      message: "Entry deleted",
      position: "top-right",
    });
  };
  // return state, getters, and actions
  return { entries, balance, addEntry, deleteEntry };
});
