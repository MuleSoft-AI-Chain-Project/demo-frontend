<template>
  <q-page class="flex content-end items-stretch">
    <q-card flat style="min-height: inherit; width: 100%;">
      <q-card-section horizontal style="height: calc(100% - 33px);">
        <div class="q-pl-md q-pb-md q-pr-md row justify-center items-end col-9">
          <div style="width: 100%;" class="q-px-md">
            <q-scroll-area ref="scrollArea" :style="{height: chatHeight + 'px', overflow: 'hidden'}" :content-style="{ display: 'flex', 'flex-direction': 'column', 'justify-content': 'flex-end' }" :thumb-style="{'opacity': 0}">
              <div v-for="message in messageHistory" :key="message">
                <q-chat-message
                  v-if="message.text[0].length > 0"
                  :name="message.name"
                  :avatar='message.name === store.getAgentName ? "https://cdn.quasar.dev/img/avatar1.jpg" : "https://cdn.quasar.dev/img/avatar2.jpg"'
                  :text="message.text"
                  text-html
                  :sent='message.name === store.getAgentName ? false : true'
                  :bg-color='message.name === store.getAgentName ? "primary" : "secondary"'
                  text-color="white"
                />
                <q-chat-message
                  v-else
                  :name="message.name"
                  avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  bg-color="primary"
                  text-color="white"
                >
                <q-spinner-dots class="q-pl-sm" size="2rem" />
                </q-chat-message>
              </div>
            </q-scroll-area>
            <q-input color="secondary" filled dense v-model="inputText" class="q-pt-sm" @keydown.enter="sendClicked" >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="sendClicked" type="submit"/>
              </template>
            </q-input>
          </div>
        </div>

        <q-card-section class="col-3">
          <div style="bottom: 0;">
            <div class="text-h6">Chat Options</div>
            <div class="text-overline q-pt-sm">LLM temperature: {{ temperature }}</div>
            <q-slider
              v-model="temperature"
              color="accent"
              :min="0"
              :step="0.1"
              :max="2"
              style="width: 100%;"
            />
            <div class="text-overline q-pt-sm">Chat memory enabled: {{memoryEnabled}}</div>
            <q-toggle v-model="memoryEnabled" color="accent"/>
            <div class="text-overline q-pt-sm">Speach enabled: {{speachEnabled}}</div>
            <q-toggle v-model="speachEnabled" color="accent"/>
            <div class="text-overline q-pt-sm">LLM</div>
            <q-select outlined dense color="accent" v-model="llmProviderSelection" :options="llmProviderOptions" label="Provider" />
            <q-select outlined dense color="accent" class="q-pt-sm" v-model="llmModelSelection" :options="llmModelOptions" label="Model" />

            <div class="text-overline q-pt-sm">Max output token</div>
            <q-input outlined dense color="accent" v-model="maxTokens" type="number" label="0 = unlimited"
              :rules="[ val => val >= 0 || 'Value must be <= 0']" />
            <div class="text-overline q-pt-sm">Purge chat memory</div>
            <q-btn outline color="accent" label="Reset" @click="deleteChat"/>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions style="height: 30px; padding-left: 32px; padding-right: 32px;" class="q-gutter-x-sm">
        <q-badge color="accent">
          Total tokens: {{ totalCallTokens.input + totalCallTokens.output }} ({{ totalCallTokens.input }} input, {{ totalCallTokens.output }} output)
        </q-badge>
        <q-badge color="accent">
          Last call tokens: {{ lastCallTokens.input + lastCallTokens.output }} ({{ lastCallTokens.input }} input, {{ lastCallTokens.output }} output)
        </q-badge>
      </q-card-actions>
    </q-card>

    <ErrorDialog/>

  </q-page>
</template>

<script setup>
import { ref, watch, computed, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { api } from 'boot/axios'
import { handleHttpErrors } from 'boot/global-functions'
import { useAgentStore } from 'stores/agent-store'
import ErrorDialog from 'components/ErrorDialog.vue'

defineOptions({
  name: 'ChatPage'
});

const store = useAgentStore()

const chatHeight = computed(() => window.innerHeight - 145)
const inputText = ref('')
const temperature = ref(0.5)
const memoryEnabled = ref(true)
const speachEnabled = ref(false)
const scrollArea = ref(null)
const llmProviderOptions = ref(['default'])
const llmProviderSelection = ref('default')
const llmModelOptions = ref(['default'])
const llmModelSelection = ref('default')
const maxTokens = ref(500)
const lastCallTokens = ref({input: 0, output: 0})
const totalCallTokens = ref({input: 0, output: 0})


var messageHistory = ref([{
  name: store.getAgentName,
  text: ['Hi, how can I help you?']
}])

function sendClicked () {
  if (inputText.value.length > 0) {
    messageHistory.value.push({
    name: store.getUserName,
    text: [inputText.value]
    })
    getChatResponse(inputText.value)
    inputText.value = ''
  }
  messageHistory.value.push({
    name: store.getAgentName,
    text: ['']
  })
  scrollToBottom()
}

function scrollToBottom () {
  const scrollTarget = scrollArea.value.getScrollTarget();
  scrollArea.value.setScrollPosition('vertical' , scrollTarget.scrollHeight, 300);
}

function getChatResponse (prompt) {
  api.post('/chat',
    { 'prompt': prompt,
      'llm_temperature': temperature.value,
      'llm_provider': llmProviderSelection.value,
      'llm_model': llmModelSelection.value,
      'chat_memory': memoryEnabled.value,
      'max_output_token': parseInt(maxTokens.value),
    },
    { headers: {
      'userId': store.getUserName
    }})
    .then(response => {
      messageHistory.value.at(-1).text = [response.data.promptResponse]
      lastCallTokens.value = {input: response.data.inputTokens, output: response.data.outputTokens}
      totalCallTokens.value.input += response.data.inputTokens
      totalCallTokens.value.output += response.data.outputTokens
    }).catch((error) => {
      store.setError(handleHttpErrors(error))
      messageHistory.value.at(-1).text = ['### ' + error.message + ' ###']
    }
    )
}

function getLlmList() {
  api.get('/llm')
    .then(response => {
      llmProviderOptions.value = []
      llmModelOptions.value = []
      response.data.forEach(el => {
        llmProviderOptions.value.push(el.llm_provider)
        // meke the entries unique
        llmProviderOptions.value = [...new Set(llmProviderOptions.value)]
        llmModelOptions.value.push(el.llm_model)
        llmProviderSelection.value = llmProviderOptions.value[0]
        llmModelSelection.value = llmModelOptions.value[0]
      })
    })
    .catch((error) => {
      console.log("No LLM list found, providing 'default' only.");
    }
    )
}

function deleteChat () {
  api.delete('/chat')
    .then(response => {
      messageHistory.value = [{
        name: store.getAgentName,
        text: ['Hi, how can I help you?']
      }]
      lastCallTokens.value = { input: 0, output: 0 }
      totalCallTokens.value = { input: 0, output: 0 }
    }).catch((error) => {
       store.setError(handleHttpErrors(error))
    }
    )
}

onMounted(() => {
  getLlmList()
  // window.addEventListener("resize", getCurrentInstance().proxy.forceUpdate());
})

// onUnmounted(() => {
//   window.removeEventListener("resize", getCurrentInstance().proxy.forceUpdate());
// })
</script>

<style lang="scss">
/* Hide the spinners that appear on the number input field */
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>
