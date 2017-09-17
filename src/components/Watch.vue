<template>
    <section class="todoapp" v-cloak>
        <header class="header">
            <h1>Watched Coin</h1>
            <input class="new-todo" autofocus autocomplete="off" placeholder="Enter a Coin Symbol" v-model="newWatch" @keyup.enter="addWatch">
            <h6>Not Fully Implemented. The Search tab allows the watch state to be toggled, and this Watch tab reflects those choices. However, the All/Active/Completed tabs at the bottom are leftover from ToDo.</h6>
        </header>
        <section class="main" v-show="watches.length">
            <input class="toggle-all" type="checkbox" v-model="allDone">
            <ul class="todo-list">
                <li class="todo" v-for="watch in filteredWatchs" :class="{completed: watch.completed, editing: watch == editedWatch}">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="watch.completed">
                        <label @dblclick="editWatch(watch)">{{watch.title}}</label>
                        <button class="destroy" @click="removeWatch(watch)"></button>
                    </div>
                    <input class="edit" type="text" v-model="watch.title" v-watch-focus="watch == editedWatch" @blur="doneEdit(watch)" @keyup.enter="doneEdit(watch)" @keyup.esc="cancelEdit(watch)">
                </li>
            </ul>
        </section>
        <footer class="footer" v-show="watches.length">
            <span class="todo-count">
                <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
            </span>
            <ul class="filters">
                <li><a href="#/watch/all" :class="{selected: visibility == 'all'}">All</a></li>
                <li><a href="#/watch/active" :class="{selected: visibility == 'active'}">Active</a></li>
                <li><a href="#/watch/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
            </ul>
            <button class="clear-completed" @click="removeCompleted" v-show="watches.length > remaining">
                Clear completed
            </button>
        </footer>

        <footer class="info">
            <p>Double-click to edit a watch</p>
        </footer>
    </section>
</template>


<script>

/* global Vue, watchStorage */

const filters = {
    all: function all(watches) {
        return watches;
    },
    active: function active(watches) {
        return watches.filter(function filter(watch) {
            return !watch.completed;
        });
    },
    completed: function completed(watches) {
        return watches.filter(function filter(watch) {
            return watch.completed;
        });
    }
};

const STORAGE_KEY = 'watch-vuejs';
import watchStorage from '../services/Store.js';
export default {

    // app initial state
    data() {
      return {
        watches: watchStorage.fetch(STORAGE_KEY),
        newWatch: '',
        editedWatch: null,
        visibility: 'all'
      };
    },


    // watch watches change for localStorage persistence
    watch: {
        '$route'(to, from) {
            const toPathElements = to.path.split(/\//g);
            if (toPathElements.length === 3 &&
                toPathElements[0] === '' &&
                toPathElements[1] === 'watch') {
                this.visibility = toPathElements[2];
            }
        },

        watches: {
            deep: true,
            handler: function (newVal, oldVal) {
                watchStorage.save(STORAGE_KEY, newVal);
            },
        }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredWatchs: function filteredWatchs() {
            return filters[this.visibility](this.watches);
        },
        remaining: function remaining() {
            return filters.active(this.watches).length;
        },
        allDone: {
            get: function allDone() {
                return this.remaining === 0;
            },
            set: function set(value) {
                this.watches.forEach(function setComplete(watch) {
                    watch.completed = value;
                });
            }
        }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {

        pluralize: function pluralize(word, count) {
            return word + (count === 1 ? '' : 's');
        },

        addWatch: function addWatch() {
            var value = this.newWatch && this.newWatch.trim();
            if (!value) {
                return;
            }
            this.watches.push({ title: value, completed: false });
            this.newWatch = '';
        },

        removeWatch: function removeWatch(watch) {
            var index = this.watches.indexOf(watch);
            this.watches.splice(index, 1);
        },

        editWatch: function editWatch(watch) {
            this.beforeEditCache = watch.title;
            this.editedWatch = watch;
        },

        doneEdit: function doneEdit(watch) {
            if (!this.editedWatch) {
                return;
            }
            this.editedWatch = null;
            watch.title = watch.title.trim();
            if (!watch.title) {
                this.removeWatch(watch);
            }
        },

        cancelEdit: function cancelEdit(watch) {
            this.editedWatch = null;
            watch.title = this.beforeEditCache;
        },

        removeCompleted: function removeCompleted() {
            this.watches = filters.active(this.watches);
        }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'watch-focus': function focus(el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
}

</script>
