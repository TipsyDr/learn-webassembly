# 数据管理平台

## What's inside?

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Polyfills](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#readme)
- [ThreeJs](https://threejs.org)

## Getting started

1. Install dependencies.

   ```bash
   yarn
   ```

2. Start dev server with hot reload at http://localhost:8888.
   ```bash
   yarn dev
   ```

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Other commands

### Lint commands

```bash
yarn lint
```

### Build commands

```bash
yarn build
```

### Run the app in production mode at http://localhost:8888.

```bash
yarn serve
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 开发流程规范 [react](http://192.168.3.220:8090/pages/viewpage.action?pageId=11469127)

### 补充

- 每次提交尽量一个 commit
- 组件开发后在 component|styled|common|types 目录中统一 export 出去
- basic 路由添加可以在 routes 中的 modules 中下新建一个文件之后直接配置，不用再在 index 中额外的引入
- icon 用 svg 图片维护，svg 图片可以用代码格式化方便后期修改，icon 统一放在 assets 的 Icons 文件中，可以通过 CustomIcon 组件直接使用，不用再引入图片，用法： `<CustomIcon type={svg文件名不要加后缀} /> `
