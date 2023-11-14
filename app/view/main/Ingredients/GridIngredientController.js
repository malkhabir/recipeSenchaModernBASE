Ext.define('FrontEnd.view.main.GridIngredientController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.gridingredientcontroller',

    AddIngredient: function (sender) {
        var form = this.getView().add({
            xtype: 'formwindow',
            title: 'Add Ingredient',
            height: 400,
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
    EditIngredient: function(sender, record){

    },
    DeleteIngredient: function(sender, record){

    }
});
