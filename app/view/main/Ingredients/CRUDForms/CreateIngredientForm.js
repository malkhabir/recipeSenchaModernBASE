Ext.define('FrontEnd.view.CreateIngredientForm', {
    extend: 'Ext.form.Panel',
    xtype: 'createingredientform',
    controller: 'ingredientformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://malkhabirapi.azurewebsites.net/api/ingredient/',
    // url: 'https://localhost:7270/api/ingredient/',
    id: 'createingredientform',
    
    items: [{
        xtype: 'container',
        layout: 'center',
        padding: '30 0 20 0',
        items: [{
            xtype: 'image',
            reference: 'ingredientImage',
            width: 200,
            height: 200,
            src: 'https://recipeasstorage.blob.core.windows.net/recipeasassets/add_image.svg',
            listeners: {
                tap: 'onImageTap'
            }
        }]
    }, {
        label: 'Name',
        name: 'Name',
        allowBlank: false
    }, {
        label: 'Unit',
        name: 'MeasurementUnit',
        allowBlank: false
    },
    {
        label: 'Calories',
        name: 'Calories',
        allowBlank: false
        
    }],
    
    buttons: [{
        text: 'Save',
        formBind: true,
        handler: 'onSaveClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});