<template>
    <h3>Repos fetched:</h3>
    <div :key="repo.id" v-for="repo in repoStore.repos">
        <Repo :repo="repo" />
    </div>
</template>

<script setup>
    import Repo from '@/components/Repo.vue'
    import { useRepoStore } from '@/stores/RepoStore'

    const repoStore = useRepoStore()

    repoStore.list()
</script>