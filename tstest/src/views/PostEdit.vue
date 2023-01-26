<template>
  <div id="section">
    <input type="text" placeholder="제목" v-model="title" />
    <input type="text" placeholder="작성자" v-model="author" disabled />
    <editor @updateContent="updateContent" :contentProp="content" />
    <button @click="editPost">수정</button>&nbsp;<button @click="backPage">
      취소
    </button>
  </div>
</template>

<script lang="ts">
import Post from "@/type";
import Editor from "@/components/Editor.vue";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Editor,
  },
  props: {
    id: String,
  },
  setup(props) {
    const store = useStore();
    const state = reactive<Post>({
      title: "",
      author: "",
      content: ""
    });
    const updateContent = (newVal: string) => {
      state.content = newVal;
    };
    const editPost = () => {
      let post: Post = {
        id: Number(props.id),
        title: state.title,
        author: state.author,
        content: state.content,
      };
      store.commit("editPost", post);
    };
    const backPage = () => {
      history.go(-1);
    };
    onMounted(() => {
      let post = store.state.posts.find((p: any) => p.id == props.id);
      state.title = post.title;
      state.author = post.author;
      state.content = post.content;
    });
    return { ...toRefs(state), updateContent, editPost, backPage };
  },
});
</script>

<style>
</style>