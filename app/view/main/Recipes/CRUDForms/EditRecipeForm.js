Ext.define('FrontEnd.view.main.Recipes.CRUDForms.EditRecipeForm', {
    extend: 'Ext.form.Panel',
    xtype: 'editrecipeform',
    controller: 'recipeformcontroller',
    bodyPadding: 10,
    url: 'https://localhost:7270/api/recipe/update',

    isEditForm: true,
    id: 'editrecipeform',
    
    viewModel: {
        type: 'createrecipeformviewmodel'
    },

    setMaxSteps: function (value) {
        this.getViewModel().set('maxSteps', value);
    },

    getMaxSteps: function () {
        return this.getViewModel().get('maxSteps');
    },

    fill: function(data) {
        var instructions = data.instructions

        // Setup cards
        this.setupCards(instructions.length - 1)

        debugger
        instructions.forEach(instruction => {
            var instructionIndexName = 'instruction' + instruction['instructionIndex']

            // Create reference names
            // These will make setValues work
            // TODO: change setValues ?
            var instructionTextKey = instructionIndexName + '.text.instruction'
            var instructionIndexPictureName = instructionIndexName + '.instructionPicture'
            var instructionId = instructionIndexName + '.instructionId.instruction'
            
            // Set references in data
            data[instructionTextKey] = instruction['instructionValue'];
            data[instructionIndexPictureName] = instruction['instructionImage'];
            data[instructionId] = instruction['instructionId'];
        });


        // data.numberOfsteps = instructions.length

        this.setValues(data);

        
        // Update the image source in the edit ingredient form
        var imageComponent = this.down('image');
        if (imageComponent) {
            imageComponent.setSrc(imageUrl);
        }

        var imageComponents = this.query('[xtype=image]');
        imageComponents.forEach(comp => {
            if (comp.getReference() === 'recipeImage') {
                comp.setSrc(data['picture'])

            } 
            else {
                comp.setSrc(data[comp.getReference().split('.')[0] + '.' + comp.getReference().split('.')[1]])
            }

        });
    },

    setupCards: setCards ,

    bodyPadding: 0,
    defaultType: 'container',

    scrollable: false,

    bind: {
        // Bind the activeItem's index of the child element of this
        // form panel to the index prop of the viewmodel. Then the index prop, 
        // which is the active item index, is used to disable or enable components with the bind: {} config.
        activeItemIndex: '{index}', 

        // Bind the maxSteps from the view model
        maxSteps: '{maxSteps}'  
    },

    // This object holds a map of config properties that will update their binding as they are modified
    twoWayBindable: ['activeItemIndex', 'maxSteps'],
    defaults: {
        scrollable: Ext.is.Phone
    },

    items: 
    [{
        padding: 20,
        title: 'Information',
        defaults: {
            xtype: 'textfield'
        },
        
        items: 
        [{
            xtype: 'textfield',
            name: 'recipeId',
            allowBlank: false,
            hidden: true
        },{
            xtype: 'image',
            id: 'recipeImage',
            reference: 'recipeImage',
            width: 200,
            height: 200,
            src: 'picture',
            listeners: {
                tap: function(field, eopts) {
                    debugger
                    Ext.getCmp('editrecipeform').query('[name=recipeImage]')[0].getFileButton().buttonElement.dom.click()

                }
            }
        },{
            xtype: 'filefield',
            name: 'recipeImage',
            accept: 'image',
            hidden: true,
            iconCls: 'x-fas fa-pen',
            text: '',
            listeners: {
                change: function(field, newValue, oldValue, eOpts) {
                    // Handle file selection logic here
                    debugger
                    var imageData
                    var file = field.getFiles()[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        imageData = e.target.result;
                        // Update the image source with the new data
                        // Assuming your image component has an itemId of 'image'
                        // Ext.getCmp('editrecipeform').query('[reference=instruction0.picture]')[0]
                        Ext.getCmp('editrecipeform').query('[reference='+ field.config.name +']')[0].setSrc(imageData);
                        Ext.getCmp('editrecipeform').query('[name=recipeImage]')[0].setData(imageData);
                        // Ext.getCmp(imageReference).setSrc(imageData);
                        // Ext.getCmp('fileFieldWin').close()
                    };
                    reader.readAsDataURL(file);

                }            
            }            
        },{
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
                { abbr: '2', mealType: 'Lunch' },
                { abbr: '3', mealType: 'Dinner' },
                { abbr: '1', mealType: 'Breakfast' }
            ],
            name: 'mealType',
            listeners: {

            }
        }, {
            xtype: 'textareafield',
            label: 'Description',
            name: 'mealDescription',
            maxRows: 2,
            required: true,
        }, {
            xtype: 'spinnerfield',
            label: 'Number of Steps',
            name: 'numberOfsteps',
            minValue: 1,
            maxValue: 999,
            value: 1,
            listeners: {
                change: function(spinner, newIndexValue, oldIndexValue, eOpts) {
                    var form = spinner.up('editrecipeform');

                    if (newIndexValue > oldIndexValue) {
                        
                        var newIndexValue = spinner.getValue();
                        var newInstructionName = 'instruction' + (newIndexValue - 1);

                        // Check if the instruction with the same name already exists
                        if (!form.down('textareafield[name=' + newInstructionName + ']')) {
                            form.insert(form.items.length - 1, {
                                title: 'Instruction',
                                items: 
                                [
                                    {
                                        name: newInstructionName +'.instructionPicture.instruction',
                                        xtype: 'filefield',
                                        label: 'Add an image to illustrate the instructions',
                                        buttonOnly: true,
                                        hidden: true,
                                        listeners: {
                                            change: function(field, newValue, oldValue, eOpts) {
                                                // Handle file selection logic here
                                                debugger
                                                var imageData
                                                var file = field.getFiles()[0];
                                                if (file===undefined) { return }
                                                var reader = new FileReader();
                                                reader.onload = function(e) {
                                                    imageData = e.target.result;
                                                    Ext.getCmp('editrecipeform').query('[reference='+ field.config.name +']')[0].setSrc(imageData);
                                                    // Ext.getCmp('fileFieldWin').close()
                                                };
                                                reader.readAsDataURL(file);
                        
                                            }       
                                        }
                                    }, 
                                    {
                                        name: newInstructionName +'.profilePicture.instruction',
                                        xtype: 'image',
                                        width: 200,
                                        height: 200,
                                        src: 'https://placehold.co/600x400/EEE/31343C?font=lora&text=Tap%20to%20upload',
                                        reference: newInstructionName +'.instructionPicture.instruction', //This points to the fileField.
                                        listeners: {
                                            tap: function(comp, eopts) {
                                                debugger
                                                Ext.getCmp('editrecipeform').query('[name='+comp.config.reference+']')[0].getFileButton().buttonElement.dom.click()
                        
                                            }
                                        }
                                    },
                                    {
                                        name: newInstructionName +'.instructionId.instruction',
                                        xtype: 'textfield',
                                        allowBlank: false,
                                        hidden: true
                                    }, 
                                    {
                                        name: newInstructionName +'.text.instruction',
                                        xtype: 'textareafield',
                                        label: 'Enter ya instructions here..',
                                        required: true,
                                        // itemId: newInstructionName
                                    }
                                ]
                            });
                            form.updateLayout();
                            // Update the maxSteps in the view model
                            form.getViewModel().set('maxSteps', newIndexValue);
                        }
                    } else if (newIndexValue < oldIndexValue) {
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
                            form.getViewModel().set('maxSteps', newIndexValue);
                        }
                    }
                }
            }
        }]
    }, 
    // {
    //     padding: 20,
    //     title: 'Instruction',
    //     flex: 1,
    //     items: 
    //     [
    //         {
    //             name: 'instruction0.instructionPicture',
    //             xtype: 'image',
    //             width: 200,
    //             height: 200,
    //             // src: 'picture',
    //             reference: 'instruction0.instructionPicture',
    //             listeners: {
    //                 tap: function(comp, eopts) {
    //                     debugger
    //                     Ext.getCmp('editrecipeform').query('[name='+comp.config.reference+'][xtype=filefield]')[0].getFileButton().buttonElement.dom.click()

    //                 }
    //             }
    //         },
    //         {
    //             name: 'instruction0.instructionPicture',
    //             xtype: 'filefield',
    //             label: 'Add an image to illustrate the instructions',
    //             accept: 'image',
    //             iconCls: 'x-fas fa-pen',
    //             text: '',
    //             hidden: true,
    //             listeners: {
    //                 change: function(field, newValue, oldValue, eOpts) {
    //                     // Handle file selection logic here
    //                     debugger
    //                     var imageData
    //                     var file = field.getFiles()[0];
    //                     if (file===undefined) { return }
    //                     var reader = new FileReader();
    //                     reader.onload = function(e) {
    //                         imageData = e.target.result;
    //                         Ext.getCmp('editrecipeform').query('[reference='+ field.config.name +']')[0].setSrc(imageData);
    //                         // Ext.getCmp('fileFieldWin').close()
    //                     };
    //                     reader.readAsDataURL(file);

    //                 }       
    //             }
    //         }, 
    //         {
    //             name: 'instruction0.instructionId.instruction',
    //             xtype: 'textfield',
    //             allowBlank: false,
    //             hidden: true
    //         }, 
    //         {
    //             name: 'instruction0.text.instruction',
    //             xtype: 'textareafield',
    //             label: 'Enter ya instructions here..',
    //             required: true,
    //         }
    //     ]
    // }
    ],

    layout: {
        type: 'card',
        animation: {
            type: 'slide'
        }
    },

    tbar: [{
        xtype: 'component',
        flex: 1,
        bind: '{step}'
    }, {
        text: 'Reset',
        handler: 'onReset'
    }],

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
            handler: 'onEditRecipe',
            hidden: true,
            bind: {
                hidden: '{index < maxSteps}'  // Check if the current index is not the last step
            }
        }]
    }


});

