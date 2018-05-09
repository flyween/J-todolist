## vue不知道的事 
```  js
cosnt app = new Vue({
    el: '#root', // 效果等同于 app.$mount('#root')
    template: '<div>template</div>' // template在编译后会转为render的方法，最终返回要渲染的内容，该编译比较耗时。所以一般开发使用vue-loader直接编译template，使得vue生命周期中不去做template => render 的转换
})
```
 [vue两种挂载方式的区别]()

``` js
app.$options.render = () => {
    return h('div', {}, 'new render func')
}
// 给render重新赋值，render在下次重新渲染时生效
```
``` js
app.$root === app
```
``` js
app.$forceUpdate()
// app上未声明的对象属性不被监听，变化时不会引起视图变化，使用该方法可以解决，同样可以达到效果的有app.$set(obj, obj.key, val)
```
## 生命周期

``` js
beforeCreate () {} // 在实例初始化之后，数据观测和event/watcher时间配置之前被调用
created () {}  // 实例已经完成以下的配置：数据观测，属性和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，$el属性目前不可见
beforeMount () {}  // 在挂载开始之前被调用：相关的render函数首次被调用
mounted () {}  // el被新创建的vm.$el替换，并挂在到实例上去之后调用该钩子函数。如果root实例挂载了一个文档内元素，当mounted被调用时vm.$el也在文档内
activated () {} // keep-alive组件激活时调用
deactivated () {}  // keep-alive组件停用时调用
beforeDestroy () {}  // 实例销毁之间调用。在这一步，实例仍然完全可用
destroyed () {} // Vue实例销毁时调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
```
> `Props`，`methods`，`data`和`computed`的初始化都是在beforeCreated和created之间完成的
``` js
renderError (h, err) {
    return h('div', {}, err.stack)
    // h(tagName, styleObj, msg)
}
// 只提示本身组件的error，向下的子级组件的错误不提示
errorCaptured () {
    // 会向上冒泡，并且可以在正式环境使用
}
```
## computed 和 watch

## component
- `props`里声明的属性
``` js
props: {
    active: {
        type: Boolean,
        required: true,
        default () {
            return {} // default为func，用于区分多处调用时的定义值
        },
        validator (value) {
            return typeof value === 'boolean' // 验证func
        }
    }
}
```
- `extends`两种使用方法
    ``` js
    const component = {
        props: {},
        template: '',
        data () {
            return {}
        },
        mounted () {},
        methods: {}
    }
    cosnt CompVue = Vue.extends(component)

    new CompVue({
        el: '#root',
        propsData: {},
        data: {},
        mounted () {}
    })
    // 与通过component定义使用类似
    // 覆盖component的data,先执行component的mounted() ，后执行实例的mounted
    ```
    ``` js
    const component2 = {
        extends: component,
        data () {
            return {}
        },
        mounted () {}
    }
    // 先执行所继承的组件的mounted，在执行自身的mounted

    new Vue({
        components: {
            Comp: component2
        },
        template: '<Comp></Comp>'
    })
    ```
    > 在子组件中可以直接调用 this.$parent 获取到parent上的属性，但是不要直接去更改parent上的属性或方法，会引起混乱
- `provide` `inject` 主要为高阶插件/组件库提供用例
    ``` js
    const ChildComponent = {
        template: '<div>{{data.value}}</div>'
        inject: ['ctx', 'data']
    }

    const ParentComponent = {
        components: {
            ChildComponent
        },
        provide () {
            const data = {}

            Object,defineProperty(data, 'value', {
                get: () => this.value,
                enumerable: true
            })
            return {
                ctx: this,
                data
            }
        },
        data () {
            return {
                value: 11
            }
        }
    }
    ```
    > 实现父子级或者越级获取指定的parent的属性

## render 的实质
    ``` js
    const temp = {
        template: '<div ref="box"><span></span></div>',
        render (createElement) {
            return createElement('div', {
                ref: 'box'
                // style: this.style
                // on: {
                //     click: this.handleClick
                // }
                // nativeOn: {}
            },
            [
                createElement('span', {
                    // ... attrs
                }, this.value)
            ])
        }
    }
    ```
## vue-loader的配置 
 [vue-loader 选项参考](https://vue-loader-v14.vuejs.org/zh-cn/options.html)

 - `preserveWhitespace: false`  使用此选项来添加自定义编译器指令，模块或在模板标签之间丢弃空格
 - `extractCSS` vue默认不将.vue文件的style全部提取到一个css中（异步），设为 true 可以提取 (开发环境禁止使用)
 - `postcss` 为 .vue 文件指定配置
 - `cssModules: {}` [Documenation](https://vue-loader-v14.vuejs.org/zh-cn/features/css-modules.html)
 - `loaders: {}` 自定义loader
 - `preLoaders: {}` 在自定义loader之前应用的loader，比如`loaders` 中指定js使用某种loader解析，那么在`preloaders`中指定js使用另一种loader解析，将优先使用后者指定的loader解析，而后使用`loaders`中指定loader继续解析
 - `postLoaders: {}` 在自定义loader之后应用的loader  

## 路由
- router-view name

## 路由钩子
beforeRouteEnter