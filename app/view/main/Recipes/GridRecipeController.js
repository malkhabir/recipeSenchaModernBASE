Ext.define('FrontEnd.view.main.GridRecipeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridrecipecontroller',

    AddRecipe: function (sender) {

        var form = Ext.getCmp('createrecipeform');       
        
        if(!form) {
            form = this.getView().add({
                xtype: 'formwindow',
                title: 'Add Recipe',
                layout: 'fit',
                scrollable: true,
                items: [{
                    xtype: 'createrecipeform',
                }]
                
            });
            form.show();
        } else {
            form.show();
        }
        
    },

    EditRecipe: function(sender){
        //Sets the edit recipe form with some data
        var record = this.getView().getSelection();
        record.data.instructions = typeof(record.data.instructions) === 'string' ? JSON.parse(record.data.instructions):record.data.instructions

        if(record !== null){
            // Create the image component with the dynamically generated image URL
            var imageUrl = record.get('picture');
            var formWindow = this.getView().add({
                xtype: 'formwindow',
                title: 'Edit Recipe',
                // height: 700,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                },
                scrollable: true,
                items: [{
                    xtype: 'editrecipeform'
                }],
            });
            
            var recipeForm = formWindow.down('editrecipeform');

            recipeForm.fill(record.data)


            formWindow.show();
        } else {
            Ext.Msg.alert('Alert','Please select a recipe.')
        }

    },

    DeleteRecipe: function(sender, record){
        var form = this
        Ext.Msg.confirm('Delete recipe', 
            'Would you like to delete this recipe?', 
            (buttonId) => {if(buttonId === 'yes'){deleteRecipe(form)}else{return}} )
        
    },

    
});

function deleteRecipe(thisForm) {
    var recordArray = thisForm.getView().getSelections()
    var record = thisForm.getView().getSelection();
    for (let index = 0; index < recordArray.length; index++) {
        deleteNextRecord(index)
    } 

    function deleteNextRecord(index) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Please wait...'
        });

        debugger
        Ext.Ajax.request({
            url: 'https://localhost:7270/api/recipe/' + recordArray[index].data.recipeId,
            method: 'DELETE',
            success: function(response) {
                Ext.getCmp('gridingredientid').getStore().reload();
                var result = Ext.decode(response.responseText);
                if (result.success === false) {
                    Ext.Msg.alert('Error', result.msg);
                } else {
                    Ext.Msg.alert('Success', result.msg);
                    
                }
                Ext.Viewport.setMasked(false);
                var grid = Ext.getCmp('gridrecipesid');
                grid.getStore().load();
            },
            failure: function(response) {
                var result = Ext.decode(response.responseText);
                Ext.Msg.alert('Error', result.msg);
                Ext.Viewport.setMasked(false);
                
            }
        });
    }
}
