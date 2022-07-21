<template>
  <section class="todos">
    <TodoList />
  </section>
</template>

<script>
import TodoList from './TodoList.vue'

import './Todo.scss';

export default {
    name: 'TodosComponent',
    components: {
      TodoList,
    }
}
</script>