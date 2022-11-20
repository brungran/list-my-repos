<template>
    <Button @click="$emit('pageClick', 1)" :class="currentPage === 1 ? 'bg-green-400' : ''">
        <b v-if="currentPage === 1">First</b>
        <span v-else>First</span>
    </Button>

    <Button @click="$emit('pageClick', currentPage - 1)">
        Previous
    </Button>

    <Button
        v-for="page in (currentPage + 4 <= lastPage ? currentPage + 4 : lastPage)"
        v-show="
            (page <= currentPage + 2 || (page <= currentPage + 3 && currentPage === 2) || (page <= currentPage + 4 && currentPage === 1)) &&
            (page >= currentPage - 2 || (page >= currentPage - 3 && currentPage === 7) || (page >= currentPage - 4 && currentPage === 8))
        "
        @click="$emit('pageClick', page)"
        :class="page === currentPage ? 'bg-green-400' : ''"
    >
        <b v-if="page === currentPage">{{page}}</b>
        <span v-else-if="page">{{page}}</span>
    </Button>

    <Button @click="$emit('pageClick', currentPage + 1)">
        Next
    </Button>

    <Button @click="$emit('pageClick', lastPage)" :class="currentPage === lastPage ? 'bg-green-400' : ''">
        <b v-if="currentPage === lastPage">Last</b>
        <span v-else>Last</span>
    </Button>

</template>

<script>
    import Button from '@/components/Button.vue'

    export default{
        emits:[
            'pageClick'
        ],
        props:{
            currentPage: Number,
            lastPage: Number
        },
        components:{
            Button
        }
    }
</script>