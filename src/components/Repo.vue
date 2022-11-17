<template>
    <p>{{repo.name}}</p>
</template>

<script setup>
const props = defineProps({
    repo: Object
})
</script>