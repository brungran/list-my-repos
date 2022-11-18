<template>
    <RouterLink to="/">Go back</RouterLink>
    <h3>Commits fetched:</h3>
    <table>
        <th>Message</th>
        <th>Date and Time</th>
        <th>Author</th>
        
        <tr :key="commit.id" v-for="commit in commitStore.commits">
            <Commit :commit="commit" />
        </tr>
    </table>
</template>

<script setup>
    import Commit from '@/components/Commit.vue'
    import { useCommitStore } from '@/stores/CommitStore'
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const commitStore = useCommitStore()
    commitStore.list(route.params.name)
</script>