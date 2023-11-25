Ext.define('FrontEnd.view.main.Recipes.CRUDForms.EditRecipeForm', {
    extend: 'Ext.form.Panel',
    xtype: 'editRecipeform',
    controller: 'Recipeformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://localhost:7270/api/ingredient/',
    id: 'editRecipeform',
    
    items: [{
        xtype: 'container',
        layout: 'vbox',
        items: [{
            xtype: 'container',
            layout: 'center',
            padding: '30 0 20 0',
            items: [{
                xtype: 'image',
                reference: 'ingredientImage',
                width: 200,
                height: 200,
                src: this.url,
                listeners: {
                    tap: 'onImageTap'
                }
            }]
        }, {
            xtype: 'textfield', // Replace with your field type
            label: 'Name',
            name: 'name',
            allowBlank: false
        }, {
            xtype: 'textfield', // Replace with your field type
            label: 'Unit',
            name: 'measurementUnit',
            allowBlank: false
        }, {
            xtype: 'hiddenfield',
            name: 'ingredientId',
            allowBlank: false,
            hidden: true
        }, {
            xtype: 'numberfield', // Replace with your field type
            label: 'Calories',
            name: 'calories',
            allowBlank: false
        }]
    }],

    buttons: [{
        text: 'Update',
        formBind: true,
        handler: 'onUpdateClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});