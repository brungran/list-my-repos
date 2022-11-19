import { defineStore } from 'pinia'
import { Octokit } from "@octokit/core"

export const useRepoStore = defineStore('repoStore', {
  state: () => ({
    repos: [],
    lastPage: null,
    currentPage: null
  }),
  getters:{
    archived(){
      return this.repos.filter(repo => repo.archived)
    },
    active(){
      return this.repos.filter(repo => !repo.archived)
    }
  },
  actions:{
    async list(page = 1){
      const octokit = new Octokit({
        auth: import.meta.env.VITE_SOME_KEY
      })

      const res = await octokit.request('GET /users/'+import.meta.env.VITE_GITHUB_USER+'/repos', {
        username: import.meta.env.VITE_GITHUB_USER,
        type: 'all',
        per_page: 10,
        page: page
      })


      if(res.headers.link){
        const link = res.headers.link.split(',').filter((link) => link.includes('rel=\"last\"'))[0]
        if(link) this.lastPage = Number(link.substr(link.indexOf('&page=')+6, link.indexOf('>') - (link.indexOf('&page=')+6)))
      }

      this.currentPage = Number(page)
      this.repos = res.data
    }
  }
})
