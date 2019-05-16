<template>
  <div class="drag-list-menu">
    <div class="list-group"
         v-for="category in dragList"
         :key="category.type"
         :title="category.title"
    >
      <div class="list-group-header">{{ category.title }}</div>
      <div class="list-group-body">
        <div
          class="list-item"
          v-for="component in category.children"
          :key="component.name"
          :name="component.name"
          draggable="true"
          @dragstart="handleDragStart(component, $event)"
        >
          <b-icon :name="component.icon"></b-icon>
          <span> {{ component.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DragList',
    props: {
      dragList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      handleDragStart (component, event) {
        this.$print('drag start:' + component.name, 'primary')
        // 拖拽的节点数据
        let nodeInfo = {
          // 唯一标识
          id: 'node-' + ((new Date()).getTime()),
          components: component,
          props: {},
          slots: {},
          options: {},
          innerHTML: 'node'
        }
        event.dataTransfer.setData('node', JSON.stringify(nodeInfo))
        this.$print('drag nodeInfo', 'success')
        this.$print(nodeInfo)
      }
    }
  }
</script>
