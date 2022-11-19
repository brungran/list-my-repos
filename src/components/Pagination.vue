<template>
    <button @click="$emit('pageClick', 1)">
        <b v-if="currentPage === 1">First</b>
        <span v-else>First</span>
    </button>
    <button @click="$emit('pageClick', currentPage - 1)">
        Previous
    </button>
    <button
        v-for="page in (currentPage + 4 <= lastPage ? currentPage + 4 : lastPage)"
        v-show="
            (page <= currentPage + 2 || (page <= currentPage + 3 && currentPage === 2) || (page <= currentPage + 4 && currentPage === 1)) &&
            (page >= currentPage - 2 || (page >= currentPage - 3 && currentPage === 7) || (page >= currentPage - 4 && currentPage === 8))
        "
        @click="$emit('pageClick', page)"
    >
        <b v-if="page === currentPage">{{page}}</b>
        <span v-else-if="page">{{page}}</span>
    </button>
    <button @click="$emit('pageClick', currentPage + 1)">
        Next
    </button>
    <button @click="$emit('pageClick', lastPage)">
        <b v-if="currentPage === lastPage">Last</b>
        <span v-else>Last</span>
    </button>
    <p>Last page: {{lastPage}}</p>
</template>

<script>
    export default{
        emits:[
            'pageClick'
        ],
        props:{
            currentPage: Number,
            lastPage: Number
        }
    }
</script>