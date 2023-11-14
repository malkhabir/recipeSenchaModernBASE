Ext.define('FrontEnd.store.Recipe', {
    extend: 'Ext.data.Store',
    model: 'FrontEnd.model.Recipe',
    alias: 'store.recipe',
    autoLoad: true,
    autoSync: false
});