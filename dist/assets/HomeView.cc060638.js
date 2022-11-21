import{o,c as g,w as h,a as d,t as f,r as p,d as w,b as u,e as i,f as _,g as y,v as b,F as x,h as k,i as O}from"./index.f2a4e3ff.js";import{O as R,_ as V,B,P as A}from"./index.8d0c2292.js";const C={__name:"Repo",props:{repo:Object},setup(e){return(t,c)=>{const s=p("RouterLink");return o(),g(s,{to:{name:"commits",params:{name:e.repo.name}},class:"border border-gray-300 p-1 hover:bg-gray-200"},{default:h(()=>[d(f(e.repo.name),1)]),_:1},8,["to"])}}},E=w("repoStore",{state:()=>({repos:[],lastPage:null,currentPage:null}),getters:{archived(){return this.repos.filter(e=>e.archived)},active(){return this.repos.filter(e=>!e.archived)}},actions:{async list(e=1){const c=await new R({auth:{VITE_GITHUB_USER:"brungran",VITE_GITHUB_AUTH_TOKEN:"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",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}.VITE_SOME_KEY}).request("GET /users/brungran/repos",{username:"brungran",type:"all",per_page:10,page:e});if(c.headers.link){const s=c.headers.link.split(",").filter(n=>n.includes('rel="last"'))[0];s&&(this.lastPage=Number(s.substr(s.indexOf("&page=")+6,s.indexOf(">")-(s.indexOf("&page=")+6))))}this.currentPage=Number(e),this.repos=c.data}}}),a=E(),S={data(){return{repos:[],searchValue:""}},async created(){await a.list(),this.repos=a.repos},components:{Repo:C,Button:B,Pagination:A},computed:{showAll(){return a.repos},showActiveOnly(){return a.active},showArchivedOnly(){return a.archived},search(){return this.searchValue.trim().length>0?this.repos.filter(e=>e.name.toLowerCase().includes(this.searchValue.trim().toLowerCase())):this.repos},lastPage(){return a.lastPage},currentPage(){return a.currentPage},currentUser(){return"brungran"}},methods:{async fetchAnotherPage(e){this.currentPage!==e&&(await a.list(e),this.repos=this.showAll)}}},N={class:"flex justify-items-start space-x-4 flex-start mt-10"},T={key:0,class:"mt-4 md:mt-10"},U={class:"text-xl"},L={class:"flex flex-col mt-2 border border-gray-400 md:mt-5"},D={class:"flex justify-end space-x-2 mt-4 text-sm mr-2"},I={key:1,class:"mt-2"};function j(e,t,c,s,n,r){const m=p("Button"),P=p("Repo"),v=p("Pagination");return o(),u(x,null,[i("div",N,[_(m,{onClick:t[0]||(t[0]=l=>n.repos=r.showAll)},{default:h(()=>[d("Show All Repositories")]),_:1}),_(m,{onClick:t[1]||(t[1]=l=>n.repos=r.showActiveOnly)},{default:h(()=>[d("Show Active Repositories Only")]),_:1}),_(m,{onClick:t[2]||(t[2]=l=>n.repos=r.showArchivedOnly)},{default:h(()=>[d("Show Archived Repositories Only")]),_:1})]),y(i("input",{type:"text",placeholder:"Search","onUpdate:modelValue":t[3]||(t[3]=l=>n.searchValue=l),class:"w-2/3 p-1 rounded-md border-2 border-gray-500 mt-4 md:w-1/3"},null,512),[[b,n.searchValue]]),r.search.length>0?(o(),u("div",T,[i("h2",U,"Current total of results: "+f(r.search.length),1),i("div",L,[(o(!0),u(x,null,k(r.search,l=>(o(),g(P,{key:l.id,repo:l},null,8,["repo"]))),128))]),i("div",D,[r.lastPage!==null?(o(),g(v,{key:0,currentPage:r.currentPage,lastPage:r.lastPage,onPageClick:r.fetchAnotherPage},null,8,["currentPage","lastPage","onPageClick"])):O("",!0)])])):(o(),u("p",I,"No repositories found for user: "+f(r.currentUser)+".",1))],64)}const H=V(S,[["render",j]]),M=i("h1",{class:"text-center text-5xl"},"List My Repos",-1),F={computed:{currentUser(){return"brungran"}}},K=Object.assign(F,{__name:"HomeView",setup(e){return(t,c)=>(o(),u(x,null,[M,_(H)],64))}});export{K as default};
