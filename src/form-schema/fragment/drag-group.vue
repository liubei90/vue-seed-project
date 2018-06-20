<script>
// import { throttle } from '@/utils/index.js';

export default {
  props: {
    groupTag: {
      type: String,
      default: ''
    },
    dragList: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      dragHover: false, // 判断当前group是否有被拖拽的对象（自身dragList的对象或者其他组件中被拖拽过来的对象）
      hoverData: null
    };
  },
  render (h) {
    const DNDType = `text/x-bell-${this.groupTag}`;
    const dragList = this.dragList;
    const children = this.dragList.map(item => {
      const child = this.$scopedSlots.default({ item });
      const attrs = child.data.attrs || (child.data.attrs = {});

      // 设置直接子元素可拖动
      attrs.draggable = true;
      return child;
    });
    const data = {};
    // 通过消息的target元素获取list的子项数据
    function getDataByTarget (elm) {
      while (elm) {
        const child = children.filter(child => child.elm === elm)[0];

        if (child) {
          return dragList[children.indexOf(child)];
        }
        elm = elm.parentNode;
      }
      return null;
    }

    data.on = {
      dragstart: event => {
        const target = event.target;
        const dragData = getDataByTarget(target);

        if (dragData) {
          event.dataTransfer.setData(DNDType, JSON.stringify(dragData));
          this.$emit('drag', {
            type: 'drag_start',
            data: dragData
          });
        } else {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      dragover: event => {
        event.preventDefault();
        event.stopPropagation();

        // 当前group存在拖拽元素悬停
        this.dragHover = true;

        const target = event.target;
        const dragData = getDataByTarget(target);

        if (dragData) {
          if (this.hoverData !== dragData) {
            this.$emit('drag', {
              type: 'hover_change',
              from: this.hoverData,
              to: dragData
            });
            this.hoverData = dragData;
          }
        } else if (this.hoverData) {
          this.$emit('drag', {
            type: 'hover_change',
            from: this.hoverData,
            to: null
          });
          this.hoverData = null;
        }
      },
      drop: event => {
        event.preventDefault();
        event.stopPropagation();
        this.draging = false;

        let data = event.dataTransfer.getData(DNDType);

        if (data) {
          try {
            // fixme: 此处获得的数据不是list中的子项，
            // 是某个子项（可能是当前list，或者其他group的list）的序列化后的字符串
            data = JSON.parse(data);
            this.$emit('drag', {
              type: 'drop',
              data
            });
          } catch (error) {

          }
        }
      },
      dragenter: event => {
        const target = event.target;

        if (this.$el === target) {
          if (!this.dragHover) {
            this.$emit('drag', {
              type: 'drag_enter'
            });
          }
        }
      },
      dragleave: event => {
        const target = event.target;

        // fixme: 如果元素离开速度太快，该事件可能不会被触发
        if (this.$el === target) {
          // 延时100ms,如果之后有dragover事件执行，
          // 说明这个dragleave事件为假（拖拽元素进入group的内部子元素），
          // 否者为真（拖拽元素离开group），触发drag_leave事件
          this.dragHover = false;
          setTimeout(() => {
            if (!this.dragHover) {
              this.$emit('drag', {
                type: 'drag_leave'
              });
            }
          }, 100);
        }
      }
    };

    data.style = {
      minHeight: '100px',
      border: '1px dashed #9B9BB1'
    };

    return h('div', data, children);
  },
  created () {},
  methods: {}
};
</script>
