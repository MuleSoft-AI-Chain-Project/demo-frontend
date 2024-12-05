# MAC Frontend SPA Source Code
Author's note: This is POC code; quick, dirty, without comprehensive testing... but it serves its purpose :).

## Host or modify the frontend yourself
Run command in this folder

### Install the framework
Framework used: https://quasar.dev/

```bash
npm i -g @quasar/cli
```

### Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
This will build into the `../docs` folder. Yes, a bit unusual, but this is where Github pages can be hosted...
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
