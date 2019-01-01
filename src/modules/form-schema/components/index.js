import common from './common.vue';
import commonProperty from './common-property.vue';
import componentHtml from './component-html.vue';
import componentHtmlProperty from './component-html-property.vue';

export const componentEnum = {
  COMMON: 'common',
  COMPONENT_HTML: 'component-html'
};

export const componentPropertyEnum = {
  COMMON: 'common-property',
  COMPONENT_HTML: 'component-html-property'
};

export const componentToPropertyMap = Object.keys(componentEnum)
  .reduce((map, item) => {
    if (componentPropertyEnum[item]) {
      map[componentEnum[item]] = componentPropertyEnum[item];
    }
    return map;
  }, {});

export const components = [
  { name: componentEnum.COMMON, label: '通用组件' },
  { name: componentEnum.COMPONENT_HTML, label: 'html组件' }
];

export const componentMap = {
  [componentEnum.COMMON]: common,
  [componentEnum.COMPONENT_HTML]: componentHtml
};

export const propertyComponentMap = {
  [componentPropertyEnum.COMMON]: commonProperty,
  [componentPropertyEnum.COMPONENT_HTML]: componentHtmlProperty
};

export const componentMixin = {
  components: componentMap
};

export const propertyComponentMixin = {
  components: propertyComponentMap
};
