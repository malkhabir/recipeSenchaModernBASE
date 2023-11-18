Ext.define('FrontEnd.controller.IngredientFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ingredientformcontroller',
    
    onSaveClick: function() {
        debugger;
        var form = this.getView();
        var formWindow = form.up();
        var record = form.getValues();
        var selectedImagePath = form.query('image')[0].getSrc();
        record.imagePath = getLastArrayItem(selectedImagePath.split('/'));  
        
        if (form.isValid()) {
            form.submit({
                params: {ImagePath : record.imagePath},
                success: function(form, action) {
                    debugger
                    var result = action.msg;
                    if(action.success === true){
                        var alertDialog = Ext.toast({
                            message: 'Saved',
                            alignment: 'c-c',
                            timeout: '2000',
                            title: 'success',
                            autoClose: true,
                            closeAction: 'destroy',
                            style: {
                                backgroundColor: 'rgba(75, 192, 192, 0.5)' // Set your desired RGBA color (with 0.5 alpha for transparency)
                            },
                            bodyStyle: 'background:#ffc; padding:10px;'
                        });

                        alertDialog.setHeight(60)
                        alertDialog.setWidth(60)

                        Ext.getCmp('gridingredientid').getStore().reload();
                        formWindow.close();
                    } else {
                        Ext.Msg.alert('Error', result.msg)
                    }
                },
                failure: function(form, action) {
                    var result = action.msg
                    Ext.Msg.alert('Error', result);
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
        var form = this.getView();
        var formWindow = form.up();
        var record = form.getValues();
        var selectedImagePath = form.query('image')[0].getSrc();
        record.imagePath = getLastArrayItem(selectedImagePath.split('/'));      
        
        if (form.isValid()) {
            Ext.Ajax.request({
                url: 'https://localhost:7270/api/ingredient/' + record.ingredientId,
                method: 'PUT',
                jsonData: record,
                success: function(response) {
                    var result = Ext.decode(response.responseText);
                    if(result.success === true){
                        var alertDialog = Ext.toast({
                            message: 'Edited',
                            alignment: 'c-c',
                            timeout: '2000',
                            title: 'success',
                            autoClose: true,
                            closeAction: 'destroy',
                            style: {
                                backgroundColor: 'rgba(75, 192, 192, 0.5)' // Set your desired RGBA color (with 0.5 alpha for transparency)
                            },
                            bodyStyle: 'background:#ffc; padding:10px;'
                        });

                        alertDialog.setHeight(60)
                        alertDialog.setWidth(60)

                        Ext.getCmp('gridingredientid').getStore().reload();
                        formWindow.close();
                    } else {
                        Ext.Msg.alert('Error', result.msg)
                    }

                },
                failure: function(response) {
                    var result = Ext.decode(response.responseText);
                    Ext.Msg.alert('Error', result.title);
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
        }
    },

    onImageTap: function () {
        debugger;
        var record = this.getView().getValues();
        var formType = this.getView().getInitialConfig().xtype;

        switch (formType) {
            case 'createingredientform':
                getImagesAsync()
                break;
            case 'editingredientform':
                getImageAsync(record)
                break;
            default:
                // Code to handle other xtypes
                break;
        }

        
    }
    
    

});

var getLastArrayItem = function (array) {
    return array[array.length - 1]
}

var getImageAsync = function(record) {
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
                                // Change Image on Edit Form.
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

var getImagesAsync = function() {
    Ext.Ajax.request({
        url: 'https://localhost:7270/api/ingredient/container/recipeas/',
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
                                // Change Image on Edit Form.
                                Ext.getCmp('createingredientform').lookupReference('ingredientImage').setSrc(values['ingredientImage'])
                                
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
    
