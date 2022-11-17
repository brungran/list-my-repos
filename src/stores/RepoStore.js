import { defineStore } from 'pinia'
import { Octokit } from "@octokit/core"

export const useRepoStore = defineStore('repoStore', {
  state: () => ({
    repos: []
  }),
  actions:{
    async list(){
      const octokit = new Octokit({
        auth: import.meta.env.VITE_SOME_KEY
      })

      const res = await octokit.request('GET /users/'+import.meta.env.VITE_GITHUB_USER+'/repos', {
        username: import.meta.env.VITE_GITHUB_USER,
        type: 'all'
      })


      this.repos = res.data
    }
  }
})
