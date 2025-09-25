<template>
  <div class="go-tables-basic">
    <n-input
      v-model:value="inputData"
      placeholder="请输入信息"
      :style="`display: ${inputShow}`"
      style="margin-bottom: 5px; float: right; width: 240px"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>
    <n-data-table
      :style="`
      width: ${w}px;
      height: ${h}px;
      font-size: ${option.style.fontSize}px;
      border-width: ${option.style.border === 'on' ? option.style.borderWidth : 0}px;
      border-color: ${option.style.borderColor};
      border-style: ${option.style.borderStyle};
      --n-color: transparent !important;
      --n-th-color: transparent !important;
      --n-td-color: transparent !important;
      --n-th-color-hover: transparent !important;
      --n-td-color-hover: transparent !important;
      --n-th-color-striped: transparent !important;
      --n-td-color-striped: transparent !important;
      background-color: transparent !important`"
      :bordered="option.style.border === 'on'"
      :single-column="option.style.singleColumn === 'on'"
      :single-line="option.style.singleLine === 'on'"
      :bottom-bordered="option.style.bottomBordered === 'on'"
      :striped="option.style.striped === 'on'"
      :max-height="h"
      size="small"
      :columns="option.dataset.dimensions"
      :data="filterData"
      :pagination="tablePagination"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, watch, reactive, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { icon } from '@/plugins'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { SearchIcon } = icon.ionicons5

//查询字段
const inputData = ref('')
//前台过滤
const filterData = computed(() => {
  return option?.dataset?.source?.filter((item: any) => {
    return Object.values(item).some(val => {
      return String(val).toLowerCase().includes(inputData.value.toLowerCase())
    })
  })
})

const { align, pagination, inputShow } = toRefs(props.chartConfig.option)

pagination.value.onChange = (page: number) => {
  pagination.value.page = page
}

const tablePagination = computed(() => {
  return pagination.value.show ? pagination.value : false
})

const { w, h } = toRefs(props.chartConfig.attr)

const option = reactive({
  dataset: props.chartConfig.option.dataset,
  style: props.chartConfig.option.style
})

watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
    option?.dataset?.dimensions?.forEach((header: any) => {
      header.align = align.value
    })
  },
  {
    immediate: true,
    deep: true
  }
)

// setdata 数据监听与更改
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})


</script>

<style lang="scss" scoped>
@include go('tables-basic') {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;

  :deep(.n-data-table) {
    background-color: transparent !important;

    .n-data-table-wrapper {
      background-color: transparent !important;
    }

    .n-data-table-base-table {
      background-color: transparent !important;
    }

    .n-data-table-th {
      background-color: transparent !important;
    }

    .n-data-table-td {
      background-color: transparent !important;
    }

    .n-data-table-tr:hover {

      .n-data-table-th,
      .n-data-table-td {
        background-color: rgba(0, 0, 0, 0.05) !important;
      }
    }

    .n-data-table-tr-striped {

      .n-data-table-th,
      .n-data-table-td {
        background-color: #56577A !important;
      }
    }
  }
}

/* Global styles to override Naive UI theming */
:global(.n-data-table) {
  background-color: transparent !important;
}

:global(.n-data-table .n-data-table-wrapper) {
  background-color: transparent !important;
}

:global(.n-data-table .n-data-table-base-table) {
  background-color: transparent !important;
}

:global(.n-data-table .n-data-table-th) {
  background-color: transparent !important;
}

:global(.n-data-table .n-data-table-td) {
  background-color: transparent !important;
}

/* Additional aggressive transparency targeting */
:global(.go-tables-basic .n-data-table),
:global(.go-tables-basic .n-data-table *),
:global(.go-tables-basic .n-data-table-wrapper),
:global(.go-tables-basic .n-data-table-base-table),
:global(.go-tables-basic .n-data-table-th),
:global(.go-tables-basic .n-data-table-td) {
  background-color: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
}
</style>
