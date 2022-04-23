---
sidebar_position: 1
---

# Introduction

QA Flag is built with separate components, so that your project does not need to bloat of features you do not need or types of scenarios that you will never run. The core library is always required, so start there by installing it as a dev dependency on your project.

```
npm i --save-dev @qaflag/core
```

You will also likely want to install our CLI tool, so that you can run the `qaflag` command in your terminal. You only need to do this once on your machine, not for each project.

```
npm i -g @qaflag/cli
```

Your next step from here will depend on what type of testing you want to do. Install the appropriate packages based on your needs:

- JSON API - @qaflag/json
- HTML DOM - @qaflag/html
- Full Browser Testing (with Playwright) - @qaflag/playwright
- XML, SOAP, RSS, or ATOm - @qaflag/xml
