<template>
  <div>
    <button
      v-if="focusedId === 'options'"
      id="options"
      v-autofocus="options"
    >
      Options
    </button>

    <!-- -------------------------------------- -->

    <div v-if="focusedId.match(/^input-/)">
      <input
        id="input-input"
        v-autofocus="focusedId === 'input-input'"
        type="text"
      >

      <textarea
        id="input-textarea"
        v-autofocus="focusedId === 'input-textarea'"
      />

      <button
        id="input-button"
        v-autofocus="focusedId === 'input-button'"
      >
        Focused
      </button>

      <select
        id="input-select"
        v-autofocus="focusedId === 'input-select'"
      >
        <option>Focused 1</option>
        <option>Focused 2</option>
        <option>Focused 3</option>
      </select>
    </div>

    <!-- -------------------------------------- -->

    <div v-if="focusedId.match(/^editable-/)">
      <span
        id="editable-span"
        v-autofocus="focusedId === 'editable-span'"
        contenteditable="true"
      />

      <div
        id="editable-div"
        v-autofocus="focusedId === 'editable-div'"
        contenteditable="true"
      />
    </div>

    <!-- -------------------------------------- -->

    <div
      v-if="focusedId === 'first-focusable' || focusedId === 'first-matching'"
      v-autofocus="options"
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

      <!-- Nested -->
      <div>
        <input type="text">
        <input
          id="first-matching"
          type="text"
          class="focus-me"
        >
      </div>
    </div>

    <!-- -------------------------------------- -->

    <div
      v-if="focusedId === 'unfocusable'"
      v-autofocus
    >
      <span />

      <div />
      <header />
      <footer />
      <nav />
      <section />
      <article />
      <address />

      <h1 />
    </div>

    <!-- -------------------------------------- -->

    <input
      v-if="focusedId === 'no-autofocus'"
      id="no-autofocus"
      type="text"
    >
  </div>
</template>

<script>
    export default {
        name: "AutofocusMock",

        props: {
            focusedId: {
                type: String,
                default: '',
            },

            options: {
                type: undefined,
                default: undefined,
            },
        },

        data() {
            return {
                date: null,
            }
        }
}
</script>
