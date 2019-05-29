<template>
  <div class="drag-list-menu" flex="cross:center">
    <div class="list-group" :class="{'hovered':hovered}"
         v-for="category in dragList"
         :key="category.type"
    >
      <div class="list-group-header"
           @mouseenter="hovered=true" @mouseleave="hovered=false">
        <b-icon v-if="category.icon" :name="category.icon" size="18"></b-icon>
        <span v-else>{{ category.title }}</span>
      </div>
      <div class="list-group-body" flex v-show="hovered" @mouseenter="hovered=true" @mouseleave="hovered=false">
        <div class="left"><span>{{ category.title }}</span></div>
        <div class="right">
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
    data () {
      return {
        hovered: false
      }
    },
    methods: {
      handleDragStart (component, event) {
        this.$print('drag start:' + component.name, 'primary')
        // 拖拽的节点数据
        let nodeInfo = {
          // 唯一标识
          id: 'node-' + ((new Date()).getTime()),
          packageJson: { ...component }
        }
        event.dataTransfer.setData('node', JSON.stringify(nodeInfo))
        this.$print('drag nodeInfo', 'success')
        this.$print(nodeInfo)
      }
    }
  }
</script>
