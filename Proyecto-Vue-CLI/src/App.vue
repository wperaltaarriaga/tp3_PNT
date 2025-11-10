<script setup>

</script>

<template>
  <div class="container-fluid">
    <div class="card">

      <div class="card-header">
        <header>
           <h2>Componente Principal (APP)</h2>
        </header>
      </div>

      <div class="card-body">
        <main>
          <Navbar/>
          <RouterView/>

        </main>
      </div>
      
    </div>
  </div>
</template>

<script>

  import Navbar from './components/Navbar.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
    },
  }

</script>

<style scoped>
  .card-header{
    background-color: #f481ea;
    color: white;
    text-align: center;
  }

</style>
