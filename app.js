/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'FrontEnd.Application',

    name: 'FrontEnd',

    requires: [
        // This will automatically load all classes in the RecipeSencha namespace
        // so that application classes do not need to require each other.
        'FrontEnd.*',

    ],

    // The name of the initial view to create.
    mainView: 'FrontEnd.view.main.Main'
});
