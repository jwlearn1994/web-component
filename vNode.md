# VNode

一個簡單 Virtual Dom 的原型概念套件，使用原生的createElement來創建新node element

## Usage

創建元素，返回的是個 JS 物件，包含該元素的所有信息。

```js
let container = new VNode('div', {
  // 設置屬性
  attrs: {
    id: 'test-block',
    class: 'container fix'
  },
  // 設置子元素
  children: [
    // 文本節點
    'Hello World',
    // 元素節點(記得要提取 node 使用)
    new VNode('p', {
      children: ['Paragraph Text']
    }).node
  ]
});
```

使用 node 接口可以提取 dom，並用於其他用途。

```js
document.body.appendChild(container.node);

/*
<div id="test-block" class="container fix">
  Hello World
  <p>Paragraph Text</p>
</div>
*/
```

## Options

- attrs:

    Type: Object, 設置屬性

- children:

    Type: Text || DOM Element, 設置子元素

- shadow:

    Type: Boolean, 設置是否開啟 Shadow（Web Component屬性）

    Default: false
    