<template>
    <div>
        <template>
            <div class="container d-flex justify-content-center mt-1">
                <h1>Todos</h1>
            </div>
            <div class="container mb-2">
                <div class="row">
                    <div class="col-lg-6">
                        <AddTodo @add-todo="addTodo"/>
                    </div>
                    <b-button @click="deleteAll" class="col-lg-3 col-sm-3" variant="danger">Delete All</b-button> 
                    <select class="col-lg-3 todos__select" v-model="filter">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="not-completed">Not completed</option>
                    </select>
                </div>
            </div>
        </template>

        <template v-if="loading">
            <div class="container d-flex justify-content-center mt-5">
                <LoaderComponent />
            </div>
        </template>

        <template v-else-if="paginatedTodos.length">
            <div class="container todos-list">
                <div
                    v-for="todo in paginatedTodos"
                    :key="todo.id" 
                    class="row p-2 todos-list__item"
                >
                    <span class="col-lg-10 d-flex justify-content-left" v-bind:class="{done: todo.completed}">
                        <input class="m-2" type="checkbox" v-on:change="todo.completed = !todo.completed"/>
                        <div class="m-2">{{todo.title | uppercase}}</div>
                    </span>
                    <b-button @click="removeTodo(todo.id)" class="col-lg-2" variant="outline-danger">Delete</b-button>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-2">
               <b-pagination
                    :total-rows="totalRows" 
                    v-model="currentPage"
                    :per-page="perPage"
                /> 
            </div>
            
        </template>

        <template v-else><div class="todos__no-todos"><p>No todos</p></div></template>
    </div>
</template>

<script>
import AddTodo from './AddTodo.vue';
import LoaderComponent from '../../loader/LoaderComponent.vue';

const axios = require('axios');

import './Todo.scss';

export default {
    name: "TodoList",
    components: {
        AddTodo,
        LoaderComponent,
    },
    data() {
        return {
            todos: [],
            loading: true,
            filter: "all",
            currentPage: 1,
            perPage: 10,
        };
    },
    mounted() {
        this.getTodos();
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'all') {
                return this.todos
            } else if (this.filter === 'completed') {
                return this.todos.filter(item => item.completed)
            } else if (this.filter === 'not-completed') {
                return this.todos.filter(item => !item.completed)
            } else return false
        },
        paginatedTodos () {
            return this.filteredTodos.slice(
                (this.currentPage - 1) * this.perPage,
                this.currentPage * this.perPage
            )
        },
        totalRows () {
            return this.filteredTodos.length
        }
    },
    methods: {
        removeTodo(id) {
            this.todos = this.todos.filter(item => item.id !== id);
        },
        addTodo(newTodo) {
            this.todos.push(newTodo);
        },
        deleteAll() {
            this.todos = []
        },
        async getTodos() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                const data = await response.data;
                this.todos = data;
                this.loading = false;
            }
            catch (error) {
                this.errorMessage = error.message;
                this.loading = false;
            }
        },
    },
    filters: {
        uppercase(value) {
            return value.toUpperCase();
        }
    },
}
</script>