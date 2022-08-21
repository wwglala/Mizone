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

### 提交 校验 husky，lint-staged

### 代办

1. git 提交校验 husy、lint-staged
2. 版本规范（tag、aplha、beta、latest）
3. 一键发布

### ui 展示

1. pnpm add @storybook/react -D -w
2. pnpm start
