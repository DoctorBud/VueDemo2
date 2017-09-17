<template>
    <section class="todoapp" v-cloak>
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
        </header>
        <section class="main" v-show="todos.length">
            <input class="toggle-all" type="checkbox" v-model="allDone">
            <ul class="todo-list">
                <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo == editedTodo}">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="todo.completed">
                        <label @dblclick="editTodo(todo)">{{todo.title}}</label>
                        <button class="destroy" @click="removeTodo(todo)"></button>
                    </div>
                    <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
                </li>
            </ul>
        </section>
        <footer class="footer" v-show="todos.length">
            <span class="todo-count">
                <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
            </span>
            <ul class="filters">
                <li><a href="#/todos/all" :class="{selected: visibility == 'all'}">All</a></li>
                <li><a href="#/todos/active" :class="{selected: visibility == 'active'}">Active</a></li>
                <li><a href="#/todos/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
            </ul>
            <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
                Clear completed
            </button>
        </footer>

        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Written by <a href="http://evanyou.me">Evan You</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </section>
</template>


<script>

/* global Vue, todoStorage */

const filters = {
    all: function all(todos) {
        return todos;
    },
    active: function active(todos) {
        return todos.filter(function filter(todo) {
            return !todo.completed;
        });
    },
    completed: function completed(todos) {
        return todos.filter(function filter(todo) {
            return todo.completed;
        });
    }
};

const STORAGE_KEY = 'todos-vuejs';
import todoStorage from '../services/Store.js';
export default {

    // app initial state
    data() {
      return {
        todos: todoStorage.fetch(STORAGE_KEY),
        newTodo: '',
        editedTodo: null,
        visibility: 'all'
      };
    },


    // watch todos change for localStorage persistence
    watch: {
        '$route'(to, from) {
            const toPathElements = to.path.split(/\//g);
            if (toPathElements.length === 3 &&
                toPathElements[0] === '' &&
                toPathElements[1] === 'todos') {
                this.visibility = toPathElements[2];
            }
        },

        todos: {
            deep: true,
            handler: function (newVal, oldVal) {
                todoStorage.save(STORAGE_KEY, newVal);
            },
        }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredTodos: function filteredTodos() {
            return filters[this.visibility](this.todos);
        },
        remaining: function remaining() {
            return filters.active(this.todos).length;
        },
        allDone: {
            get: function allDone() {
                return this.remaining === 0;
            },
            set: function set(value) {
                this.todos.forEach(function setComplete(todo) {
                    todo.completed = value;
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

        addTodo: function addTodo() {
            var value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({ title: value, completed: false });
            this.newTodo = '';
        },

        removeTodo: function removeTodo(todo) {
            var index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },

        editTodo: function editTodo(todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit: function doneEdit(todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },

        cancelEdit: function cancelEdit(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },

        removeCompleted: function removeCompleted() {
            this.todos = filters.active(this.todos);
        }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'todo-focus': function focus(el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
}

</script>
