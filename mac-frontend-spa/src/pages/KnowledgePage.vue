<template>
  <q-page class="flex flex-center">
    <q-card flat style="min-height: inherit; width: 100%;" class="row">
      <div class="col-4 q-pa-lg">
        <div class="text-h6">Libraries</div>
        <q-tree
        :nodes="treeElements"
        node-key="label"
        selected-color="primary"
        v-model:selected="selected"
        default-expand-all
        />
        <q-btn outline color="accent" label="Add library"/>
        <q-btn outline color="accent" label="Add document"/>
        <q-btn outline color="accent" label="Add web source"/>
      </div>
      <div class="col-8 q-pa-lg">
        <div class="text-h6">Document Details</div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch, computed, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { api } from 'boot/axios'

const treeElements = ref([
        {
          label: 'Library A',
          children: [
            {
              label: 'Docs',
              icon: 'picture_as_pdf'
            },
            {
              label: 'Spec',
              icon: 'description'
            },
            {
              label: 'Website',
              icon: 'web'
            }
          ]
        }, {
          label: 'Library B',
          children: [
          {
              label: 'Docs',
              icon: 'picture_as_pdf'
            },
            {
              label: 'Spec',
              icon: 'description'
            }
          ]
        }
      ])

defineOptions({
  name: 'KnowledgePage'
});

</script>
