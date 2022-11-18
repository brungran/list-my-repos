import { defineStore } from 'pinia'
import { Octokit } from "@octokit/core"

export const useCommitStore = defineStore('commitStore', {
  state: () => ({
    commits: []
  }),
  actions:{
    async list(repo){
      const octokit = new Octokit({
        auth: import.meta.env.VITE_SOME_KEY
      })

      const res = await octokit.request('GET /repos/'+import.meta.env.VITE_GITHUB_USER+'/'+repo+'/commits', {
        owner: import.meta.env.VITE_GITHUB_USER,
        repo: repo
      })


      this.commits = res.data
    }
  }
})
