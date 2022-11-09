<script setup lang="ts">
const bool = ref(false)

const select = ref()

const date = ref()

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <h1>wc-example</h1>
  <el-button type="primary">Primary Button</el-button>
  <el-switch v-model="bool" />

  <el-select v-model="select" placeholder="Select" :teleported="false">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>

  <el-dialog v-model="bool" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="bool = false">Cancel</el-button>
        <el-button type="primary" @click="bool = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-time-picker v-model="date" placeholder="Arbitrary time" :teleported="false" />
</template>

<style scoped>
h1 {
  color: aqua;
}
</style>
