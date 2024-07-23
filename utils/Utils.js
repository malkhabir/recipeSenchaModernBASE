utilForm = function () {
    
    formProcessor = {
        
        action : {
            packageRecipes: function (form) {
    
                var fields = form.getFields()

                for (let fieldName in fields) {
                    field = form.getFields()[fieldName]

                    if(field.getDirty() && 
                        (field.xtype === 'textfield' || 
                         field.xtype === 'textareafield' || 
                         fieldName.xtype === 'combobox' ||
                         fieldName.xtype === 'spinnerfield')) {
                            console.log(field.xtype)
                            console.log(field.reference)
                    }
        
                    if(field.getDirty() && field.xtype === 'image') {
                        console.log(field.xtype)
                        console.log(field.reference)
                    }
                }

            },
    
            packageIngredients: function () {
    
            }
        }

        
    }

}