# WebexApp

The project is created as a part of Codefest 2021 Preparatory task. It is a simple app created with Webex SDKs which allows the user to do the following:
* [Login to webex](docs/login/README.md)
* [Create a webex space/room](docs/createroom/README.md)
* [Add memeber to the selected space](docs/addmember/README.md)
* [Send a message to the selected space](docs/sendmessage/README.md)
* [Logout](docs/logout/README.md)

## Technologies Overview

This project is built using Angular (8.x), [Momentum UI](https://momentum.design/components/overview) & [Webex SDKs](https://developer.webex.com/docs/sdks/browser).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng generate service service-name` to generate a new service.

## Localisation/Internationalisation

The webapp supports internationalisation, currently English(en) has been set as the default language. Going forward we can invlove other languages by adding json files with the translated words under `assets/i18n` folder.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Testing Info

### Unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### End-to-End tests

Run `npm run cypress:headless` to execute the end-to-end tests in headless mode via [Cypress](https://www.cypress.io/).

## Code styling

### Lint checks

Run `ng lint` to check if there is any lint failures

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
