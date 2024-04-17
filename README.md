# Demos

突发奇想，如果把 `vue-cli` 中 `ts-loader` 替换成 `swc` 会怎么样？

Q: 为什么只替换`ts-loader` 而不是把 `babel-loader` 一起替换了？<br/>
A: 团队 `vue-cli` 启用的 `vue3` 项目用到了 [`babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx) 替换成本太高

Q: 为什么不直接用 `vite`?<br/>
A: [`babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx) 在 `vite` 里有对等的 [`plugin-vue-jsx`](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)，直接升级 `vite` 似乎是个不错的主意，但是 `vite` 在 `build` 时依然是用 `nodejs` 进行的，本质没有啥大的区别，尤大的 `rolldown` 出来或许可以考虑升级一波 `vite`。不过，远水不解近渴

Q: 这个提效多少呢?<br/>
A: 还不清楚，demo 还没写呢！
