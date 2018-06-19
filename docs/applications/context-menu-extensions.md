# Context Menu Extensions



### Overview
A Context Menu (also known as a pop-up or shortcut menu) displays when a user clicks the **more options icon** (vertical ellipsis) on a resource, such as a media file or watchlist. It presents options that allow users to perform various actions relevant to the resource where the menu was opened. As a Veritone developer, you can add custom extensions to a number of different Context Menus across the platform and provide a shortcut for sending a selected resource to your application. Simply choose the resource type where your Context Menu Extension will appear, enter the name that will display, and provide the URL where users will be taken when your menu item is selected. Once an extension is registered, any Veritone user of your application can view and interact with it from the associated Context Menu. 

You can create Context Menu Extensions for any of the following resource types:

*  **Watchlist (a):** A Watchlist is a saved set of criteria that Veritone performs continuous searches against to find matching content in the database index. Veritone creates a folder in Discovery for each watchlist and automatically adds content (known as “Mentions”) that matches the search criteria. The Watchlist Context Menu is located on the right of a Watchlist name in the left menu of Discovery.
*  **Mention (b):** A Mention is a matching result for a Watchlist’s criteria. The Mentions Context Menu is located on the far right of an individual Mention in the Veritone Discovery and Veritone Collections applications.

![View-Context-Menu](context-menu-view-watchlist-mention.png)

*  **Media:** Media represents an organization’s content that’s ingested and stored in Veritone CMS. The Media Context Menu is located on the upper right of a file tile in CMS.

![View-Context-Menu-Media](context-menu-view-media.png)

*  **Collections:** A Collection is a grouping of individual Mentions or Media selected by a user. The Collections Context Menu is located on the upper right of an individual file tile in the Veritone Collections application.

![View-Context-Menu-Collections](context-menu-view-collection.png)

### Create a Context Menu Extension
*Context Menu Extensions* can be added in [Veritone Developer App (VDA)](https://developer.veritone.com/applications/overview) when creating a new application or by modifying an existing application’s settings.

#### Access Context Menu Extension Settings
The step to add Context Menu Extensions for a new application is built directly into the [application registration workflow](/applications/quick-start/step-1). To access the *Context Menu Extensions* page for an existing app, log in to Veritone Developer and follow the steps below.
1. Select **Applications** on the left menu of the Veritone Developer homepage. A list of your organization’s *Applications* displays.
2. Select the **application name** in the list where the Context Menu Extension will be added. The selected application’s settings open.
![Access-Context-Menu-Settings-1](context-menu-access-1.png)
3. Click the **Context Menu Extensions** tab. The *Context Menu Extensions* settings open.
![Access-Context-Menu-Settings-2](context-menu-access-2.png)

#### Add a Context Menu Extension
1. Choose the the resource type where you’d like your Context Menu Extension to appear.
   *   **Mentions:** On the far right of a Mention in Discovery.
   *   **Watchlists:** A W On the right of a Watchlist name in the left menu of Discovery.
   *   **Media:** On the upper right of a file tile in CMS.
   *   **Collections:** On the upper right of a file tile in Collections.

2. Enter an `Action Name` (label) for your extension. The `Action Name` is the text that’s shown to users in the menu. The name should be short and describe the behavior your extension performs. (e.g., "Send to Pet Finder")

3. Enter the `URL` where users will be taken when your Context Menu item is clicked. A Context Menu `URL` is constructed of two parts: the URL of your application’s external server location and an appended template string that extracts the ID of the resource where the menu item was clicked. Template strings are similar in structure but differ between the Context Menu types (e.g., Mention: `${mentionId}`, Watchlist: `${watchlistId}`). Full URL configuration examples are provided as a reference for each Context Menu type and can be viewed by clicking in the `URL` field.

4. Click **+** to add an additional item to the menu, if desired.

5. Add extensions to additional Context Menu types, as desired. Click **Save** when all Context Menu Extensions have been added.
![Create-Context-Menu](context-menu-create.png)

##### Example

The example below creates an extension that displays as `Send to Pet Tracker` on the Context Menu for Mentions. When a user clicks `Send to Pet Tracker`, they will be routed to the URL that's registered in the Context Menu Extensions settings (`www.pettracker.com/${mentionId}`). In addition, the template string (`${mentionId}`) will automatically be replaced with the unique ID of the Mention where the `Send to Pet Tracker` Context Menu Extension was selected (`www.pettracker.com?mentionId=12345`).
```json
label: Send to Pet Tracker
url: www.pettracker.com?mentionId=${mentionId}
```

### Handling the Redirect URL

When a user clicks on your Context Menu Extension, Veritone sends a GET request that includes the captured resource ID to your URL. To ensure proper handling of Context Menu redirects, it’s recommended to set up URL routing rules for the receiving server to accept GET requests. 

In order to use the resource ID, you'll need to parse the URL down to its components. Depending on how the URL was constructed when the Context Menu Extension was created, the ID will either be parsed from the request parameters or from the query string. 

**Example:**
* Parse from parameters: `www.pettracker.com/12345/example` 
* Parse from query string: `www.pettracker.com?mentionId=12345` 

Once the URL is parsed, pass the resource ID in the correlating query below to fetch the full resource.

**Mention**
```graphql
query{
    mention(mentionId: "mentionId") {
      id
    }  
}
```

**Watchlist**
```graphql
query{
    watchlist(id: "watchlistId") {
      id
    }  
}
```

**Media**
```graphql
query{
    temporalDataObject(id: "tdoId") {
      id
    }  
}
```

**Collection**
```graphql
query{
    collection(id: "collectionId") {
      id
    }  
}
```
