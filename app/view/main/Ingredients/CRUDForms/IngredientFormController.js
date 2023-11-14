Ext.define('FrontEnd.controller.IngredientFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ingredientformcontroller',
    
    onSaveClick: function() {
        debugger;
        var form = this.getView();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                   Ext.Msg.alert('Success', action.result.msg);
                   Ext.getCmp('IngredientGridID').getStore().reload();
                   formwindow.close();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                }
            });
        }else{
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
        }
    },
    
    onCancelClick: function() {
        this.getView().up('window').close();
    },

    onUpdateClick: function() {
        var form = this.getView().getForm();
        var formwindow = this.getView().up('window');
        // debugger;
        var record = form.getValues();
            if (form.isValid()) {
                Ext.Ajax.request({
                    url: 'https://localhost:7270/api/ingredient/' + record.IngredientId,
                    method: 'PUT',
                    jsonData: record,
                    success: function(response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert('Success', result.msg);
                        Ext.getCmp('IngredientGridID').getStore().reload();
                        formwindow.close();
                    },
                    failure: function(response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert('Error', result.msg);
                    }
                });
            } else {
                Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
            }
    }

});

    
