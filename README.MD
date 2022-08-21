### 启动

```bash shell
pnpm install
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
  "editor.tabSize": 2
}
```

### 发布

本地测试 yalc

https://github.com/wclr/yalc

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
npm dist-tag add orange-design@x.x.x latest
```

### ui 展示

1. pnpm add @storybook/react -D -w
2. pnpm start

### 代办

1. 集成命令
