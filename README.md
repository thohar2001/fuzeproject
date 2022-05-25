# Fuze-project

A graphical web UI for visualizing data extracted from [Sveriges Radios öppna API](https://sverigesradio.se/oppetapi), a REST API provided by Sweden's national publicly funded radio network "Sveriges Radio".  The API provides information about past content related to certain Swedish radio stations. 

This application is able to visualize the following information:
1. Recent local traffic warnings/bulletins.  
2. List of all podcast episodes released.
3. Top 5 song played each month during one year.

## Implementation

Implemented using the Vue.js MVC frontend framework.  

## Project setup

In order to run this project you will first need to:

1. Clone this project.
2. Install Vue CLI version 3: `npm install -g @vue/cli@3`
3. Install Dependencies: `npm install`.

### Compile and run
From the terminal run `npm run serve`. This enables hot reload for development. 

After that you can use the application by opening http://localhost:8080 in your web browser.

### Compile and minify for production
```npm run build```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
