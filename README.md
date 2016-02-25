# JS Template ![Build Status](https://circleci.com/gh/lawrencejones/js-template)

Uses SystemJS and JSPM to bootstrap an Angular SPA with UI-Router. Configured
for lint/testing on Circle CI.

## Start dev server

`gulp run`

Will start a server on port `4567`, loading BrowserSync to refresh the page on
changes to javascript.

## Run tests

`gulp karma`

Karma is used as the test runner for any spec files located in
`client/**/*.spec.js`.
