---
sidebar_position: 1
---

# Introduction

QA Flag is ideal for test automation with TypeScript projects, but it is so flexible that you can use it with just about anything. The strength is a modern interface that is completely type-safe, which often means you barely need documentation at all. The auto-complete in your IDE does most of the work for you!

Your test suites can live in their own folder or right along side the rest of your source files. The feature set is robust enough to run all kinds of different scenarios:

- JSON REST API
- Full headless or headful browser testing (using Playwright)
- Super-fast HTML DOM only testing when you don't need a full browser
- GraphQL
- XML APIs, including SOAP
- RSS or ATOM feeds
- Video streams
- Images and visual diff comparisons
- Webhooks
- Android and iOS native applications (using Appium)

## Core Concepts and Terminology

The concepts below should be pretty standard if you've been involved in QA testing, but it's important to make sure we know what they mean.

- Suite = A collection of tests that we want to run, according to a given test plan. A suite should have a defined scope that makes logical sense to group them together. It can cover one area of the application, a class of tests (like a suite for smoke tests), or a group of similar use cases. Whatever make sense for your project.
- Scenario = A suite will contain one or more scenarios. Each scenario should be a specific user story or a specific endpoint request/response combination, depending on your project.
- Steps = Within a given suite you may have a number of scenarios. Sometimes there are dependencies between them, so you want to control the order of exection. QA Flag allows you to assign scenarios to a certain numeric step. Step 1 is always fully completed before moving on to step 2 and so forth. You may not even know the full URL of a scenario in step 2, and a step 1 scenario can be automatically leveraged to complete its path.
- Persona = Each scenario will run with a given persona. If one is not set, a default one will be created. The persona can define facts about the user that may include how they authenticate to the site (or don't authenticate), properties of the device they are using, where they are physically located, etc. It should be used to approximate an actual person using your application, and it may help to even name them.
- Template = Often you will find yourself creating many similar test scenarios with only minor differences. QA Flag allows you to create a template that can be re-used across the, so that you only have to specify what changes.
- Context = Once you start writing test suites, you'll see us use `context` a lot. This is just the root that you'll build off of in each scenario to find data from the response and make assertions.
