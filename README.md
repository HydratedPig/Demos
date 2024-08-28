# Demos

哦，这是掌管 `Demo` 的 `README.md`

## Babel Ignore

这个 `demo` 是在读 `@babel/core` 源码时，没找到为啥 `.babelignore` 生效了，也没找到相关说明写的一个 `demo` 来给 `babel` 官方团队提 `issue` 用的

`issue` 地址[点这里](https://github.com/babel/babel/issues/16152)<br/>
`issue` 解决地址[点这里](https://github.com/babel/website/pull/2854/files)<br/>
`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/babel-ignore)

## Vue OOM

这个 `demo` 是团队遇到 `ssr` 渲染时发生 `oom` 定位 `oom` 的 `demo`，问题定位到是 `vue` 小于 `3.4.0` 的版本 `computed` 无缓存带来的问题，两个解决方法

1. `i18n.t` 在 `setup` 顶层 `await` 之前执行
2. 升级到 `vue@^3.4.0`

团队采用了第一种方案，主要是因为团队内还在用 `typescript@^4.9.0` 升级 `nuxtjs` 会有较多装饰器问题，同时出现这种问题的模块比较少，并且这个 `ssr` 项目处于没有大更新，只有小维护的一个状态

`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/main/vue-oom/core)

## cjs x esm

缘起于这篇文章[《CommonJS 和 ES Module 终于要互相兼容了？？？》](https://mp.weixin.qq.com/s/0_JtlCDOgF6Q_7dWDFtXAw)，看看 在 `esm` 中分别 `import` `cjs` 和 `esm` 有什么区别

为了方便在一个项目里完成 `demo` 使用了 `pnpm` 的 `monorepo`

`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/main/cjs-esm/core)

## webpack-loader

尝试下 webpack-loader ，同时测试下，如何把文件内容缓存并将多个文件作为另外一个文件打包

`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/main/webpack/core)

## swc-tsc

突发奇想，如果把 `vue-cli` 中 `ts-loader` 替换成 `swc` 会怎么样？

Q: 为什么只替换`ts-loader` 而不是把 `babel-loader` 一起替换了？<br/>
A: 团队 `vue-cli` 启用的 `vue3` 项目用到了 [`babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx) 替换成本太高

Q: 为什么不直接用 `vite`?<br/>
A: [`babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx) 在 `vite` 里有对等的 [`plugin-vue-jsx`](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)，直接升级 `vite` 似乎是个不错的主意，但是 `vite` 在 `build` 时依然是用 `nodejs` 进行的，本质没有啥大的区别，尤大的 `rolldown` 出来或许可以考虑升级一波 `vite`。不过，远水不解近渴

Q: 这个提效多少呢?<br/>
A: 还不清楚，demo 还没写呢！

尴尬了，`swc build` 产物和 `typescript` 不一致，`typescript` 可以配置 `"jsx": "preserve",` 但是 `swc` 没找到类似的功能，强行向 `react` 靠拢了，得看看 `rspack` 是如何解决 `vue-loader` 的问题了

`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/main/swc-tsc)