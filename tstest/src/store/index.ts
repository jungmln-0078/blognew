import router from "@/router";
import axios from "axios";
import { createStore } from "vuex";
import Post from "@/type";

export default createStore({
  state: {
    posts: [] as Array<Post>,
  },
  mutations: {
    getPostList(state, payload) {
      state.posts = payload;
    },
    addPost(state, payload) {
      axios.post("http://localhost:5000/post", payload).then((res) => {
        axios.get("http://localhost:5000/post").then((res1) => {
          state.posts = res1.data;
          router.push(`/posts/${res.data.id}`);
        });
      });
    },
    editPost(state, payload) {
      axios.put(`http://localhost:5000/post/${payload.id}`, payload).then((res) => {
        axios.get("http://localhost:5000/post").then((res1) => {
          state.posts = res1.data;
          router.push(`/posts/${res.data.id}`);
        });
      });
    },
    deletePost(state, payload) {
      axios.delete(`http://localhost:5000/post/${payload.id}`).then(() => {
        axios.get("http://localhost:5000/post").then((res1) => {
          state.posts = res1.data;
          router.push(`/posts`);
        });
      });
    },
  },
  actions: {},
  modules: {},
});
