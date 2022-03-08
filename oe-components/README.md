# Conditional Content

Contains Web Component for Conditional Component

## Requirements
- package ExperienceManagement.WebComponentsV1

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the web component for production to the `dist` folder.\


## Debug on C1 CMS

Add app setting to web.config.

```xml
<add key="Orckestra.Tools.ConditionalContent.Debug.Host" value="localhost" />
<add key="Orckestra.Tools.ConditionalContent.Debug.Port" value="8081" />
```

If the bundling setting changed please update the ConditionalContent\StartupHandler.cs to load valid scripts.