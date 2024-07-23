Ext.define('FrontEnd.view.main.Recipes.GridRecipes', {
    extend: 'Ext.grid.Grid',
    xtype: 'gridrecipe',
    controller: 'gridrecipecontroller',
    id: 'gridrecipesid',


    items: [{
        docked: 'top',
        xtype: 'toolbar',
        shadow: false,
        items: [{
            xtype: 'button',
            text: 'Add',
            handler: 'AddRecipe'
        },
        {
            xtype: 'button',
            text: 'Edit',
            handler: 'EditRecipe'
        },
        {
            xtype: 'button',
            text: 'Delete',
            handler: 'DeleteRecipe'
        }]
    }],

    store:{
        type: 'recipe',
        listeners: {
            // load: function (store, records, success) {
            //     console.log('Store Loaded:', records);
            // }
        }
    },
    
    columns: [
        { text: 'Name', dataIndex: 'recipeName', flex: 1 },
        { text: 'Time', dataIndex: 'preparationTime', flex: 1 },
        { text: 'Id', dataIndex: 'recipeId', flex: 1, hidden: true },
        { text: 'Calories', dataIndex: 'calories', flex: 1,},
        { text: 'ImageName', dataIndex: 'imagePath', flex: 1, hidden: 'true'}
    ],

    // platformConfig: {
    //     '!phone': {
    //         listeners: {
    //             // childmouseenter event to show tooltips on mouse hover
    //             childmouseenter: function (grid, location, eOpts) {
    //                 var record = location.record;
    //                 var target = location.cell;
                    
    //                 // Create a tooltip
    //                 var tooltip = Ext.create('Ext.tip.ToolTip', {
    //                     target: target,
    //                     html: `<img src="https://recipeasstorage.blob.core.windows.net/recipeas/${location.record.get('imagePath')}" alt="${location.record.get('name')}" style="width: 50px; height: 50px;"/>`,                    
    //                     trackMouse: true,
    //                     width: 80,
    //                     height: 80
    //                 });
    //                 grid.Tooltip = tooltip;

    //                 // Show the tooltip
    //                 tooltip.show();
    //             },
    //             // childmouseleave event to close the tooltip when the mouse leaves the cell
    //             childmouseleave: function (grid, location, eOpts) {
    //                 const tooltip = grid.Tooltip;
    //                 if (tooltip) {
    //                     tooltip.hide();
    //                     tooltip.destroy();
    //                 }                
    //             }
    //         },

    //     }
    // },
    
});