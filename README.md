# A smart Vue autofocus directive


The directive in this package, `v-autofocus`, tries to be smart in the following ways:

+   When placed on a non-focusable element (such as a `<div>`) or a Vue component, 
    it will focus on the first focusable descendant. Descendants are scanned in document order.

+   This makes `v-autofocus` work equally well with opaque Vue input components such as the
    [Vue Material Datepicker](https://vuematerial.io/components/datepicker),
    [Vue Material Chips](https://vuematerial.io/components/datepicker) and
    [Vue Material Autocomplete](https://vuematerial.io/components/autocomplete).

+   In order to be more selective, a string can be assigned to `v-autofocus`.
    It is interpreted as CSS selector, and the focus will be set on the first matching
    focusable descendant.

+   If _any_ value is assigned to `v-autofocus` then the directive is enabled only if that 
    value is truthy.
    
+   There are container components that manipulate the focus _after_ their children have been
    inserted (notably the [Vue Material Dialog](https://vuematerial.io/components/dialog));
    therefore `v-autofocus` acts with a small delay (50&nbsp;ms).
    
Please note: an element is considered "focusable" if it can become the
[`document.activeElement`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement).
Input elements are non-focusable only if hidden or having attribute `disabled`;
elements with `tabindex="-1"` _are_ focusable with a mouse.


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


### Examples

A simple use case:

```html
<input type="text" v-autofocus>
```

Conditional autofocus:

```html
<input type="text" v-autofocus="focusMe">
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
    <!-- First focusable child -->
    <textarea v-model="comment"></textarea>
  </div>    
</div>
```

Focusing on the first focusable child that matches a selector:

```html
<div v-autofocus=".focus-me">
  <!-- These are not focusable -->
  <div><span>Not focusable</span></div>
  <img src="#">
  <a></a>
  <input type="hidden">
  <input type="text" disabled>

  <div>
    <!-- First focusable child but will not receive the focus -->
    <textarea v-model="comment"></textarea>

    <!-- This will receive the focus -->
    <input type="text" class="focus-me" v-model="text">
  </div>    
</div>
```

Auto-focusing on a [Vue Material Datepicker](https://vuematerial.io/components/datepicker):

```html
<md-datepicker v-autofocus v-model="birthdate" :md-open-on-focus="false" />
```

This will have no effect:

```html
<div v-autofocus></div>
```


## License

[MIT](http://opensource.org/licenses/MIT)
