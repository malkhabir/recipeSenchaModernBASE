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

    items: [
        {
            xtype: 'managementgrids',
            items: [
                {
                    title: 'Ingredients',
                    layout: 'fit',
                    items: [{
                        xtype: 'gridingredient'
                    }],
                    cls: 'card'
                },
                {
                    title: 'Recipes',
                    layout: 'fit',
                    items: [{
                        xtype: 'gridrecipe'
                    }],
                    cls: 'card'
                },
                {
                    title: 'Other',
                    html : '<span class="action">User tapped Tab 3</span>',
                    cls: 'card'
                }
            ]
        }
    ]

});