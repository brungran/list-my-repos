<template>
    <div>
        <button @click="repos = showAll">Show all repos</button>
    </div>
    <div>
        <button @click="repos = showActiveOnly">Show active repos only</button>
    </div>
    <div>
        <button @click="repos = showArchivedOnly">Show archived repos only</button>
    </div>

    <h3>Repos fetched:</h3>
    <div :key="repo.id" v-for="repo in repos">
        <Repo :repo="repo" />
    </div>
</template>

<script>
    import Repo from '@/components/Repo.vue'
    import { useRepoStore } from '@/stores/RepoStore'
    const repoStore = useRepoStore()
    
    export default{
        data(){
            return{
                repos: []
            }
        },
        async created(){
            await repoStore.list()
            this.repos = repoStore.repos
        },
        components:{
            Repo
        },
        computed:{
            showAll(){
                return repoStore.repos
            },
            showActiveOnly(){
                return repoStore.active
            },
            showArchivedOnly(){
                return repoStore.archived
            }
        }
    }
</script>