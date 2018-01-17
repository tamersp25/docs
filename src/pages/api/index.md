---
title: API
---

## Overview

Veritone provides APIs that allow you to easily access cognitive engines within the Veritone Ecosystem.  Through these APIs, you'll be able to upload data, summon engines, access the output of the engines, and build chained cognitive workflows for your applications.

Today, we support two means of access for our APIs - the Veritone client library and direct GraphQL access.  

## The Veritone Client Library
To simplify the application integration process, Veritone offers a Client Library with built-in OAuth 2.0 logic for user authentication. If you code in a supported Client Library language, this is our recommended option for accessing APIs.

Veritone offers a JavaScript Client Library that can be used in Node or from a browser, and we will be adding more languages in the coming future.

[![Alt text](https://img.youtube.com/vi/VID/0.jpg)](https://www.youtube.com/watch?v=VID)

## GraphQL
The GraphQL API provides access to Veritone’s full suite of APIs, with the exception of search. GraphQL is a querying language that enables you to make a single call to fetch the information you need instead of several REST requests. If you’re not using the Client Library, this is the API resource you’ll want to use.

[This page](graphql) has further information about GraphQL and our API implementation.
