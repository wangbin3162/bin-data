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
      handleDragStart: function (component, event) {
        console.log(event)
        console.log('handleDragStart', component.name)
        // 拖拽的节点数据
        let nodeInfo = {
          // 唯一标识
          id: 'node-' + ((new Date()).getTime()),
          component: component,
          props: {},
          slots: {},
          options: {},
          innerHTML: 'node'
        }
        event.dataTransfer.setData('node', JSON.stringify(nodeInfo))
        console.log(event)
        console.log('handleDragStart nodeInfo', nodeInfo)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .drag-list-menu {
    padding: 5px;
    .list-group {
      margin-bottom: 10px;
      .list-group-header {
        line-height: 30px;
        font-size: 14px;
        padding-left: 28px;
        color: #999;
      }
      .list-group-body {
        .list-item {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 14px 24px 14px 34px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          span {
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
          }
          &:hover {
            background: #f3f3f3;
          }
        }
      }
    }
  }
</style>
