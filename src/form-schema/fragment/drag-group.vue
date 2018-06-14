<script>
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
      const child = children.filter(child => child.elm === elm)[0];

      if (child) {
        return dragList[children.indexOf(child)];
      }
      return null;
    }

    console.log(children);

    data.on = {
      dragstart: event => {
        const target = event.target;
        const dragData = getDataByTarget(target);

        if (dragData) {
          event.dataTransfer.setData(DNDType, JSON.stringify(dragData));
          this.$emit('drag', {
            type: 'dragstart',
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

        const target = event.target;
        const dragData = getDataByTarget(target);

        if (dragData) {
          this.$emit('drap', {
            type: 'dragover',
            data: dragData
          });
        }
      },
      drop: event => {
        event.preventDefault();
        event.stopPropagation();

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
      }
    };

    data.style = {
      minHeight: '100px',
      border: '1px dashed #9B9BB1'
    };

    return h('div', data, children);
  }
};
</script>
