import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';

var connectToServerAt;
var startEditAt;

/*
  the timer is used to save the data of the users after 2' user stop typing
*/
var timer;
var startTimer = function(getState){
    clearTimeout(timer);
    timer = setTimeout(()=>{

        console.log('start timer...............................................');
        var eform = getState().eform;
        console.log('eform.template save', eform.template);
        var content = JSON.stringify(ConvertTemplateToFieldArray(eform.template));

        postRequest('/eform/update2',{data:{ID: eform.params.EFormDataID, userUID: eform.params.userUID, content: content}}).then(eformData => {
            // console.log('eformActions.saveEform: eformData = ',eformData);
            // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');

        });


    }, 2000);
};
var stopTimer = function(){
    clearTimeout(timer);
};

export default function updateField(sectionID,rowID,fieldID,value){

    // console.log('sectionID,rowID,fieldID',sectionID,rowID,fieldID);

    var updateStartAt = new Date();

    return (dispatch,getState)=>{

        startTimer(getState);

        var eform = getState().eform;
        var updatingFields = [];
        var changedFields = [];
            var templateClone =  Object.assign({},eform.template);
            console.log('updateField:new 0. time = ',(new Date()) - updateStartAt ,' ms');
        var field = util.getField(templateClone,{sectionID,rowID,fieldID});
            /*
            var getFieldStartAt = new Date();
            var section = templateClone.sections[sectionID];
            console.log('getField: 0. time = ',(new Date()) - getFieldStartAt ,' ms');
            var row = section.rows[rowID];
            console.log('getField: 1. time = ',(new Date()) - getFieldStartAt ,' ms');
            var field = row.fields[fieldID];
            console.log('getField: 02. time = ',(new Date()) - getFieldStartAt ,' ms field = ',field);
            */
            console.log('updateField:new 1. time = ',(new Date()) - updateStartAt ,' ms');

            var currentChecked = field.checked;
            console.log('currentChecked', currentChecked);

            if(field.type == "eform_input_check_radio"){
                var radioGroup = eform.radioGroups[field.name];
                radioGroup.forEach(e=>{

                    var radioTempField = templateClone.sections[e.fieldPosition.sectionID].rows[e.fieldPosition.rowID].fields[e.fieldPosition.fieldID];
                    if(radioTempField.checked){

                        radioTempField.checked = false;

                        //this is used for radio button, some FUNC use ref and some use name of radio button;
                        //if function use name; just add 1 changedField to trigger
                        //if use ref, must add all trigerFields
                        //this is to prevent trigger FUNC by name many time as the radiobuuton added above
                        if(eform.trigerFields[radioTempField.ref]){
                            changedFields.push({field:radioTempField,value:false});
                        }

                        updatingFields.push({sectionID:e.fieldPosition.sectionID,rowID:e.fieldPosition.rowID,fieldID:e.fieldPosition.fieldID,value:""});
                    }
                });

                if (field.value == value && currentChecked == true) {
                    field.checked = false;
                }else{
                    field.checked = true;
                }

                // field.checked = true;
                updatingFields.push({sectionID,rowID,fieldID,value:""});
            }else{

                if (field.type == "eform_input_check_checkbox") {

                    if (value && value ==true) {
                        field.value="yes";
                        field.checked = true;
                    }else{
                        field.value="no";
                        field.checked = false;
                    }

                    updatingFields.push({sectionID,rowID,fieldID,value});

                } else if (field.type == "eform_input_text"){

                    field.value = value
                    if (value && value !='') {
                        field.required = false;
                    }else{
                        if (field.saveRequired) {
                            field.required = true;
                        }
                    }

                    updatingFields.push({sectionID,rowID,fieldID,value:""});

                }else if(field.type == "eform_input_signature"){

                    field.value = value;
                    updatingFields.push({sectionID,rowID,fieldID,value});

                }else if(field.type == "eform_input_image_doctor"){
                    if (value.hasOwnProperty("main")) {
                        field.valueSign = value;
                        field.isPrintDoctor = false;
                    }else{
                        field.image = value;
                        field.isPrintDoctor = true;
                    }
                    
                    updatingFields.push({sectionID,rowID,fieldID,value});

                }else{
                    field.value = value
                    updatingFields.push({sectionID,rowID,fieldID,value:""});
                }

            }
            //console.log("update value for ",field);
            ///trigger all relevent calculations of this field

                console.log('updateField: 2. time = ',(new Date()) - updateStartAt ,' ms');

            if (field.type !== "eform_input_signature" && field.type !== "eform_input_image_doctor" && field.type !== "eform_input_image_patient" ) {
                // calculatingEform(eform.radioGroups,eform.fieldsByName,eform.fieldsByRef,templateClone,field,eform.trigerFields,updatingFields,value)
                // console.log('updateField: 3. time = ',(new Date()) - updateStartAt ,' ms');
                // dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});


                if(eform.trigerFields[field.name] || eform.trigerFields[field.ref]){
                    //console.log('updateField: will calculatingEform');
                    changedFields.push({field,value});
                }

                if(changedFields.length > 0){
                    calculatingEform(eform.radioGroups,eform.fieldsByName,eform.fieldsByRef,templateClone,changedFields,eform.trigerFields,updatingFields,value).then(msg=>{
                        //console.log(" 2. calculatingEform msg = ",msg);
                        console.log('updateField: 3. time end of calculating = ',(new Date()) - updateStartAt ,' ms');
                        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
                    });
                }else {
                    console.log('updateField: 3. time end without calculating= ',(new Date()) - updateStartAt ,' ms');
                    dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
                }
            } else {
                console.log('updateField: 3. time end without calculating = ',(new Date()) - updateStartAt ,' ms');
                dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
            }

    };

}