function setCards(newIndexValue) {

    for (let index = 0; index < newIndexValue; index++) {
        // var newIndexValue = spinner.getValue();
        var newInstructionName = 'instruction' + (index);

        // Check if the instruction with the same name already exists
        if (!this.down('textareafield[name=' + newInstructionName + ']')) {
            this.insert(this.items.length - 1, {
                title: 'Instruction',
                items: 
                [
                    {
                        name: newInstructionName +'.instructionPicture.instruction',
                        xtype: 'filefield',
                        label: 'Add an image to illustrate the instructions',
                        buttonOnly: true,
                        hidden: true,
                        listeners: {
                            change: function(field, newValue, oldValue, eOpts) {
                                // Handle file selection logic here
                                debugger
                                var imageData
                                var file = field.getFiles()[0];
                                if (file===undefined) { return }
                                var reader = new FileReader();
                                reader.onload = function(e) {
                                    imageData = e.target.result;
                                    Ext.getCmp('editrecipeform').query('[reference='+ field.config.name +']')[0].setSrc(imageData);
                                    // Ext.getCmp('fileFieldWin').close()
                                };
                                reader.readAsDataURL(file);
        
                            }       
                        }
                    }, 
                    {
                        name: newInstructionName +'.profilePicture.instruction',
                        xtype: 'image',
                        width: 200,
                        height: 200,
                        src: 'https://placehold.co/600x400/EEE/31343C?font=lora&text=Tap%20to%20upload',
                        reference: newInstructionName +'.instructionPicture.instruction', //This points to the fileField.
                        listeners: {
                            tap: function(comp, eopts) {
                                debugger
                                Ext.getCmp('editrecipeform').query('[name='+comp.config.reference+']')[0].getFileButton().buttonElement.dom.click()
        
                            }
                        }
                    },
                    {
                        name: newInstructionName +'.instructionId.instruction',
                        xtype: 'textfield',
                        allowBlank: false,
                        hidden: true
                    }, 
                    {
                        name: newInstructionName +'.text.instruction',
                        xtype: 'textareafield',
                        label: 'Enter ya instructions here..',
                        required: true,
                        // itemId: newInstructionName
                    }
                ]
            });
            this.updateLayout();
            // Update the maxSteps in the view model
            this.getViewModel().set('maxSteps', newIndexValue);
        }
    }
}
