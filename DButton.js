
// 2: 初始化 template 并实现自定义元素的样式和结构
const template = document.createElement('template');

template.innerHTML = `
    <style type="text/css">
    .container{
        padding: 8px;
    }
    button {
        width: 200px;
        height: 40px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        color: #606266;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        background-color: #409eff;
        border-color: #409eff;
    }
    </style>
    <div class="container">
    <button>默认按钮</button>
    </div>
`

// 创建一个 button类
class Button extends HTMLElement {
    constructor() {
        super(); // super 必须调用

        this._shadowRoot = this.attachShadow({ mode: 'open' }); // 生成一个shadow root
        this._shadowRoot.appendChild(template.content.cloneNode(true)); // 将_shadowRoot添加到template节点上
        
        this.$container = this._shadowRoot.querySelector('.container');
        this.$button = this._shadowRoot.querySelector('button')

        this.$button.addEventListener('click', () =>{ // 4: 给自定义按钮元素注册事件
            this.dispatchEvent(
                new CustomEvent('onCustomClick', {
                    detail: '设置点击回调>>>>>'
                })
            )
        })
    }

    static get observedAttributes() {
        return ['text']
    }

    get text() {
        return this.getAttribute('text')
    }

    set text(val) {
        this.setAttribute('text', val)
    }
    // 生命周期 当 custom element首次被插入文档DOM时，被调用
    connectedCallback(){
        console.log('初始化button6868')
    }
    // 另外还有
    // disconnectedCallback 当 custom element从文档DOM中删除时，被调用
    // adoptedCallback 当 custom element被移动到新的文档时，被调用

    render () {
        this.$button.innerHTML = this.text;
    }

    attributeChangedCallback(name, oldVal, newVal) { // 生命周期 当 custom element增加、删除、修改自身属性时，被调用
        this.render()
    }
    // 3: 用attributeChangedCallback 和 observedAttributes实现属性的传递，
    // 再通过getter和setter实现属性的映射
}

// 1: 注册自定义组件
window.customElements.define('d-button', Button); 
// const DButtonEl = document.querySelector('d-button') // 获取按钮dom
// DButtonEl.text = '你好啊 wb'

// DButtonEl.onClick = (val) =>{
//     console.log(val,'val 99')
// }

export default {
    Button
}