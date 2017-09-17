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
This example is primarily based upon a wonderful article [Getting Started with the Vue Router](https://scotch.io/tutorials/getting-started-with-vue-router), which instructions I followed to create the basic application which demonstrates client-side routing in a single-page application.

Once I got the basic example working, I wanted to see how hard it was to extend and do something real. So I went to the ever-useful [ToDo MVC](http://todomvc.com) and found a VueJS 2.0 ToDo example to work with. The challenge with the example is that it was written as its own SPA and didn't use any tooling or preprocessor's. But it was actually quite easy to hack the ToDo example and turn it into a peer component.

I even got the 3 tabs in the ToDos screen to obey the router, using [Nested Routes](https://router.vuejs.org/en/essentials/nested-routes.html).
`),
      };
    },
  };
</script>
