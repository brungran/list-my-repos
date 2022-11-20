<template>
    <td class="border border-gray-300 p-1" colspan="3">{{commit.commit.message}}</td>
    <td class="border border-gray-300 p-1 text-right" colspan="1">{{commit.commit.author.date}}</td>
    <td class="border border-gray-300 p-1" colspan="1">{{commit.commit.author.name}}</td>
</template>

<script setup>
const props = defineProps({
    commit: Object
})
</script>