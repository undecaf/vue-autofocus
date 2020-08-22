# A smart Vue autofocus directive


The directive in this package, `v-autofocus`, tries to be smart in the following ways:

+   When placed on a non-focusable element (such as a `<div>`) or a Vue component, 
    it will focus on the first focusable descendant. Descendants are scanned in document order.
+   It can focus also on `contenteditable` elements.
+   Focusable candidates [can be further restricted by a CSS selector](#configuration).
+   This allows `v-autofocus` to work with opaque Vue input components such as the
    [Vue Material Datepicker](https://vuematerial.io/components/datepicker),
    [Vue Material Chips](https://vuematerial.io/components/datepicker) and
    [Vue Material Autocomplete](https://vuematerial.io/components/autocomplete).
+   Since there are container components that manipulate the focus _after_ their children have been
    inserted (notably the [Vue Material Dialog](https://vuematerial.io/components/dialog)),
    `v-autofocus` acts with a small delay (50&nbsp;ms) by default. This delay is [configurable](#configuration). 
+   The directive [can be disabled](#configuration).
    
Please note: in this context, an element is considered "focusable" if it can become the
[`document.activeElement`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement).
This includes `contenteditable` elements.

Otherwise focusable elements become non-focusable only if hidden or having attribute `disabled`.
Elements with `tabindex="-1"` _are_ focusable with the mouse.


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
value at all. Unspecified options have default values.

The configuration object with default values: 

```javascript 1.8
{
    enabled: true,  // if true then focus will be set when the element is inserted
    selector: '*',  // focusable elements must match this in order to get focus
    delay: 50       // delay (in ms) until focus is set after the element was inserted 
}
```

If a primitive value is specified then the type determines the option it applies to:
`Boolean`&nbsp;→&nbsp;`enabled`, `String`&nbsp;→&nbsp;`selector`, `Number`&nbsp;→&nbsp;`delay`.


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
  <!-- Focusable but will not receive the focus -->
  <textarea v-model="comment"></textarea>
    
  <!-- This will receive the focus -->
  <input type="text" class="focus-me" v-model="text">
</div>
```

Auto-focusing on a [Vue Material Datepicker](https://vuematerial.io/components/datepicker):

```html
<md-datepicker v-autofocus v-model="birthdate" :md-open-on-focus="false" />
```

This will have no effect:

```html
<div v-autofocus>

</div>
```


## License

[MIT](http://opensource.org/licenses/MIT)
