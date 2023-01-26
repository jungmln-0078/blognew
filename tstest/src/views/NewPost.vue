<template>
  <div id="section">
    <input type="text" placeholder="제목" v-model="title" />
    <input type="text" placeholder="작성자" v-model="author" />
    <editor @updateContent="updateContent" />
    <button @click="addPost">작성</button>&nbsp;<button @click="backPage">
      취소
    </button>
  </div>
</template>

<script lang="ts">
import Post from "@/type";
import Editor from "@/components/Editor.vue";
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    const store = useStore();
    const state = reactive<Post>({
      title: "",
      author: "",
      content: "",
    } as Post);
    const updateContent = (newVal: string) => {
      state.content = newVal;
    };
    const backPage = () => {
      history.go(-1);
    };
    const addPost = () => {
      let post: Post = {
        title: state.title,
        author: state.author ? state.author : "익명",
        content: state.content
      };
      store.commit("addPost", post);
    };
    return { ...toRefs(state), updateContent, addPost, backPage };
  },
});
</script>

<style>
</style>