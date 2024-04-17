# Demos

哦，这是掌管 `Demo` 的 `README.md`

## Babel Ignore

这个 `demo` 是在读 `@babel/core` 源码时，没找到为啥 `.babelignore` 生效了，也没找到相关说明写的一个 `demo` 来给 `babel` 官方团队提 `issue` 用的

`issue` 地址[点这里](https://github.com/babel/babel/issues/16152)
`issue` 解决地址[点这里](https://github.com/babel/website/pull/2854/files)
`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/babel-ignore)

## Vue OOM

这个 `demo` 是团队遇到 `ssr` 渲染时发生 `oom` 定位 `oom` 的 `demo`，问题定位到是 `vue` 小于 `3.4.0` 的版本 `computed` 无缓存带来的问题，两个解决方法

1. `i18n.t` 在 `setup` 顶层 `await` 之前执行
2. 升级到 `vue@^3.4.0`

团队采用了第一种方案，主要是因为团队内还在用 `typescript@^4.9.0` 升级 `nuxtjs` 会有较多装饰器问题，同时出现这种问题的模块比较少，并且这个 `ssr` 项目处于没有大更新，只有小维护的一个状态

`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/vue-oom)

## cjs x esm

缘起于这篇文章[《CommonJS 和 ES Module 终于要互相兼容了？？？》](https://mp.weixin.qq.com/s/0_JtlCDOgF6Q_7dWDFtXAw)，看看 在 `esm` 中分别 `import` `cjs` 和 `esm` 有什么区别

为了方便在一个项目里完成 `demo` 使用了 `pnpm` 的 `monorepo`

`demo` 地址[点这里](https://github.com/HydratedPig/Demos/tree/cjs-esm)