import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 0,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: "title", name: "По названию"},
            {value: "body", name: "По описанию"},
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, posts) {
            state.isPostsLoading = posts
        },
        setSelectedSort(state, posts) {
            state.selectedSort = posts
        },
        setSearchQuery(state, posts) {
            state.searchQuery = posts
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit("setLoading", true)
                setTimeout(async () => {
                    var responce = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    })
                    commit("setTotalPages", Math.ceil(responce.headers['x-total-count'] / state.limit))
                    commit("setPosts", responce.data)
                    commit("setLoading", false)
                }, 1000)
            } catch (e) {
                console.log(e)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit("setPage", state.page + 1)
                var responce = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                })
                commit("setTotalPages", Math.ceil(responce.headers['x-total-count'] / state.limit))
                commit("setPosts", [...state.posts, ...responce.data])
            } catch (e) {
                console.log(e)
            }
        },
    },
    namespaced: true
}