# A smart Vue autofocus directive


The directive in this package, `v-autofocus`, tries to be smart in the following way:

+   When placed on a non-focusable element (such as a `<div>`) or a Vue component, 
    it will focus on the first focusable descendant. Descendants are scanned in document order.
    
    Please note that AFAIK only `<text type="hidden">` and elements with attribute `disabled`
    are non-focusable; `tabindex="-1"` does not prevent focusing with a mouse.
    
+   `v-autofocus` works equally well for opaque Vue input components such as the
    [Vue Material Datepicker](https://vuematerial.io/components/datepicker),
    [Vue Material Chips](https://vuematerial.io/components/datepicker) and
    [Vue Material Autocomplete](https://vuematerial.io/components/autocomplete).

+   There are container components that manipulate the focus _after_ their children have been
    inserted (notably the [Vue Material Dialog](https://vuematerial.io/components/dialog));
    therefore `v-autofocus` acts with a small delay.

+   If a value is assigned to `v-autofocus` then the directive is enabled only if that value is truthy.


## Installation

As a package:

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

Focusing the first focusable child:

```html
<div v-autofocus>
  <!-- These are not focusable -->
  <div><span>Not focusable</span></div>
  <img src="#">
  <a></a>
  <input type="hidden">
  <input type="text" disabled>

  <div>
    <!-- This is the first focusable child -->
    <textarea v-model="comment"></textarea>
  </div>    
</div>
```

Auto-focusing on a [Vue Material Datepicker](https://vuematerial.io/components/datepicker):

```html
<md-datepicker v-autofocus v-model="birthdate":md-open-on-focus="false" />
```

This will have no effect:

```html
<div v-autofocus></div>
```


## License

[MIT](http://opensource.org/licenses/MIT)
