Ext.define('FrontEnd.view.main.Kitchenhub.Kitchenhub', {
    extend: 'Ext.panel.Panel',
    xtype: 'kitchenhub',
    
    requires: [
        'Ext.dataview.plugin.ItemTip',
        'Ext.Responsive',
        'Ext.Toolbar'
    ],

    layout: 'fit',
    shadow: true,


    // xtype: 'managementgrids',
    //             items: [
    //                 {
    //                     title: 'Ingredients',
    //                     layout: 'fit',
    //                     items: [{
    //                         xtype: 'gridingredient'
    //                     }],
    //                     cls: 'card'
    //                 },
    //                 {
    //                     title: 'Recipes',
    //                     html : 'A TabPanel can use different animations by setting <code>layout.animation.</code>',
    //                     cls: 'card'
    //                 },
    //                 {
    //                     title: 'Other',
    //                     html : '<span class="action">User tapped Tab 3</span>',
    //                     cls: 'card'
    //                 }
    //             ]


                
    items: [
        {
            xtype: 'toolbar', // Add a toolbar
            docked: 'top',   // Dock it to the top of the panel
            items: [
                // Add toolbar items here
                { xtype: 'button', text: 'Notification' },
                { xtype: 'button', text: 'Search' },
                // ... add more buttons or other items as needed
            ]
        },
        {
        xtype: 'dataview',
        scrollable: true,
        inline: true,
        cls: 'dataview-inline',
        margin: '10',
        itemTpl: new Ext.XTemplate(
            '<div class="img-container" style="width: 100px; height: 150px; padding: 10px;">',
            '<div class="img ingredient-img-style" style="width: 100%; height: 50%; background-image: url({[this.getImageUrl(values)]}); background-size: contain; background-repeat: no-repeat;"></div>',
            '<div class="name ingredient-name-style" style=" margin-top: 5px;">{name}</div>',
            '</div>',
        
            {
                // Function definition within XTemplate
                getImageUrl: function (values) {
                    // Values represent record
                    // debugger
                    var imageName = values.imagePath; // Replace 'photo' with the actual field name containing the image path
                    // Make an API call to retrieve the image URL based on the imagePath or any other necessary logic
                    console.log("Downloaded img:" + imageName)
                    return 'https://recipeasstorage.blob.core.windows.net/recipeas/' + imageName;
                }
            }
        ),
        store: {
            type: 'ingredient',
        },
        
        plugins: {
            width: 415,
            minWidth: 300,
            type: 'dataviewtip',
            delegate: '.img',
            allowOver: true,
            align: 't-b?',
            anchor: true,
            bind: '{record}',
            tpl:    '<table style="border-spacing:3px; border-collapse:separate">' + 
                    '<tr><td>Description: </td><td>{affiliation}</td></tr>'
        },
    }]

});