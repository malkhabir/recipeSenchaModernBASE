Ext.define('FrontEnd.view.main.GridRecipeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridrecipecontroller',

    AddRecipe: function (sender) {
        debugger

        var form = Ext.getCmp('createrecipeform');
        if(!form) {
            form = this.getView().add({
                xtype: 'formwindow',
                title: 'Add Recipe',
                height: 600,
                width: 500,
                layout: 'fit',
                items: [{
                    xtype: 'createrecipeform',
                }]
                
            });
            form.show();
        } else {
            form.show();
        }
        
    },

    // EditRecipe: function(sender){
    //     var record = this.getView().getSelection();

    //     if(record !== null){
    //         // Create the image component with the dynamically generated image URL
    //         var imageUrl = 'https://recipeasstorage.blob.core.windows.net/recipeas/' + record.get('imagePath');
            
    //         var form = this.getView().add({
    //             xtype: 'formwindow',
    //             title: 'Edit Ingredient',
    //             height: 600,
    //             items: [{
    //                 xtype: 'editingredientform'
    //             }],
    //         });
            
            
    //         var ingredientForm = form.down('editingredientform');

    //         // Update the image source in the edit ingredient form
    //         var imageComponent = ingredientForm.down('image');
    //         if (imageComponent) {
    //             imageComponent.setSrc(imageUrl);
    //         }

    //         ingredientForm.setValues(record.data);
    //         form.show();
    //     } else {
    //         Ext.Msg.alert('Alert','Please select an ingredient.')
    //     }

    // },

    // DeleteIngredient: function(sender, record){
    //     debugger
    //     var record = this.getView().getSelection();
    //     Ext.Msg.confirm('Confirmation', 
    //     'Are you sure you want to delete this ingredient?',
    //     function(btn)
    //     {
    //         if(btn === 'yes'){
    //             Ext.Viewport.setMasked({
    //                 xtype: 'loadmask',
    //                 message: 'Please wait...'
    //             });

    //             Ext.Ajax.request({
    //                 url: 'https://localhost:7270/api/ingredient/' + record.data.ingredientId,
    //                 method: 'DELETE',
    //                 success: function(response) {
                        
    //                     var result = Ext.decode(response.responseText);
    //                     if (result.success === false) {
    //                         Ext.Msg.alert('Error', result.msg);
    //                     } else {
    //                         Ext.Msg.alert('Success', result.msg);
    //                         Ext.getCmp('gridingredientid').getStore().reload();
    //                     }
    //                     Ext.Viewport.setMasked(false);
    //                 },
    //                 failure: function(response) {
    //                     var result = Ext.decode(response.responseText);
    //                     Ext.Msg.alert('Error', result.msg);
    //                     Ext.Viewport.setMasked(false);
                        
    //                 }
    //             });
    //         }
    //     });
    // },

    
});
