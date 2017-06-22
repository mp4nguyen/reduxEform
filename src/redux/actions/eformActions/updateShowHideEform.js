import {toastr} from 'react-redux-toastr'

import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;

export default function updateShowHideEform(){
    console.log('updateShowHideEform ...... ');
    return (dispatch,getState)=>{
        var eform = getState().eform;
        

        console.log('updateShowHideEform', eform.isShowUID);

        

        postRequest('/api/eform/update-eform-show-hide',{data:{IsShow: "Y", UID: eform.isShowUID.UID , userUID: eform.params.userUID}}).then(eformData => {
            // console.log('eformActions.saveEform: eformData = ',eformData);
            // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');
            toastr.success(eform.params.eformTemplateName, 'Enabled successfully !')
        });
    };
}
