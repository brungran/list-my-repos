<template>
    <Button>
        <RouterLink to="/">Go back</RouterLink>
    </Button>

    <div class="flex justify-items-start space-x-4 flex-start mt-5">
        <Button @click="commits = alphabetical">Order Alphabetically</Button>
        <Button @click="commits = orderByDate">Order by Date</Button>
    </div>

    <h2 class="text-xl mt-4">Current total of results: {{this.commits.length}}</h2>
    
    <div v-if="this.commits.length > 0">
        <table class="mt-4 w-full table-fixed">
            <th class="text-left" colspan="3">Message</th>
            <th class="text-right pr-1" colspan="1">Date and Time</th>
            <th class="text-left pl-1" colspan="1">Author</th>
            
            <tr :key="commit.id" v-for="commit in commits" class="hover:bg-gray-200">
                <Commit :commit="commit" />
            </tr>
        </table>
        <div class="flex justify-end space-x-2 mt-4 text-sm mr-2">
            <Pagination v-if="lastPage !==null" :currentPage="currentPage" :lastPage="lastPage" @page-click="fetchAnotherPage" />
        </div>
    </div>
    <h3 v-else class="mt-2"> No commits from {{currentUser}} found on this repository.</h3>

</template>

<script>
    import Commit from '@/components/commits/Commit.vue'
    import Button from '@/components/Button.vue'
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
            Button,
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