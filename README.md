# Web-component 學習筆記

個人學習 Web Component 筆記紀錄，VNode 是另一個自己練習用的套件

```js
// 字串轉 DOM
const getNode = str => {
  return new DOMParser().parseFromString(str, 'text/html').body.childNodes[0];
}

// 動態生成 template 元素
// 注意 html 必須只有一個根節點
function createTemp(id, html) {
  if (getTemp(id)) return;
  let temp = document.createElement('template');
  temp.setAttribute('id', id);
  temp.content.appendChild(getNode(html));
  return document.body.insertAdjacentElement('afterbegin', temp);
}

// 複製提取使用 template 
function getTemp(id) {
  let temp = document.getElementById(id);
  if (temp === null) return;
  let content = temp.content.cloneNode(true);
  return content;
}


// 自定義 Custom Element
class HelloWorld extends HTMLElement {
  constructor() {
    // 繼承 HTMLElement proto
    super();

    // 啟用 shadow dom 功能
    // 會在指定節點下產生 shadowRoot，append東西需給這個 root
    const shadow = this.attachShadow({ mode: 'open' });

    // 產生模板(若還沒有模板，避免重複生成)
    let tempName = 'hello-world-temp';
    if (!getTemp(tempName)) {
      createTemp('hello-world-temp', `
        <div>
          <h3>Title</h3><p>this is Cool!!!!</p>
        </div>
      `);
    }
    
    // 取得模板內容
    let temp = getTemp(tempName);

    // 設置組件 CSS
    let style = new VNode('style', {
      children: [`
        h3 {
          color: red;
          border-bottom: 2px solid black;
        }
      `]
    })

    shadow.appendChild(style.node);
    shadow.appendChild(temp);
  }
}

// 呼叫定義組件
customElements.define('hello-world', HelloWorld);
```