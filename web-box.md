# Web-Box.js

將基礎 Web-Component 重要特性封裝而成的簡單套件，包括 template, shadow 這兩個重要特性，

Custom Element 本次沒有封裝，只著重在一般 Shadow 和 Template 的交互使用。

## Usage

在指定DOM 中，動態渲染組建，內建使用 DOMParser 轉換字串為 DOM，或也可以使用下面介紹的方法定義 template。

```html
<div id="app"></div>
```

```js
const app = new Box('#app', {
  template: '<p>Hello world</p>',
  style: 'div{color: red;}',
  shadow: true
});
```

- createTemp(id, text)

可以動態在頁面中插入 template，需在使用前定義

```js
Box.createTemp('app-temp', '<p>Hello World</p>');
```

- getTemp(id)

可以在創建template過後，複製出template內容，需在獲取前定義 template

```js
let appContent = Box.getTemp('app-temp');
```

或者獲取後給 Box 使用，改寫上面

```js
const app = new Box('#app', {
  template: Box.getTemp('app-temp'),
  // ...
});
```

- createStyle(id, text)

當需要復用相同 styles 時，可以使用此方法定義 CSS 字串儲存在全局 Box 的 styles 屬性中。

```js
Box.createStyle('appStyle', 'div{color: red;}');

Box.styles.appStyle
// div{color: red;}
```

並將該字串帶入Box 組件裡

```js
const app = new Box('#app', {
  style: Box.styles['appStyle']
  // ...
});
```

## Shadow 屬性

可以定義 Shadow 屬性給 Box 指定的組件，該組件會套用 attachShadow 。(預設為 false)

```js
const app = new Box('#app', {
  shadow: true,
  // ...
});
