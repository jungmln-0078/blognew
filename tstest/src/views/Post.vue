<template>
  <div id="section" class="post">
    <p>
      <strong>제목 : {{ title }} 작성자 : {{ author }} 작성일자 : {{ createdate }} <span v-show="isupdated">(수정됨)</span></strong>
    </p>
    <div style="text-align: left" v-html="content"></div>
    <button @click="editPost">수정</button
    ><button @click="deletePost">삭제</button>
  </div>
</template>

<script lang="ts">
import Post from "@/type";
import { useStore } from "vuex";
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "@vue/runtime-core";
import router from "@/router";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const store = useStore();
    const state = reactive<Post>({
      title: "",
      author: "",
      content: "",
      createdate: undefined,
      isupdated: undefined
    });
    const editPost = () => {
      router.push(`/posts/edit/${props.id}`);
    };
    const deletePost = () => {
      store.commit("deletePost", { id: Number(props.id) });
    };
    onMounted(() => {
      let post = store.state.posts.find((p: any) => p.id == props.id);
      state.title = post.title;
      state.author = post.author;
      state.content = post.content;
      state.createdate = post.createdate;
      state.isupdated = post.isupdated;
    });
    return { ...toRefs(state), editPost, deletePost };
  },
});
</script>

<style>
</style> 