<template>
  <q-page class="flex flex-center">
    <q-card flat style="min-height: inherit; width: 100%;" class="flex justify-center content-start">
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
        align="justify" narrow-indicator style="width: 100%;"
      >
        <q-tab name="tools" label="Tools" />
        <q-tab name="knowledge" label="Knowlege access" />
        <q-tab name="prompt" label="Prompt" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated style="width: 100%;">
        <q-tab-panel name="tools"  class="q-px-xl">
          <div class="text-h6">Tool assingment</div>
          <div class="text-caption q-pb-md">Select the tools the agent should be allowed to use.</div>
          <div class="q-gutter-y-md">
            <div v-for="(tool, index) in avilableTools" :key="index" class="row itemBackground q-pa-md">
              <q-toggle color="accent" v-model="selectedTools[index]" class="q-mr-lg"/>
              <div class="col">
                <div class="text-overline"> {{ tool.name }}</div>
                <div class="text-body2"> {{ tool.description }}</div>
              </div>
            </div>
          </div>
          <q-btn outline color="accent" label="Save" class="q-my-lg" @click="saveToolsSelection"/>
        </q-tab-panel>

        <q-tab-panel name="knowledge"  class="q-px-xl">
          <div class="text-h6">Knowledge assingment</div>
          <div class="text-caption q-pb-md">Select the knowledge stores the agent should be allowed to read.</div>
        </q-tab-panel>

        <q-tab-panel name="prompt" class="q-px-xl">
          <div class="text-h6">Agent definition</div>
          <div class="text-caption q-pb-md">Define purpose, behaviour and guardrails for the agent</div>
          <div class="text-overline">Template</div>
          <q-input dense color="accent" v-model="tmpTemplate" filled type="textarea" rows="4"/>
          <div class="text-overline q-pt-sm">Instructions</div>
          <q-input dense color="accent" v-model="tmpInstructions" filled type="textarea"  rows="4"/>
          <q-separator class="q-mt-md"/>
          <div class="text-overline q-pt-sm">Decorator: before</div>
          <q-input dense color="accent" v-model="tmpDecoratorBefore" filled type="textarea" rows="3"/>
          <div class="text-overline q-pt-sm">Decorator: after</div>
          <q-input dense color="accent" v-model="tmpDecoratorAfter" filled type="textarea" rows="3"/>
          <q-btn outline color="accent" label="Save" class="q-my-lg"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAgentStore } from 'stores/agent-store'
import { api } from 'boot/axios'
import { handleHttpErrors } from 'boot/global-functions'

const tab = ref('tools')

const store = useAgentStore()
const tmpTemplate = ref(store.getTemplate)
const tmpInstructions = ref(store.getInstructions)
const tmpDecoratorBefore = ref(store.getDecorator.before)
const tmpDecoratorAfter = ref(store.getDecorator.after)
const avilableTools = ref([])
const selectedTools = ref([])

defineOptions({
  name: 'AgentsPage'
});

const promptTemplateOptions = ref(['default'])
const promptTemplateSelection = ref('default')
const promptDecoratorOptions = ref(['default'])
const promptDecoratorSelection = ref('default')

function getToolsList() {
  api.get('/tools')
    .then(response => {
      avilableTools.value = response.data
      getSelectedToolsList()
    })
    .catch((error) => {
      console.log("/tools endpoint not found")
    }
    )

}

function getSelectedToolsList() {
  api.get('/tools/selection')
    .then(response => {
      selectedTools.value = []
      avilableTools.value.forEach((tool, i) => {
        if(response.data.includes(tool.name)) {
          selectedTools.value.push(true)
        } else {
          selectedTools.value.push(false)
        }
      })
    })
    .catch((error) => {
      console.log(error);
    }
    )
}

function saveToolsSelection () {
  let selectionNames = []
  selectedTools.value.forEach((val, i) => {
    if(val === true) {
      selectionNames.push(avilableTools.value[i].name)
    }
  })
  api.post('/tools/selection',
    selectionNames)
    .then(response => {
    }).catch((error) => {
      store.setError(handleHttpErrors(error))
      messageHistory.value.at(-1).text = ['### ' + error.message + ' ###']
    }
    )
}

onMounted(() => {
  getToolsList()
})

</script>

<style scoped>
.itemBackground{
  background-color: #8686862e;
  border-radius: 6px;
}
</style>
