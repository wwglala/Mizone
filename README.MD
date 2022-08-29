### 启动

```bash shell
pnpm i
pnpm start
```

### vscode settings

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptvue",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "editor.formatOnType": true,
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.eol": "\n",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 提交

feat：新增 feature

fix：修复 bugdocs 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等;

style：仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑;

refactor：代码重构，没有加新功能或者修复 bugperf 优化相关，比如提升性能、体验

test：测试用例，包括单元测试、集成测试等

chore：改变构建流程、或者增加依赖库、工具等

revert：回滚到上一个版本

### 发布

本地测试 yalc

> https://github.com/wclr/yalc

```bash shell
npm i yalc -g
pnpm publish:yalc
```

#### other registry

添加：

yalc add mizone

更新：

yalc update

#### 版本规范（tag、aplha、beta、latest）

1. 新组件对应新分支
2. 发包自测

```
npm version prerelease --preid=alpha
npm publish --tag alpha
```

3. 公测（当前分支合并 master）

```
npm version prerelease --preid=beta
npm publish --tag beta
```

4. 发布（master 合并当前分支）

> 修改正式版本号，合并到 master 发布

```
npm publish
```

5. 回退方案：

```
npm dist-tag add mizone@x.x.x latest
```

### ui 展示

> https://github.com/storybookjs/storybook/issues/15764

解决办法：

1. 删除 node_modules
2. 重置 package.json
3. npm storybook init
4. 删除 node_modules
5. 切换 package.json
6. pnpm i
7. pnpm start

### 问题点

lint-staged：window 下面无限执行

https://github.com/okonet/lint-staged/issues/1191

### 代办

1. 集成命令
2. 单元测试
3. changelog 自动生成

### 其他：

1. https://www.npmjs.com/package/jiti

   > node 支持 ts 和 esmodule

2. https://www.npmjs.com/package/@esbuild-kit/cjs-loader
   > 转换 esm 和 ts 为 commonjs
