# Gallery Content Manager

This is a WIP application for managing the content directory for a website create with the [Gallery Template](https://github.com/Goldenwere/templates.gallery).

## Development

### Getting Started

#### Tauri Prerequisites
The `platforms.gallery` app is built with Tauri, a cross-platform app toolkit which makes use of the native web renderer that comes with an OS. Tauri is built upon Rust, and as such you will need to follow [Tauri's Prerequisites Guidelines](https://tauri.app/v1/guides/getting-started/prerequisites) in order to build the app.

#### Node Prerequisites
The frontend of the app is built with Node. Ensure you have the version of node required by the template installed on your machine. The template uses NVM to make this easier to manage by simply running `nvm use` in the terminal, and running `nvm install {version outputted by console}` if it is not yet installed.
- For windows users: [nvm-windows](https://github.com/coreybutler/nvm-windows#install-nvm-windows)
- For mac/linux users: [nvm-sh](https://github.com/nvm-sh/nvm#installing-and-updating)

Once node is installed, run `npm ci` to install all dependencies.

#### Testing the App
Once the prerequisites are fulfilled, run `npm run tauri dev` to start a development build of the app. This will install Tauri's Rust dependencies if they are not yet installed, after which it will open an instance of the app. The app has hot-reloading: when you make changes to the frontend (`src`), it will reload the affected parts of the page, if any; when you make changes to the app-end (`src-tauri`), it will rebuild and reload the app.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

#### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
