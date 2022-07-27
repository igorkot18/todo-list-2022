<template>
  <section class="todo">
    <template v-if="loading">
        <div class="container d-flex justify-content-center mt-5">
            <LoaderComponent />
        </div>
    </template>

    <template v-else-if="todos">
        <div class="container d-flex justify-content-center todo__title">
            <h1>Todos</h1>
        </div>

        <template v-if="todos || !todos.length">
            <div class="container">
                <div class="row">
                    <div class="input-group p-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
                        </div>
                        <input 
                            v-model="postsFoundValue"
                            type="text" 
                            class="form-control" 
                            placeholder="Find todo..." 
                            aria-label="Username" 
                            aria-describedby="basic-addon1"
                        >
                        <select v-model="filter" class="custom-select" id="inputGroupSelect04">
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="not-completed">Not completed</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button" @click=showModalWindow>Create todo</button>
                            <button class="btn btn-outline-danger" type="button" @click="deleteAll">Delete all</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        

      <table class="container table table-hover table-striped table-light table-bordered todo__table">
        <thead class="table-dark">
          <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in paginatedTodos" :key="todo.id">
              <td class="col-1"><input type="checkbox" v-on:change="todo.completed = !todo.completed"/></td>
              <td class="col-10 todo__description"><span v-bind:class="{done: todo.completed}">{{todo.title}}</span></td>
              <td class="col-1"><i @click="removeTodo(todo.id)" class="todo__button col-2 bi bi-trash"></i></td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-center mt-2">
        <b-pagination
          class="todo__pagination"
          :total-rows="totalRows" 
          v-model="currentPage"
          :per-page="perPage"
        />
      </div>

      <b-modal centered v-model="isModalShow">
        <template #modal-title>
            <p>Create new task</p>
        </template>
        <div class="container modal-block">
          <form @submit.prevent="onSubmit" class="row">
            <div class="input-group mb-3">
              <input
                type="text" 
                v-model="title" 
                class="form-control" 
                placeholder="Enter task..." 
                aria-label="Recipient's username" 
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </b-modal>
    </template>

    <template v-else><div class="todo__no-todos"><p>No todos</p></div></template>
  </section>
</template>

<script>
import LoaderComponent from '../../loader/LoaderComponent.vue';

const axios = require('axios');

import './Todo.scss';

export default {
    name: "TodoComponent",
    components: {
        LoaderComponent,
    },
    data() {
        return {
            postsFoundValue: '',
            todos: [],
            loading: true,
            filter: "all",
            currentPage: 1,
            perPage: 10,
            isModalShow: false,
            title: '',
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
        foundPosts() {
            if (!this.postsFoundValue) {
                return this.filteredTodos
            } else {
                return this.filteredTodos.filter(item => item.title.includes(this.postsFoundValue))
            }
        },
        paginatedTodos () {
            return this.foundPosts.slice(
                (this.currentPage - 1) * this.perPage,
                this.currentPage * this.perPage
            )
        },
        totalRows () {
            return this.foundPosts.length
        }
    },
    methods: {
        removeTodo(id) {
            this.todos = this.todos.filter(item => item.id !== id);
        },
        deleteAll() {
            this.todos = []
            this.$toastr.i("All todos was deleted");
        },
        async getTodos() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                if (response.data) {
                    this.todos = response.data;
                }
                this.loading = false;
            }
            catch (error) {
                this.errorMessage = error.message;
                this.loading = false;
            }
        },
        showModalWindow() {
            this.isModalShow = !this.isModalShow
        },
        onSubmit() {
            if (this.title.trim().toLowerCase()) {
                const newTodo = {
                    id: Date.now(),
                    title: this.title,
                    completed: false,
                }
                
                this.todos.unshift(newTodo);
                this.title = '';
                this.$toastr.s("New todo was created");
            }
        }
    },
    filters: {
        uppercase(value) {
            return value.toUpperCase();
        }
    },
}
</script>