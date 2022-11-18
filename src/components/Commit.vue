<template>
    <td>{{commit.commit.message}}</td>
    <td>{{commit.commit.author.date}}</td>
    <td>{{commit.commit.author.name}}</td>
</template>

<script setup>
const props = defineProps({
    commit: Object
})
</script>