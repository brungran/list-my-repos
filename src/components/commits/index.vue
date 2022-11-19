<template>
    <RouterLink to="/">Go back</RouterLink>
    <div v-if="this.commits.length > 0">
        <div>
            <button @click="commits = alphabetical">Alphabetical Order</button>
        </div>
        <div>
            <button @click="commits = orderByDate">Order by Date</button>
        </div>
        <h3>Commits fetched:</h3>
        <table>
            <th>Message</th>
            <th>Date and Time</th>
            <th>Author</th>
            
            <tr :key="commit.id" v-for="commit in commits">
                <Commit :commit="commit" />
            </tr>
        </table>
    </div>
    <h3 v-else> No commits from {{currentUser}} found on this repository.</h3>

    <Pagination v-if="lastPage !==null" :currentPage="currentPage" :lastPage="lastPage" @page-click="fetchAnotherPage" />
</template>

<script>
    import Commit from '@/components/commits/Commit.vue'
    import Pagination from '@/components/Pagination.vue'
    import { useCommitStore } from '@/stores/CommitStore'
    import { useRoute } from 'vue-router';
    
    const commitStore = useCommitStore()
    
    export default{
        data(){
            return{
                commits: []
            }
        },
        setup(){
            return{
                route: useRoute()
            }
        },
        async created(){
            await commitStore.list(this.route.params.name)
            this.commits = commitStore.all //getter that maps through the state to convert dates
        },
        components:{
            Commit,
            Pagination
        },
        computed:{
            alphabetical(){
                let alphabetical = this.commits
                alphabetical = alphabetical.sort((a,b) => {
                    if(a.commit.message.toLowerCase() < b.commit.message.toLowerCase()) return -1
                    if(a.commit.message.toLowerCase() > b.commit.message.toLowerCase()) return 1
                    return 0
                })
                return alphabetical
            },
            orderByDate(){
                let orderByDate = this.commits
                orderByDate = orderByDate.sort((a,b) => {
                    if(a.commit.author.date > b.commit.author.date) return -1
                    if(a.commit.author.date < b.commit.author.date) return 1
                    return 0
                })
                return orderByDate
            },
            lastPage(){
                return commitStore.lastPage
            },
            currentPage(){
                return commitStore.currentPage
            },
            currentUser(){
                return import.meta.env.VITE_GITHUB_USER
            }
        },
        methods: {
            async fetchAnotherPage(page){
                if(this.currentPage !== page){
                    await commitStore.list(this.route.params.name, page)
                    this.commits = commitStore.all
                }
            }
        }
    }
</script>