# Micro-Frontend con Angular y Module Federation

Este proyecto es un ejemplo de cómo configurar un micro-frontend remoto con Angular utilizando Module Federation.

## Prerrequisitos

- **Node.js y npm**: Descargables desde [https://nodejs.org/](https://nodejs.org/).
- **Angular CLI**: Instalable con el siguiente comando:
  ```bash
  npm install -g @angular/cli
  ```

## Pasos para crear el proyecto remoto (mfe)

### Crear el proyecto base

```bash
ng new mfe
```

### Agregar Module Federation (tipo remote)

```bash
cd mfe
ng add @angular-architects/module-federation --type remote
```

### Crear un Feature Module con sus rutas

```bash
ng g m feature-one --routing
```

### Crear un componente principal para el Feature Module

```bash
ng g c feature-one
```

### Configurar las rutas del Feature Module

Modificar el archivo `feature-one-routing.module.ts` para que cargue el componente principal:

```typescript
const routes: Routes = [
  {
    path: '',
    component: FeatureOneComponent,
  },
];
```

### Importar el Feature Module en el módulo raíz

En `app.module.ts`, agregar el módulo recién creado en la sección `imports`:

```typescript
imports: [
  BrowserModule,
  FeatureOneModule
],
```

### Exponer el componente en el archivo de configuración de Webpack

Modificar `webpack.config.js` para exponer el componente `FeatureOneComponent`:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfe',
  exposes: {
    "./FeatureOneComponent": "./src/app/feature-one/feature-one.component.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
  },
});
```

### Visualización del componente en la aplicación

En `app.component.ts`, importar y utilizar el `FeatureOneModule`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureOneModule } from './feature-one/feature-one.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeatureOneModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe';
}
```

En `app.component.html`, añadir el componente:

```html
<router-outlet></router-outlet>
<app-feature-one></app-feature-one>
```

## Iniciar el proyecto

### Clonar el repositorio (opcional)

```bash
git clone <URL_del_repositorio>
```

### Instalar dependencias

```bash
npm install
```

### Levantar el servidor de desarrollo

```bash
ng serve
```

### Visualizar la aplicación

Acceder a [http://localhost:4200](http://localhost:4200).

### Verificar la configuración del `remoteEntry`

Para confirmar que el `remoteEntry.js` está expuesto correctamente, accede a la siguiente URL:

[http://localhost:3000/remoteEntry.js](http://localhost:3000/remoteEntry.js)

El resultado esperado será similar a:

```javascript
/******/ var __webpack_modules__ = ({

/***/ 3951:
/*!***************************************************!\
  !*** ./node_modules/ansi-html-community/index.js ***!\
  \***************************************************/
/***/ ((module) => {

module.exports = ansiHTML;

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
};
```

¡Y listo! Con estos pasos, tu proyecto remoto (`mfe`) está configurado y listo para integrarse en un host.
