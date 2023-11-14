Ext.define('FrontEnd.view.main.HomeRecipeDataview', {
    extend: 'Ext.panel.Panel',
    xtype: 'homerecipedataview',
    
    requires: [
        'Ext.dataview.plugin.ItemTip',
        'Ext.Responsive',
        'Ext.Toolbar'
    ],

    layout: 'fit',
    shadow: true,

    items: [
        {
            xtype: 'toolbar', // Add a toolbar
            docked: 'top',   // Dock it to the top of the panel
            items: [
                // Add toolbar items here
                { xtype: 'button', text: 'Button 1' },
                { xtype: 'button', text: 'Button 2' },
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
            '<div class="img-container" style="width: 100px; height: 100px;">',
            '<div class="img" style="width: 100%; height: 100%; background-image: url({[this.getImageUrl(values)]}); background-size: contain; background-repeat: no-repeat;"></div>',
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