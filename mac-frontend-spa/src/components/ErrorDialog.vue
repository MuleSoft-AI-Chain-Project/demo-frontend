<template>
  <q-dialog v-model="showErrorDialog" @hide="closeError">
    <q-card flat bordered style="width: 700px;">
      <q-card-section class="bg-negative text-center"> {{ errorDetails.message }} </q-card-section>
      <q-card-section class="col">
        <div class="text-overline">URL</div>
        <div> {{ errorDetails.url }} </div>
        <div class="text-overline q-pt-md">Details</div>
        <div> {{ errorDetails.details }} </div>
      </q-card-section>
      <q-card-section class="text-center"> <q-btn outline color="negative" label="Close" @click="closeError"/> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAgentStore } from 'stores/agent-store';

const store = useAgentStore()

const showErrorDialog = ref(false)
const errorDetails = ref(null)

defineOptions({
  name: 'ErrorDialog'
})

watch(
  () => store.error,
  (newValue, oldValue) => {
    if (newValue) {
      errorDetails.value = newValue
      showErrorDialog.value = true
    }
  }
)

function closeError () {
  store.resetError()
  showErrorDialog.value = false
}
</script>
