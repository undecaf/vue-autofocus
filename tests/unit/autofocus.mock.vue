<template>
  <div>
    <div v-if="!focusedId">
      <input type="text">
      <input
        id="none"
        v-autofocus
        type="text"
      >
    </div>

    <div
      v-else
      v-autofocus="focusedId === 'first-focusable'"
    >
      <!-- Unfocusable elements -->
      <div><span>Not focusable</span></div>
      <img src="#">
      <a />
      <input type="hidden">
      <input
        type="text"
        disabled
      >
      <!-- End of unfocusable elements -->

      <a
        id="first-focusable"
        href="#"
      />

      <input
        id="no-autofocus"
        type="text"
      >

      <input
        id="input"
        v-autofocus="focusedId === 'input'"
        type="text"
      >

      <textarea />

      <textarea
        id="textarea"
        v-autofocus="focusedId === 'textarea'"
      />

      <button
        id="button"
        v-autofocus="focusedId === 'button'"
      >
        Focused
      </button>

      <button>Not focused</button>

      <select
        id="select"
        v-autofocus="focusedId === 'select'"
      >
        <option>Focused 1</option>
        <option>Focused 2</option>
        <option>Focused 3</option>
      </select>

      <div id="none-matching" v-autofocus="focusedId === 'none-matching' ? 'button' : false">
        <div v-autofocus="focusedId === 'first-matching' ? '.outer .inner' : false">
          <input type="text">
          <div class="outer">
            <textarea />
            <div class="inner" />
            <input
              id="first-matching"
              class="inner"
              type="text"
            >
            <input
              class="inner"
              type="text"
            >
          </div>
        </div>
      </div>

      <div
        id="empty"
        v-autofocus="true"
      />
    </div>
  </div>
</template>

<script>
    export default {
        name: "AutofocusMock",

        props: {
            focusedId: {
                type: String,
                default: "",
            }
        },

        data() {
            return {
                date: null,
            }
        }
}
</script>
