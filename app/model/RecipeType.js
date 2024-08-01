Ext.define('FrontEnd.model.RecipeType', {
    extend: 'Ext.data.Model',
    
    fields: ['name', 'categoryid'],

    proxy: {
        type: 'ajax',
        // url: Ext.getApplication() ?? '' .apiUrl ?? '' + '/combobox/recipetype',
        url: 'https://malkhabirapi.azurewebsites.net/api/combobox/recipetype',
        reader: {
            type: 'json'
        }
    }
});