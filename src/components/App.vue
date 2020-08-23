<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <div class="md-layout-item md-title">
        <code>v-autofocus</code> test
      </div>

      <md-button class="md-raised" @click="show({ enabled: false })">No autofocusing</md-button>
      <md-button class="md-raised" @click="show({ selector: 'input' })">Input</md-button>
      <md-button class="md-raised" @click="show({ selector: '.cancel' })">Cancel button</md-button>
      <md-button class="md-raised" @click="show({ selector: '.ok' })">OK button</md-button>
    </md-app-toolbar>

    <md-app-content>
      <p class="md-title">The buttons open a dialog, setting the focus on the indicated element</p>

      <div>
        <md-dialog v-autofocus="options" :md-active="showDialog">
          <md-dialog-title>Test dialog</md-dialog-title>

          <md-dialog-content>
            <md-field>
              <label>First focusable</label>
              <md-input type="text" v-model="text" />
            </md-field>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-raised cancel" @click="showDialog = false">Cancel</md-button>
            <md-button class="md-raised ok" @click="showDialog = false">OK</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
    export default {
        name: "App",

        data() {
            return {
                showDialog: false,
                options: undefined,
                text: undefined,
            }
        },

        methods: {
            show(options) {
                this.options = Object.assign({ on: 'md-opened'}, options)
                this.showDialog = true
            },
        }
    }
</script>

<style scoped>
</style>
