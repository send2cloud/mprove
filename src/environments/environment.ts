// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../package.json');

export const environment = {
  appName: 'Mprove',
  envName: 'DEV',

  local: false,
  production: false,
  test: false,

  canUseRaven: false,
  canClickOkOnErrorDialog: false,
  canPrintToConsole: false,
  canUseStoreLogger: false,
  canUseStoreFreeze: false,
  canUseSegmentMetaReducer: false,  

  staticAssetsBaseUrl: 'http://localhost:8080',  
  dynamicAssetsBaseUrl: 'http://localhost:8080',
  httpUrl: 'http://localhost:8080/api/v1',
  websocketUrl: 'ws://localhost:8080/api/v1/webchat/',  

  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
