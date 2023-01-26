<template>
  <div id="section">
    <p>
      <input type="text" v-model="filterStr" placeholder="검색" />
    </p>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="45%" />
        <col width="20%" />
        <col width="25%" />
      </colgroup>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일자</th>
      </tr>
      <tr
        v-for="(post, idx) in posts"
        :key="idx"
        @click="routerLink(`/posts/${post.id}`)"
        style="cursor: pointer"
      >
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.author }}</td>
        <td>{{ post.createdate }}</td>
      </tr>
    </table>
    <button><router-link to="/posts/new">작성하기</router-link></button>
  </div>
</template>

<script lang="ts">
import Post from "@/type";
import { useStore } from "vuex";
import axios from "axios";
import {
  ref,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watchEffect,
} from "vue";
import router from "@/router";
export default defineComponent({
  setup() {
    const state = reactive({ posts: [] as Array<Post> });
    const store = useStore();
    const filterStr = ref();
    watchEffect(() => {
      if (filterStr.value) {
        let filteredPosts: Array<Post> = [];
        store.state.posts.map((p: Post) => {
          if (
            p.title.includes(filterStr.value) ||
            p.content.includes(filterStr.value) ||
            p.author.includes(filterStr.value)
          ) {
            filteredPosts.push(p);
          }
        });
        state.posts = filteredPosts;
      } else {
        axios.get("http://localhost:5000/post").then((res) => {
          store.commit("getPostList", res.data);
          state.posts = store.state.posts;
        });
      }
    });
    const routerLink = (href: string) => {
      router.push(href);
    };
    onMounted(() => {
      axios.get("http://localhost:5000/post").then((res) => {
        store.commit("getPostList", res.data);
        state.posts = store.state.posts;
      });
    });
    return { ...toRefs(state), filterStr, routerLink };
  },
});
</script>