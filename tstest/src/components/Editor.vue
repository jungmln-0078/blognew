<template>
  <div class="editor-wrapper">
    <vue-editor v-model="editorContent"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import { ref, computed, defineComponent, onUpdated } from "vue";

export default defineComponent({
  name: "Editor",
  components: {
    VueEditor,
  },
  props: {
    contentProp: String,
  },
  setup(props, context) {
    const content = ref(null);
    const editorContent = computed({
      get() {
        return content.value;
      },
      set(updatedContent) {
        content.value = updatedContent;
        context.emit("updateContent", updatedContent);
      },
    });
    onUpdated(() => {
      if (props.contentProp) {
        editorContent.value = props.contentProp;
      }
    });
    return { content, editorContent };
  },
});
</script> 