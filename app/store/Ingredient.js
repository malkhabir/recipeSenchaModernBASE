Ext.define('FrontEnd.store.Ingredient', {
    extend: 'Ext.data.Store',
    model: 'FrontEnd.model.Ingredient',
    alias: 'store.ingredient',
    autoLoad: true,
    autoSync: false
});