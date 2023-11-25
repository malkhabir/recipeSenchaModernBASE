Ext.define('FrontEnd.view.main.Recipes.CRUDForms.CreateRecipeForm', {
    extend: 'Ext.form.Panel',
    xtype: 'createrecipeform',
    controller: 'recipeformcontroller',
    bodyPadding: 10,
    url: 'https://localhost:7270/api/ingredient/',
    id: 'createrecipeform',
    
    viewModel: {
        type: 'createrecipeformviewmodel'
    },

    setMaxSteps: function (value) {
        this.getViewModel().set('maxSteps', value);
    },

    bodyPadding: 0,
    defaultType: 'container',

    scrollable: false,

    bind: {
        activeItemIndex: '{index}',
        maxSteps: '{maxSteps}'  // Bind the maxSteps from the view model
    },
    twoWayBindable: ['activeItemIndex', 'maxSteps'],

    layout: {
        type: 'card',
        animation: {
            type: 'slide'
        }
    },

    bbar: {
        reference: 'buttonToolbar',
        items: [{
            text: 'Back',
            handler: 'onBack',
            bind: {
                disabled: '{index === 0}'
            }
        }, {
            text: 'Next',
            handler: 'onNext',
            bind: {
                hidden: '{index === maxSteps}',  // Check if the current index is the last step
            }
        }, {
            text: 'Submit',
            handler: 'onSubmit',
            hidden: true,
            bind: {
                hidden: '{index < maxSteps}'  // Check if the current index is not the last step
            }
        }]
    },

    tbar: [{
        xtype: 'component',
        flex: 1,
        bind: '{step}'
    }, {
        text: 'Reset',
        handler: 'onReset'
    }],

    defaults: {
        scrollable: Ext.is.Phone
    },

    items: [{
        padding: 20,
        title: 'Information',
        defaults: {
            xtype: 'textfield'
        },
        
        items: [{
            xtype: 'filefield',
            label: 'Click here to upload a picture of the meal',
            name: 'pictureUpload',
            buttonOnly: true,
            listeners: {
                change: function(fileField, value, eOpts) {
                    // Handle file upload logic here if needed
    
                    // Assuming you have an Ext.Img component with itemId 'imagePreview'
                    var imagePreview = fileField.up('container').down('image[itemId=imagePreview]');
                    
                    // Display the uploaded image in the preview
                    if (imagePreview) {
                        var file = fileField.fileInputEl.dom.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                imagePreview.setSrc(e.target.result);
                            };
                            reader.readAsDataURL(file);
                        }
                    }
                }
            }
        }, {
            xtype: 'textfield',
            label: 'Recipe Name',
            name: 'recipeName',
            required: true,
        }, {
            xtype: 'combobox',
            label: 'Select meal type',
            queryMode: 'local',
            displayField: 'mealType',
            valueField: 'abbr',
            required: true,
            store: [
                { abbr: 'AL', mealType: 'Lunch' },
                { abbr: 'AK', mealType: 'Dinner' },
                { abbr: 'AZ', mealType: 'Breakfast' }
            ]
        }, {
            xtype: 'textareafield',
            label: 'Description',
            name: 'mealDescription',
            maxRows: 2,
            required: true,
        }, {
            xtype: 'spinnerfield',
            label: 'Number of steps',
            name: 'numberOfsteps',
            minValue: 1,
            value: 1,
            listeners: {
                change: function(spinner, newValue, oldValue, eOpts) {
                    var form = spinner.up('createrecipeform');
                    var currentItems = form.items.items;
                    // debugger

                    if (newValue > oldValue) {
                        
                        var newValue = spinner.getValue();
                        var uniqueName = 'instruction' + newValue;

                        // Check if the instruction with the same name already exists
                        if (!form.down('textareafield[name=' + uniqueName + ']')) {
                            form.insert(form.items.length - 1, {
                                title: 'Instruction',
                                items: [{
                                    xtype: 'textareafield',
                                    label: 'Enter ya instructions here..',
                                    name: uniqueName,
                                    required: true,
                                    itemId: uniqueName
                                }]
                            });
                            form.updateLayout();
                            // Update the maxSteps in the view model
                            form.getViewModel().set('maxSteps', newValue);
                        }
                    } else if (newValue < oldValue) {
                        // Query all containers
                        var allContainers = form.query('container');
                    
                        // Find the last added instruction container
                        var lastInstructionContainer = null;
                        for (var i = allContainers.length - 1; i >= 0; i--) {
                            var container = allContainers[i];
                            var textareaField = container.down('textareafield[label=Enter ya instructions here..]');
                            if (textareaField) {
                                lastInstructionContainer = container;
                                break;
                            }
                        }
                    
                        // Remove the last added instruction container only if there is more than one
                        if (lastInstructionContainer && allContainers.length > 1) {
                            form.remove(lastInstructionContainer);
                            form.updateLayout();
                    
                            // Update the maxSteps in the view model
                            form.getViewModel().set('maxSteps', newValue);
                        }
                    }
                }
            }
        }]
    }, {
        padding: 20,
        title: 'Instruction',
        flex: 1,
        items: [{
            xtype: 'textareafield',
            label: 'Enter ya instructions here..',
            required: true,
        }]
    }]
});
