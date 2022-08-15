<template>
  <div class="app-layout">
    <div class="content">
      <IndexHome />
    </div>
  </div>
</template>

<script>
import IndexHome from "@/views/Index";

export default {
  name: "AppLayout",
  components: {
    IndexHome,
  },
};
</script>
