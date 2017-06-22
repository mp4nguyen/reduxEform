import {toastr} from 'react-redux-toastr'

import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;

export default function saveEform(sectionID,rowID,fieldID,value){
    // console.log('eformActions.saveEform: is running ...... ');
    return (dispatch,getState)=>{
        var eform = getState().eform;
        var saveStartAt = new Date();

        // console.log('eform.template save', eform.template);

        var content = JSON.stringify(ConvertTemplateToFieldArray(eform.template,false));

        // console.log('eformActions.saveEform: content = ',content);
        // console.log('eform.params.formUID = ',eform.params.formUID);

        //postRequest('/eform/update',{UID: eform.params.formUID, userUID: eform.params.userUID, content: content}).then(eformData => {
        postRequest('/eform/update2',{data:{ID: eform.params.EFormDataID, userUID: eform.params.userUID, content: content}}).then(eformData => {
            // console.log('eformActions.saveEform: eformData = ',eformData);
            // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');
            toastr.success(eform.params.eformTemplateName, 'Saved successfully !')
        });
    };
}
