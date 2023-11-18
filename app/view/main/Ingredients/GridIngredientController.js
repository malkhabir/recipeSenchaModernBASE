Ext.define('FrontEnd.view.main.GridIngredientController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridingredientcontroller',

    AddIngredient: function (sender) {

        var form = this.getView().add({
            xtype: 'formwindow',
            title: 'Add Ingredient',
            height: 600,
            items: [{
                xtype: 'createingredientform',
                viewModel: {
                    data: {
                        ingredient: Ext.create('FrontEnd.model.Ingredient')
                    }
                }
            }]
            
        });
        form.show();
    },

    EditIngredient: function(sender){
        var record = this.getView().getSelection();

        if(record !== null){
            // Create the image component with the dynamically generated image URL
            var imageUrl = 'https://recipeasstorage.blob.core.windows.net/recipeas/' + record.get('imagePath');
            
            var form = this.getView().add({
                xtype: 'formwindow',
                title: 'Edit Ingredient',
                height: 600,
                items: [{
                    xtype: 'editingredientform'
                }],
            });
            
            
            var ingredientForm = form.down('editingredientform');

            // Update the image source in the edit ingredient form
            var imageComponent = ingredientForm.down('image');
            if (imageComponent) {
                imageComponent.setSrc(imageUrl);
            }

            ingredientForm.setValues(record.data);
            form.show();
        } else {
            Ext.Msg.alert('Alert','Please select an ingredient.')
        }

    },

    DeleteIngredient: function(sender, record){
        debugger
        var record = this.getView().getSelection();
        Ext.Msg.confirm('Confirmation', 
        'Are you sure you want to delete this ingredient?',
        function(btn)
        {
            if(btn === 'yes'){
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Please wait...'
                });

                Ext.Ajax.request({
                    url: 'https://localhost:7270/api/ingredient/' + record.data.ingredientId,
                    method: 'DELETE',
                    success: function(response) {
                        
                        var result = Ext.decode(response.responseText);
                        if (result.success === false) {
                            Ext.Msg.alert('Error', result.msg);
                        } else {
                            Ext.Msg.alert('Success', result.msg);
                            Ext.getCmp('gridingredientid').getStore().reload();
                        }
                        Ext.Viewport.setMasked(false);
                    },
                    failure: function(response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert('Error', result.msg);
                        Ext.Viewport.setMasked(false);
                        
                    }
                });
            }
        });
    },

    
});
