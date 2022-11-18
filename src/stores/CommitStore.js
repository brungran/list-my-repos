import { defineStore } from 'pinia'
import { Octokit } from "@octokit/core"

export const useCommitStore = defineStore('commitStore', {
  state: () => ({
    commits: []
  }),
  getters:{
    all(){
      return this.commits.map((commit) => {
        let date = new Date(commit.commit.author.date)
        // let formattedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        let formattedDate = date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        return {
          ...commit,
          "commit":{
            ...commit.commit,
            "author":{
              ...commit.commit.author,
              "date": formattedDate
            },
            "committer":{
              ...commit.commit.committer,
              "date": formattedDate
            }
          }
        }
      })
    }
  },
  actions:{
    async list(repo){
      const octokit = new Octokit({
        auth: import.meta.env.VITE_SOME_KEY
      })

      try {
        const res = await octokit.request('GET /repos/'+import.meta.env.VITE_GITHUB_USER+'/'+repo+'/commits', {
          owner: import.meta.env.VITE_GITHUB_USER,
          repo: repo
        })
        if(res.status === 200) this.commits = res.data
      } catch (error) {
        this.commits = []
        return error
      }
    }
  }
})
