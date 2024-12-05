import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { LocalStorage } from 'quasar'

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

function readLocalStorage (key) {
  return LocalStorage.getItem(key)
}

function writeLocalStorage (key, value) {
  LocalStorage.setItem(key, value)
}

// Load saved credentials upon site reload
api.defaults.headers['client_id'] = readLocalStorage('client_id') ?? ''
api.defaults.headers['client_secret'] = readLocalStorage('client_secret') ?? ''
api.defaults.baseURL = readLocalStorage('baseUrl') ?? 'http://localhost:8081/api/'

export const useAgentStore = defineStore('agentStore', {
  state: () => ({
    template: lorem,
    instructions: lorem,
    decorator: { before: lorem, after: lorem },
    error: null,
    pageTitle: readLocalStorage('pageTitle') ?? 'MuleSoft AI Chain Demo Frontend',
    agentName: readLocalStorage('agentName') ?? 'Bot agent',
    userName: readLocalStorage('userName') ?? 'Max'
  }),
  getters: {
    getTemplate: (state) => state.template,
    getInstructions: (state) => state.instructions,
    getDecorator: (state) => state.decorator,
    getError: (state) => state.error,
    getPageTitle: (state) => state.pageTitle,
    getAgentName: (state) => state.agentName,
    getUserName: (state) => state.userName
  },
  actions: {
    saveAgentSettings() {
      // TODO save settings to API
    },
    setBaseUrl(baseUrl) {
      writeLocalStorage('baseUrl', baseUrl)
      api.defaults.baseURL = baseUrl
    },
    setClientCredentias(clientId, clientSecret) {
      writeLocalStorage('client_id', clientId)
      writeLocalStorage('client_secret', clientSecret)
      api.defaults.headers['client_id'] = clientId
      api.defaults.headers['client_secret'] = clientSecret
    },
    setError(error) {
      this.error = error
    },
    resetError() {
      this.error = null
    },
    setAgentName(agentName) {
      writeLocalStorage('agentName', agentName)
      this.agentName = agentName
    },
    setUserName(userName) {
      writeLocalStorage('userName', userName)
      this.userName = userName
    },
    setPageTitle(pageTitle) {
      writeLocalStorage('pageTitle', pageTitle)
      this.pageTitle = pageTitle
    }
  },
});
