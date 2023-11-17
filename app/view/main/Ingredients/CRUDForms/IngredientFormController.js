Ext.define('FrontEnd.controller.IngredientFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ingredientformcontroller',
    
    onSaveClick: function() {
        debugger;
        var form = this.getView();
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    if(action.success === true){
                        Ext.Msg.alert('Success', action.msg);
                        Ext.getCmp('gridingredientid').getStore().reload();
                        form.close();
                    } else {
                        Ext.Msg.alert('Error', action.msg)
                    }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.msg);
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
        // debugger;
        var record = form.getValues();
        if (form.isValid()) {
            Ext.Ajax.request({
                url: 'https://localhost:7270/api/ingredient/' + record.IngredientId,
                method: 'PUT',
                jsonData: record,
                success: function(response) {
                    var result = Ext.decode(response.responseText);
                    debugger
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
    },

    onImageTap: function () {
        debugger;
        var record = this.getView().getValues();
    
        Ext.Ajax.request({
            url: 'https://localhost:7270/api/ingredient/container/recipeas/' + record.name,
            method: 'GET',
            success: function (response) {
                try {
                    debugger
                    const data = Ext.decode(response.responseText);
                    const matchingIngredientUrls = data.map(imageSrc => ({ imageSrc , value: imageSrc }));
                    console.log(matchingIngredientUrls);
                    
                    if (this.picker) {
                        this.picker.destroy();
                        this.picker = null;
                    }

                    if (!this.picker) {
                        this.picker = Ext.Viewport.add({
                            xtype: 'picker',
                            slots: [{
                                name: "ingredientImage",
                                title: 'Ingredients',
                                itemTpl: '<img src="{imageSrc}" width="40" height="40">',
                                itemConfig: {
                                    ui: 'round', // Optional UI config
                                    getItemTpl: function (record, index) {
                                        // Use a function to dynamically adjust the itemTpl based on the record properties
                                        var selectedCls = record.get('selected') ? 'selected-slot' : '';
                                        var width = record.get('selected') ? 60 : 40; // Adjust width as needed
                                        var height = record.get('selected') ? 60 : 40; // Adjust height as needed
                        
                                        return {
                                            selectedCls: selectedCls,
                                            width: width,
                                            height: height,
                                            imageSrc: record.get('imageSrc')
                                        };
                                    }
                                },
                                data: matchingIngredientUrls,
                                itemCls: 'selected-slot' // Add a CSS class for the selected slot
                            }],
                            listeners: {
                                show: function () {
                                    // Set a high zIndex to ensure the picker is on top (Needed mobile devices)
                                    this.setZIndex(9999);
                                },
                                pick: function(picker, values, slot, eOpts) {
                                    // debugger;
                                    Ext.getCmp('editingredientform').lookupReference('ingredientImage').setSrc(values['ingredientImage'])
                                    
                                }
                            }
                        });
                    }
    
                    // Set a high zIndex to ensure the picker is on top
                    this.picker.show();
                } catch (e) {
                    console.error('Error decoding JSON:', e);
                }
            },
            failure: function (response, options) {
                console.error('Error fetching blob names:', response.statusText);
            }
        });
    }
    
    

});

    
