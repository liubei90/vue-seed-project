<script>
import { createRandomNumber } from 'common/unit.js';

/**
 * 拖拽组件，会使用dragList作为数据源，使用作用域插槽传递来的模板渲染数据源中的数据。
 * 每个数据源子项的根节点会被自动设置成可拖拽。
 * groupTag标识用来区分那些拖拽组件可以相互拖拽子元素。
 * groupId是拖拽组件的唯一标识，外部不传递的时候内部会自动生成一个随机字符串。
 * transition 为true时显示交换子项时的动画, nodeKey必填
 * nodeKey 子项通过该字段做唯一性标识，可以是ID之类的key
 * interchange 为true时，当drop事件发生，被drag的数据和hover的数据会进行自动的交换（仅限同一个group中的数据）。 nodeKey必填
 *
 *
 * 组件统一出发drag事件，具体事件类型在data中的type来区分
 *
 * data的格式如下：
 * {
 *    type, // drag_start, hover_change, drop, drag_enter, drag_leave
 *    data, // 在 hover_change、drop 事件发生时存在, 当前被拖拽的数据的副本
 *    hoverData, // 在 drop 事件发生时存在，当前鼠标悬停所在元素的数据
 *    from,
 *    to,
 *    sameTag,
 *    isSelf,
 *    xVector: 0, // 在 hover_change 事件发生时存在，当前event.clientX和上次的差值
 *    yVector: 0, // 在 hover_change 事件发生时存在，当前event.clientY和上次的差值
 * }
 *
 * drag_leave: 当前组件中的子元素开始被拖拽时触发，同时设置data为被拖拽元素的数据项
 * drop: 有被拖拽的元素放置到当前组件中，同时设置data是被拖拽元素的数据项的拷贝。设置hoverData为drop事件时鼠标所悬浮的数据项， 设置isSelf表明该次拖拽的起点是否为当前drag-group组件
 * hover_change: 被拖拽的元素悬浮的位置（对应当前组件的数据子项）发生改变时触发。设置from为前一个悬浮所在的数据，to为当前悬浮所在的数据子项。设置sameTag表明groupTag是否一致
 * drag_enter: 元素被拖拽到当前组件时触发
 * drag_leave: 元素被拖拽出当前组件时触发
 */
