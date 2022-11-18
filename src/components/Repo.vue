<template>
    <RouterLink :to="{name: 'commits', params: {name: repo.name}}">
        {{repo.name}}
    </RouterLink>
</template>

<script setup>
const props = defineProps({
    repo: Object
})
</script>