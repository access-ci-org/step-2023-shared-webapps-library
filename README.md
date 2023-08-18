# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Release

This is to be executed based on the number of changes the particular release carries. 
The execution of the command will build the project assets, commit, tag and push to the github. And then github publishes the assets to github.io.

[https://access-ci-org.github.io/step-2023-shared-webapps-library/dist/#/](https://access-ci-org.github.io/step-2023-shared-webapps-library/dist/#/)

```sh
npm run patch
```
or 
```sh
npm run minor
```
or
```sh
npm run major
```
