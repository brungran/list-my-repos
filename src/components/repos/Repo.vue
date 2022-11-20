<template>
    <RouterLink :to="{name: 'commits', params: {name: repo.name}}" class="border border-gray-300 p-1 hover:bg-gray-200">
        {{repo.name}}
    </RouterLink>
</template>

<script setup>
const props = defineProps({
    repo: Object
})
</script>