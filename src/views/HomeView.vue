<template>
      <h1 class="text-center text-5xl">List My Repos</h1>
      <Repos />
</template>

<script setup>
  import Repos from '@/components/repos/index.vue'
</script>

<script>
  export default {
    computed:{
      currentUser(){
          return import.meta.env.VITE_GITHUB_USER
      }
    }
  }
</script>