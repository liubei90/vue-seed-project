import Vue from 'vue';
import ViewComponent from './ViewComponent';

let zIndex = 10;
const instances = [];

export const openView = function (options, data) {
  const instance = {};

  const vm = new Vue({
    render (h) {
      return h(ViewComponent, {
        props: {
          componentOptions: options,
          componendData: data
        },
        on: {
          close () {
            closeView(instance);
          }
        }
      });
    }
  });
  const element = vm.$mount().$el;
  element.style.zIndex = zIndex++;

  instance.vm = vm;
  instance.element = element;

  instances.push(instance);

  document.querySelector('body').appendChild(element);
  return instance;
};

export const closeView = function (instance) {
  const index = instances.indexOf(instance);
  if (index > -1) {
    instances.splice(index, 1);
  }
  document.querySelector('body').removeChild(instance.element);
};
