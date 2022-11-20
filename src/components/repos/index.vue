<template>
    <div class="flex justify-items-start space-x-4 flex-start mt-10">
        <Button @click="repos = showAll">Show All Repositories</Button>
        <Button @click="repos = showActiveOnly">Show Active Repositories Only</Button>
        <Button @click="repos = showArchivedOnly">Show Archived Repositories Only</Button>
    </div>

    <input type="text" placeholder="Search" v-model="searchValue" class="w-2/3 p-1 rounded-md border-2 border-gray-500 mt-4 md:w-1/3">
    
    <div v-if="search.length > 0" class="mt-4 md:mt-10">
        <h2 class="text-xl">Current total of results: {{search.length}}</h2>
        <div class="flex flex-col mt-2 border border-gray-400 md:mt-5">
            <Repo :key="repo.id" v-for="repo in search" :repo="repo" />
        </div>
        <div class="flex justify-end space-x-2 mt-4 text-sm mr-2">
            <Pagination v-if="lastPage !==null" :currentPage="currentPage" :lastPage="lastPage" @page-click="fetchAnotherPage" />
        </div>
    </div>
    <p v-else class="mt-2">No repositories found for user: {{currentUser}}.</p>

</template>

<script>
    import Repo from '@/components/repos/Repo.vue'
    import Button from '@/components/Button.vue'
    import Pagination from '@/components/Pagination.vue'
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
            Repo,
            Button,
            Pagination
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
            },
            lastPage(){
                return repoStore.lastPage
            },
            currentPage(){
                return repoStore.currentPage
            },
            currentUser(){
                return import.meta.env.VITE_GITHUB_USER
            }
        },
        methods: {
            async fetchAnotherPage(page){
                if(this.currentPage !== page){
                    await repoStore.list(page)
                    this.repos = this.showAll
                }
            }
        }
    }
</script>