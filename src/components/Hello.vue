<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="marked" v-html="markedText">
    </div>
  </div>
</template>

<script>
  import marked from 'marked';

  export default {
    name: 'Hello',
    data() {
      return {
        msg: 'Welcome to VueDemo2',
        markedText: marked(
`
This is a followup to my two-pint evaluation of the VueJS 2.0 stack, which resulted in the building of [VueDemo1](https://github.com/DoctorBud/VueDemo1) [demo](https://doctorbud.com/VueDemo1/#/).

I added to VueDemo1 the following:

- There is a **Search** tab that allows for the selection and *watching* of particular coin.
- These watched coin are displayed on the **Watch** tab (which was hacked from the ToDo tab).
- I used [good-table](https://github.com/xaksis/vue-good-table) to implement the search table.
- A started using [Element](http://element.eleme.io/#/en-US) to provide some styling capability, rather than using my traditional [Bootstrap](http://getbootstrap.com).

`),
      };
    },
  };
</script>
