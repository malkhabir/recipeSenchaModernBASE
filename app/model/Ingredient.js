Ext.define('FrontEnd.model.Ingredient', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'name', type: 'string'},
        {name: 'measurementUnit', type: 'string'},
        {name: 'ingredientId', type: 'int'},
        {name: 'calories', type: 'number'},
        {name: 'imagePath', type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: 'https://malkhabirapi.azurewebsites.net/api/ingredient',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },

});