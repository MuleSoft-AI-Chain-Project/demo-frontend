<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ store.getPageTitle }}
        </q-toolbar-title>

        <div class="text-overline">v0.1alpha</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >

      <q-list class="q-pt-md">
        <MenuItem
          v-for="link in topMenuList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list>
        <q-item-label
          header
        >
          Agent Capabilities
        </q-item-label>
        <MenuItem
          v-for="link in agentMenuList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list>
        <q-item-label
          header
        >
          External Links
        </q-item-label>
        <ExternalLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-img style="width: 50px; position: absolute; bottom: 0;" src="/icons/mac-icon.svg" class="q-ma-md self-end"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import ExternalLink from 'components/ExternalLink.vue'
import MenuItem from 'components/MenuItem.vue'
import { useAgentStore } from 'stores/agent-store'
const store = useAgentStore()

const $q = useQuasar()
$q.dark.set('auto') // or 'auto'
const darkMode = ref($q.dark.isActive)

defineOptions({
  name: 'MainLayout'
})

const topMenuList = [
  {
    title: 'Chat',
    caption: 'Agent conversation',
    icon: 'question_answer',
    link: '/chat'
  }
]

const agentMenuList = [
  {
    title: 'Agent',
    caption: 'Configure skills and behaviour',
    icon: 'support_agent',
    link: '/agents'
  },
  {
    title: 'Knowledge',
    caption: 'Manage (un-structured) data',
    icon: 'library_books',
    link: '/knowledge'
  },
  {
    title: 'Settings',
    caption: 'App & API properties',
    icon: 'settings',
    link: '/settings'
  }
]

const linksList = [
  {
    title: 'MAC OSS Home',
    caption: 'mac-project.ai',
    icon: 'favorite',
    link: 'https://mac-project.ai/'
  },
  {
    title: 'MAC OSS Docs',
    caption: 'mac-project.ai/docs',
    icon: 'description',
    link: 'https://mac-project.ai/docs'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
