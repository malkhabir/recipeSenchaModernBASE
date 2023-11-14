// Model: Recipe.js
Ext.define('FrontEnd.model.Recipe', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'title', type: 'string' }, 
        {name: 'description', type: 'string'}, 
        {name: 'preparationTime', type: 'int', sortType: 'asInt'}, 
        {name: 'author', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'recipeId', type: 'string', persist: false, unique: true, identifier: 'sequential' },
        {name: 'recipesteps', type: 'int'},
        {name: 'instructions', type: 'string'},
        {name: 'imagePath', type: 'string'},
        {name: 'calories', type: 'number'}
    ],

    proxy: {
        type: 'ajax',
        url: 'https://malkhabirapi.azurewebsites.net/api/recipe',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});