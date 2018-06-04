# Context Menu Extensions



### Overview

Context menu extensions allow your application to register custom context menu additions for various object types across the Veritone platform, such as mentions, tdos, watchlists and collections. Any user who has access to your context menu enabled application will be able to view and interact with your registered context menu extensions whenever they open a context menu of the registered type across our Veritone applications.

### How to register a context menu extension

You can register a new context menu extension by going to [Veritone Developer App (VDA)](https://developer.veritone.com/applications/overview) and either creating a new application or by clicking on an existing one and clicking on the context menu extensions tab.


Here you will see various supported object types that you can register context menu extensions for.


Each extension requires both an `action name (label)` and a `URL`. The action name is what will be shown to users who have access to your application when interacting with the resource type context menus across the Veritone Platform. Upon clicking this label they will be taken to the URL that is defined in the URL field with the resource type id template string being replaced with the id of the resource that the context menu belongs to.


An example -

If you register a context menu extension with the following -

```json
label: Go to Veritone
url: www.veritone.com?mentionId=${mentionId}
```

If a user opens up a context menu of a mention within one of the Veritone applications, they will see `Go to Veritone` as a menu item. If the user clicks the menu item, they will be redirected to the URL that was registered i.e `www.veritone.com/${mentionId}` with the template string `${mentionId}` being replaced by the id of the mention i.e `www.veritone.com?mentionId=12345`.

Note -
* All redirects are via `GET`. You will need to parse the resource id from the params, see next section for more info.


### Handling the redirect (external)

You will need to parse the resource id from the params of the redirect in order to do something with it. To do this, ensure you have a route set up on the server of the URL that you registered for the context menu extension which accepts GET requests.

Depending on how you constructed the URL, you can expect you can expect to either parse the id from the params or the query string of the request. See below.

* `www.veritone.com/${mentionId}/example` -> params
* `www.veritone.com?mentionId=${mentionId}` -> query string

Once you've parsed the resource id, then you can use our graphQL API in order to fetch the resource and do something with it. See below for example queries for each resource type.

Mention:

```graphql
{
  mention(mentionId: "mentionId") {
    id
  }
}
```

TDO:

```graphql
{
  temporalDataObject(id: "tdoId") {
    id
  }
}
```

Watchlist:

```graphql
{
  watchlist(id: "watchlistId") {
    id
  }
}
```

Collection:

```graphql
{
  collection(id: "collectionId") {
    id
  }
}
```
