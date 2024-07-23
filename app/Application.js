/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('FrontEnd.Application', {
    extend: 'Ext.app.Application',

    name: 'FrontEnd',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    
    
});
