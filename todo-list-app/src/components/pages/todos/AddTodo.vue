<template>
    <div class="container">
        <form @submit.prevent="onSubmit" class="row m-3">
            <input class="col-xxl-9 todos__input" type="text" v-model="title" placeholder="Write your task">
            <b-button type="submit" class="col-xxl-3" variant="primary">Create task</b-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'AddTodo',
        data() {
            return {
                title: '',
            }
        },
        methods: {
            onSubmit() {
                if (this.title.trim()) {
                    const newTodo = {
                        id: Date.now(),
                        title: this.title,
                        completed: false,
                    }

                    this.$emit('add-todo', newTodo);
                    this.title = '';
                }
            }
        }
    }
</script>