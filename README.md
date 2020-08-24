# A smart Vue autofocus directive

![Minified size](https://badgen.net/bundlephobia/min/@undecaf/vue-autofocus)
![Open issues](https://badgen.net/github/open-issues/undecaf/vue-autofocus)
![Dependents](https://badgen.net/npm/dependents/@undecaf/vue-autofocus)
![Total downloads](https://badgen.net/npm/dt/@undecaf/vue-autofocus)
![License](https://badgen.net/github/license/undecaf/vue-autofocus)


The directive in this package, `v-autofocus`, tries to be smart in the following ways:

+   When placed on a non-focusable element (such as a `<div>`) or a Vue component, 
    it will focus on the first focusable descendant. Descendants are scanned in document order.
+   It can focus on `contenteditable` elements, too.
+   Focusable candidates [can be further restricted by a CSS selector](#configuration).
+   This allows `v-autofocus` to work with opaque Vue input components such as the
    [Vue Material Datepicker](https://vuematerial.io/components/datepicker),
    [Vue Material Chips](https://vuematerial.io/components/datepicker) and
    [Vue Material Autocomplete](https://vuematerial.io/components/autocomplete).
+   Since there are container components that manipulate the focus _after_ their children have been
    inserted (e.g. the [Vue Material Dialog](https://vuematerial.io/components/dialog)),
    `v-autofocus` can act with some delay (50&nbsp;ms by default). The delay is [configurable](#configuration).
+   The focus can also be set [in response to child events](#configuration), e.g. when a dialog is
    (re-)opened. 
+   The directive [can be disabled](#configuration).
    
Please note: in this context, an element is considered "focusable" if it can become the
[`document.activeElement`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement).
This includes `contenteditable` elements.

Focusable elements become non-focusable only if hidden or having attribute `disabled`.
Elements with _any_ integer `tabindex` value [are at least click focusable](https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute).


## Installation

As a module:

```shell script
$ npm install @undecaf/vue-autofocus
    or
$ yarn add @undecaf/vue-autofocus
```

Included as `<script>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@undecaf/vue-autofocus/dist/directives.min.js"></script>
```


## Usage

### Registering the directive

```javascript 1.8
import autofocus from 'vue-autofocus'

Vue.use(autofocus)
```


### Configuration

`v-autofocus` expects a configuration object, a primitive value as a single option (see below), or no
value at all. Unspecified options get default values.

The configuration object supports the following properties:

| Name | Type | Effect | Default |
|------|------|--------|---------|
| `enabled` | `Boolean` | Enables the directive if truthy. | `true` |
| `selector` | `String` | Only an element matching this selector can receive the focus. | `'*'` |
| `on` | `String` or `Array<String>` | Child event(s) that re-trigger auto-focusing.  | `[]` |
| `delay` | `Number` | Delay (in ms) until the focus is set.<br>A value of `0` sets the focus synchronously with the trigger event. | `50` |


If a primitive value is specified rather than an object then the type determines which option it applies to:
`Boolean`&nbsp;→&nbsp;`enabled`, `String`&nbsp;→&nbsp;`selector`, `Array`&nbsp;→&nbsp;`on`, `Number`&nbsp;→&nbsp;`delay`.

Options can be dynamic; changes to `on` take effect immediately, all other changes become noticeable only after a child event
(e.g. [`'hook:updated'`](https://twitter.com/DamianDulisz/status/981549658571968512) or
[`'md-opened'`](https://vuematerial.io/components/dialog)).

### Examples

A simple use case:

```html
<input type="text" v-autofocus>
```

Conditional autofocus:

```html
<input type="text" v-autofocus="{ enabled: active }">  <!-- or: autofocus="Boolean(active)" -->
```

Focusing on the first focusable child:

```html
<div v-autofocus>
  <!-- These are not focusable -->
  <div><span>Not focusable</span></div>
  <img src="#">
  <a></a>
  <input type="hidden">
  <input type="text" disabled>

  <div>
    <!-- First focusable child, nested -->
    <textarea v-model="comment"></textarea>
  </div>    
</div>
```

Focusing on the first focusable child that matches a selector:

```html
<div autofocus="{ selector: '.focus-me' }">  <!-- or:  v-autofocus="'.focus-me'" -->
  <!-- Focusable but will not receive focus -->
  <textarea v-model="comment"></textarea>
    
  <!-- Will receive focus -->
  <input type="text" class="focus-me" v-model="text">
</div>
```

Auto-focusing on the input inside a [Vue Material Datepicker](https://vuematerial.io/components/datepicker):

```html
<md-datepicker v-autofocus v-model="birthdate" :md-open-on-focus="false" />
```

Setting the focus on the first input of a [Vue Material Dialog](https://vuematerial.io/components/dialog)
whenever the dialog is (re-)opened (a selector is required since the dialog container is
focusable):

```html
<md-dialog v-autofocus="{ selector: 'input', on: 'md-opened' }" :md-active="showDialog">
  ...
</md-dialog>
```

This will have no effect whatsoever:

```html
<div v-autofocus>
  <input type="hidden">
</div>
```


## License

[MIT](http://opensource.org/licenses/MIT)
