<template>
  <q-page class="flex flex-center">
    <q-card flat style="min-height: inherit; width: 100%;" class="flex justify-center">
      <q-card-section class="q-gutter-y-lg col q-px-lg" style="max-width: 1000px; min-width: 700px;">
      <div class="text-h6 q-pt-xs">Backend API</div>
      <q-badge color="warning">Important: Your API must have a CORS policy applied!</q-badge>
      <div class="row settingStyle">
        <div class="col-4">Download API specification</div>
        <div class="col-8"><q-icon name="open_in_new"></q-icon></div>
      </div>
      <div class="row settingStyle">
        <div class="col-4">Current API base URL</div>
        <div class="col-8">{{ urlCurrent }}</div>
      </div>
      <div class="row settingStyle">
        <div class="col-4">Set API base URL</div>
        <q-input filled v-model="urlInput" color="accent" class="col-8" standout label="URL" dense />
      </div>
      <div class="row settingStyle">
        <div class="col-4">Client ID</div>
        <q-input filled v-model="clientID" color="accent" class="col-8" standout label="optional" dense />
      </div>
      <div class="row settingStyle">
        <div class="col-4">Client Secret</div>
        <q-input filled v-model="clientSecret" color="accent" class="col-8" :type="isPwd ? 'password' : 'text'" label="optional" dense>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      </div>

      <div class="text-h6 q-pt-md">Display</div>
      <div class="row settingStyle">
        <div class="col-4">Page title</div>
        <div class="col-8">
          <q-input filled v-model="pageTitle" color="accent" class="col-8" standout dense />
        </div>
      </div>
      <div class="row settingStyle">
        <div class="col-4">Dark mode</div>
        <div class="col-8">
          <q-toggle v-model="darkMode" color="accent"/>
        </div>
      </div>
      <div class="row settingStyle">
        <div class="col-4">Chat agent name</div>
        <q-input filled v-model="agentName" color="accent" class="col-8" standout dense />
      </div>
      <div class="row settingStyle">
        <div class="col-4">Chat user name</div>
        <q-input filled v-model="userName" color="accent" class="col-8" standout dense />
      </div>
      <div class="row settingStyle q-pt-md">
        <div class="col-4"></div>
        <div class="col-8"><q-btn outline color="accent" label="Save" @click="saveSettings"/></div>
      </div>
    </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { useAgentStore } from 'stores/agent-store'
const store = useAgentStore()

defineOptions({
  name: 'SettingsPage'
})

const urlInput = ref('')
const urlCurrent = ref(api.defaults.baseURL)
const clientID = ref(api.defaults.headers['client_id'])
const clientSecret = ref(api.defaults.headers['client_secret'])
const isPwd = ref(true)
const agentName = ref(store.getAgentName)
const userName = ref(store.getUserName)
const pageTitle = ref(store.getPageTitle)

const $q = useQuasar()
const darkMode = ref($q.dark.isActive)
watch(darkMode, () => {
  $q.dark.toggle()
})

function saveSettings () {
  if (urlInput.value.length > 0) {
    store.setBaseUrl(urlInput.value)
    urlCurrent.value = api.defaults.baseURL
  }
  if (clientID.value.length > 0 && clientSecret.value.length > 0) {
    store.setClientCredentias(clientID.value, clientSecret.value)
  } else {
    clientID.value = ''
    clientSecret.value = ''
  }
  if (agentName.value.length > 0) { store.setAgentName(agentName.value) }
  if (userName.value.length > 0) { store.setUserName(userName.value) }
  if (pageTitle.value.length > 0) { store.setPageTitle(pageTitle.value) }
}
</script>

<style scoped>

.settingStyle{
  height: 2em;
  align-items: center;
}

</style>
