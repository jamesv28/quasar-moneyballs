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
      paid: false,
    },
    {
      id: 1,
      name: "rent",
      amount: -990.0,
      paid: false,
    },
    {
      id: 2,
      name: "phone",
      amount: -49.0,
      paid: false,
    },
    {
      id: 3,
      name: "random",
      amount: 0.0,
      paid: false,
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
    const newEntry = Object.assign({}, addEntryForm, {
      id: uid(),
      paid: false,
    });
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

  const updateEntry = (entryId, update) => {
    const idx = entries.value.findIndex((entry) => entry.id === entryId);
    Object.assign(entries.value[idx], update);
  };

  // return state, getters, and actions
  return { entries, balance, addEntry, deleteEntry, updateEntry };
});