export default {
  props: {
    transition: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String,
      default: ''
    },
    groupTag: {
      type: String,
      default: ''
    },
    groupId: {
      type: String,
      default: ''
    },
    dragList: {
      type: Array,
      default () {
        return [];
      }
    },
    interchange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dragHover: false, // 判断当前group是否有被拖拽的对象（自身dragList的对象或者其他组件中被拖拽过来的对象）
      hoverData: null,
      innerId: createRandomNumber(),
      clientX: 0,
      clientY: 0,
    };
  },
  computed: {
    DNDType() {
      return `text/x-bell-${this.groupTag}`;
    },
    innerIdType() {
      return 'text/x-bell-innerId';
    }
  },
  render (h) {
    const DNDType = this.DNDType;
    const innerIdType = this.innerIdType;
    const innerId = this.innerId;
    const nodeKey = this.nodeKey;
    const children = this.dragList.map((item, index) => {
      // 2.1.0版本中child返回的是数组（可能是因为在组件中使用了template做作用域插槽的根节点）
      const child = this.$scopedSlots.default({ item, index })[0];
      const attrs = child.data.attrs || (child.data.attrs = {});

      // 设置直接子元素可拖动
      attrs.draggable = true;

      // child的key可以在插槽内自行设置
      if (nodeKey && !child.key) {
        child.key = item[nodeKey] || '';
      }
      return child;
    });


    let reallyParent = null;
    const data = {};

    data.on = {
      dragstart: event => {
        const target = event.target;
        const dragData = this.getDataByTarget(target, reallyParent);

        if (dragData) {
          event.dataTransfer.setData(DNDType, JSON.stringify(dragData));
          event.dataTransfer.setData(innerIdType, innerId);
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

        const target = event.target;
        const dragData = this.getDataByTarget(target, reallyParent);

        this.dragOver(event, dragData);
      },
      drop: event => {
        event.preventDefault();
        event.stopPropagation();

        this.drop(event);
      },
      dragenter: event => {
        this.dragEnter(event);
      },
      dragleave: event => {
        this.dragLeave(event);
      }
    };

    let res;
    if (this.transition && nodeKey) {
      const group = h('transition-group', {
        props: {
          tag: 'div',
          name: 'drag-list'
        }
      }, children);

      reallyParent = group;
      res = h('div', data, [ group ]);
    } else {
      res = h('div', data, children);
      reallyParent = res;
    }
    return res;
  },
  created () {
    this.initGroupId();
  },
  watch: {
    groupId () {
      this.initGroupId();
    }
  },
  methods: {
    initGroupId () {
      if (this.groupId) {
        this.innerId = this.groupId;
      }
    },
    getDataByTarget(elm, reallyParent) {
      // 通过消息的target元素获取list的子项数据
      // vnode对应的元素如果是组件，且vnode的子元素也是组件时。子元素的vnode存在于vnode.componentInstance.$children.$vnode
      // vnode对应的元素如果是组件，且vnode的子元素是普通HTML元素时。子元素的vnode存在于vnode.componentOptions.children
      // vnode对应的元素是普通html元素时，子元素的vnode存在于vnode.children
      // 当添加动画效果时，会将children包裹在transition-group组件中，此时需要找vnode.componentInstance.$children.$vnode或者vnode.componentOptions.children
      // fixme: 在有动画效果时，如果取的是vnode.componentOptions.children，在第一次render之后该值存在，之后的render中该值不存在（暂时猜测是transition-group造成的）
      // 拿到运行期的children，render函数中只能拿到reallyParent，且reallyParent的组件实例未创建
      const dragList = this.dragList;
      const nodeKey = this.nodeKey;

      let i;

      if (reallyParent &&
        (reallyParent.children ||
        ((i = reallyParent.componentInstance) && (i = i.$children) && i.length) ||
        ((i = reallyParent.componentOptions) && (i = i.children) && i.length))) {
        const reallyChildren = reallyParent.children || i;

        while (elm) {
          const child = reallyChildren.filter(child => (child.elm === elm) || (child.$el === elm))[0];

          if (child) {
            const vnode = child.$vnode || child;

            if (vnode.key) {
              return dragList.filter(item => item[nodeKey] === vnode.key)[0];
            } else {
              return dragList[reallyChildren.indexOf(child)];
            }
          }
          elm = elm.parentNode;
        }
      }

      return null;
    },
    getDragData (event) {
      const DNDType = this.DNDType;
      let data = event.dataTransfer.getData(DNDType);

      try {
        data = JSON.parse(data);
      } catch (error) {}

      return data;
    },
    dragOver (event, overData) {
      const DNDType = this.DNDType;

      // 当前group存在拖拽元素悬停
      this.dragHover = true;

      let sameTag = true;
      // 如果不是同一个groupTag的，设置禁止放置标识
//      if (event.dataTransfer.types.indexOf(DNDType) === -1) {
//        event.dataTransfer.dropEffect = 'none';
//        sameTag = false;
//      }

      if (overData) {
        if (this.hoverData !== overData) {
          this.$emit('drag', {
            sameTag,
            type: 'hover_change',
            from: this.hoverData,
            to: overData,
            data: this.getDragData(event)
          });
          this.hoverData = overData;
        }
      } else if (this.hoverData) {
        this.$emit('drag', {
          sameTag,
          type: 'hover_change',
          from: this.hoverData,
          to: null,
          data: this.getDragData(event)
        });
        this.hoverData = null;
      }
    },
    drop (event) {
      const DNDType = this.DNDType;
      const innerIdType = this.innerIdType;
      const innerId = this.innerId;
      const data = this.getDragData(event);
      const hoverData = this.hoverData;
      const nodeKey = this.nodeKey;
      const dragList = this.dragList;

      if (data) {
        const orgInnerId = event.dataTransfer.getData(innerIdType);
        let sameTag = true;

        // 如果不是同一个groupTag的，设置禁止放置标识
//        if (event.dataTransfer.types.indexOf(DNDType) === -1) {
//          event.dataTransfer.dropEffect = 'none';
//          sameTag = false;
//        }

        this.$emit('drag', {
          type: 'drop',
          data,
          hoverData: this.hoverData,
          isSelf: orgInnerId == innerId,
          sameTag
        });

        if (this.interchange && hoverData && nodeKey) {
          if (data[nodeKey] === hoverData[nodeKey]) return;

          const orgData = dragList.filter(item => (item[nodeKey] === data[nodeKey]))[0];

          if (orgData) {
            const index = dragList.indexOf(orgData);
            const toIndex = dragList.indexOf(hoverData);

            dragList.splice(index, 1);
            if (index < toIndex) {
              dragList.splice(dragList.indexOf(hoverData) + 1, 0, orgData);
            } else {
              dragList.splice(toIndex, 0, orgData);
            }
          }
        }
      }
    },
    dragEnter (event) {
      const DNDType = this.DNDType;
      const target = event.target;

      // 如果不是同一个groupTag的，设置禁止放置标识
      if (event.dataTransfer.types.indexOf(DNDType) === -1) {
        event.dataTransfer.dropEffect = 'none';
      }

      if (this.$el === target) {
        if (!this.dragHover) {
          this.$emit('drag', {
            type: 'drag_enter'
          });
        }
      }
    },
    dragLeave (event) {
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
    },
  }
};
</script>

<style lang="less">
  .drag-list-move {
    transition: transform .5s;
  }
</style>
