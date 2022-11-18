<template>
    <RouterLink to="/">Go back</RouterLink>
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
</template>

<script>
    import Commit from '@/components/Commit.vue'
    import { useCommitStore } from '@/stores/CommitStore'
    import { useRoute } from 'vue-router';
    
    const commitStore = useCommitStore()
    
    export default{
        data(){
            return{
                commits: []
            }
        },
        async created(){
            await commitStore.list(useRoute().params.name)
            this.commits = commitStore.all //getter that maps through the state to convert dates
        },
        components:{
            Commit
        },
        computed:{
            alphabetical(){
                console.log('alphabetical')
                let alphabetical = this.commits
                alphabetical = alphabetical.sort((a,b) => {
                    if(a.commit.message.toLowerCase() < b.commit.message.toLowerCase()) return -1
                    if(a.commit.message.toLowerCase() > b.commit.message.toLowerCase()) return 1
                    return 0
                })
                return alphabetical
            },
            orderByDate(){
                console.log('orderByDate')
                let orderByDate = this.commits
                orderByDate = orderByDate.sort((a,b) => {
                    if(a.commit.author.date > b.commit.author.date) return -1
                    if(a.commit.author.date < b.commit.author.date) return 1
                    return 0
                })
                return orderByDate
            },
        }
    }
</script>