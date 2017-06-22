import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';
import updatePatientInfo from '../../lib/eformfuncs/updatePatientInfo';


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

export default function onMyBlur(sectionID, rowID, fieldID, value){
    console.log('onblur is running...... = ',sectionID, rowID, fieldID, value);
    return (dispatch,getState)=>{
        var eform = getState().eform;
        
        var templateClone =  Object.assign({},eform.template);        
        var field = util.getField(templateClone,{sectionID,rowID,fieldID});

        console.log('field >>>>>',field);

        var func = '';
        var params = [];
        if (field.preCal) {
            if (field.preCal.indexOf('updatePatientInfo')>-1) {
                params = util.getParams(field.preCal);
                updatePatientInfo(params[0], params[1], eform.params.patientUID, value)
            }else{
                if (field.cal) {
                    if (field.cal.indexOf('updatePatientInfo')>-1) {

                        params = util.getParams(field.cal);
                        console.log('vvvvvvvvvaaaaaaaaaaaaa',params[0], params[1], eform.params.patientUID, value);
                        updatePatientInfo(params[0], params[1], eform.params.patientUID, value)
                    }
                } 
            }   
        }else{
            if (field.cal) {
                if (field.cal.indexOf('updatePatientInfo')>-1) {
                    params = util.getParams(field.cal);
                    updatePatientInfo(params[0], params[1], eform.params.patientUID, value)
                }
            }    
        }
            
    };
}
