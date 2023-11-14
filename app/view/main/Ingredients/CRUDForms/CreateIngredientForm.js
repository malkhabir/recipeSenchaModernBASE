Ext.define('FrontEnd.view.CreateIngredientForm', {
    extend: 'Ext.form.Panel',
    xtype: 'createingredientform',
    controller: 'ingredientformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://localhost:7270/api/ingredient/',

    items: [{
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