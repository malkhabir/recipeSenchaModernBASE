// Model: Recipe.js
Ext.define('FrontEnd.model.Recipe', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'recipeId', type: 'string', persist: false, unique: true, identifier: 'sequential' },
        {name: 'title', type: 'string' }, 
        {name: 'description', type: 'string'}, 
        {name: 'preparationTime', type: 'int', sortType: 'asInt'},      
        {name: 'calories', type: 'number'},
        {name: 'picture', type: 'string'},

    ],

    proxy: {
        type: 'ajax',
        // url: 'https://malkhabirapi.azurewebsites.net/api/recipe',
        url: 'https:/localhost:7270/api/recipe',

        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});