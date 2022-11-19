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

    <input type="text" placeholder="Search" v-model="searchValue">
    
    <h3>Repos fetched:</h3>
    <div :key="repo.id" v-for="repo in search">
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
                repos: [],
                searchValue: ''
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
            },
            search(){
                if(this.searchValue.trim().length > 0){
                    return this.repos.filter((repo) => repo.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()))
                }
                return this.repos
            }
        }
    }
</script>