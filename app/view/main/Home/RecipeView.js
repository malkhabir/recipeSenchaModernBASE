Ext.define('FrontEnd.view.main.Home.RecipeView', {
    extend: 'Ext.Container',
    xtype: 'home',    
    requires: [
        'Ext.carousel.Carousel'
    ],

    cls: 'cards',
    shadow: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        cls: 'demo-solid-background',
        flex: 1
    },
    items: [{
        xtype: 'carousel',
        items: [{
            html: '<p>Swipe left to show the next card…</p>',
            cls: 'card'
        },
        {
            html: '<p>You can also tap on either side of the indicators.</p>',
            cls: 'card'
        },
        {
            html: 'Card #3',
            cls: 'card'
        }]
    }, {
        xtype: 'carousel',
        ui: 'dark',
        direction: 'vertical',
        items: [{
            html: '<p>Carousels can also be vertical <em>(swipe up)…</p>',
            cls: 'card dark'
        },
        {
            html: 'And can also use <code>ui:light</code>.',
            cls: 'card dark'
        },
        {
            html: 'Card #3',
            cls: 'card dark'
        }]
    }]
});