Ext.define('FrontEnd.view.layout.RecipeStepsCard', {
    extend: 'Ext.Container',
    xtype: 'recipestepscard',
    controller: 'RecipeStepsCardController',

    requires: [
        'Ext.layout.Card'
    ],

    // height: 500,
    // width: 500,
    layout: 'fit',


    viewModel: {
        data: {
            tapMode: 'direction',
            step: 1 // Initialize with the default value
        }
    },

    items: [{
        xtype: 'panel',
        reference: 'panel',
        shadow: 'true',
        layout: {
            type: 'card',
            // The controller inserts this indicator in our bbar
            // and we publish the active index and card count
            // so we can easily disable Next/Prev buttons.
            indicator: {
                reference: 'indicator',
                bind: {
                    tapMode: '{tapMode}'
                },
                publishes: [
                    'activeIndex',
                    'count'
                ]
            }
        },

        items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'image',
                reference: 'ingredientImage',
                width: 200,
                height: 200,
                src: 'https://recipeasstorage.blob.core.windows.net/recipeasassets/add_image.svg',
                listeners: {
                    tap: 'onImageTap'
                }
            }, {
                xtype: 'textareafield',
                label: 'Enter instruction',
                maxRows: 7,
                // name: 'step'
            }]
        }],

        tbar: {
            reference: 'bbar',
            // items: [{
            //     xtype: 'component',
            //     flex: 1,
            //     bind: {
            //         text: 'Step: {step} of {indicator.count}'
            //     }
            // }]
        }
    }]
});
