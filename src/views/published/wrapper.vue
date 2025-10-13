<template>
  <published-view :key="key"></published-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PublishedView from './index.vue'

let key = ref(Date.now())

// 发布页面不需要实时同步功能，数据直接从后端获取
</script>