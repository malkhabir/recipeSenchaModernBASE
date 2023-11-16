Ext.define('FrontEnd.view.UpdateIngredientForm', {
    extend: 'Ext.form.Panel',
    xtype: 'updateingredientform',
    controller: 'ingredientformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://localhost:7270/api/ingredient/',
    items: [{
        label: 'Name',
        name: 'name',
        allowBlank: false
    }, {
        label: 'Unit',
        name: 'measurementUnit',
        allowBlank: false
    },
    {
        label: 'Id',
        name: 'ingredientId',
        allowBlank: false,
        hidden: true
    },
    {
        label: 'Calories',
        name: 'calories',
        allowBlank: false
        
    },
    {   
        xtype: 'container', // Container to hold the image viewer
        layout: 'center',
        items: [{
            xtype: 'image',
            reference: 'ingredientImage', // Reference for the image component
            width: 200, // Set the width as per your requirements
            height: 200, // Set the height as per your requirements
            style: 'border: 1px solid #ccc;', // Add a border style
            src: 'path/to/default-image.jpg', // Set a default image or leave it blank
            listeners: {
                tap: 'onImageTap' // Add a tap event listener to handle image tap
            }
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