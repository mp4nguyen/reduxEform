import {toastr} from 'react-redux-toastr'

import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;

export default function submitEform(sectionID,rowID,fieldID,value){
    console.log('eformActions. submitEform: is running ......  ');
    return (dispatch,getState)=>{
        var eform = getState().eform;
        var saveStartAt = new Date();

        // console.log('eform.template save', eform.template);
        console.log('arrTemp 00000>>>', arrTemp);

        var content = JSON.stringify(ConvertTemplateToFieldArray(eform.template,false));

        // console.log('eformActions.saveEform: content = ',content);
        // console.log('eform.params.formUID = ',eform.params.formUID);

        var _params = getState().eform.params;  
        console.log('_params >>>>', _params);     

        var arrTemp = _params.userUID.split('-k-n-');            
        var reqParam = {};

        console.log('arrTemp >>>', arrTemp);

        if (arrTemp && arrTemp.length>0) {  

            var reqParamTemp = {
              data: {
                ID: eform.params.EFormDataID, 
                userUID: arrTemp[0], 
                content: content,
                Token: arrTemp[1]
              }
            };
            reqParam = reqParamTemp;
        }else{
            var _reqParamTemp = {
              data: {
                ID: eform.params.EFormDataID, 
                userUID: eform.params.userUID, 
                content: content                
              }
            };
            reqParam = _reqParamTemp;
        }        

        //postRequest('/eform/update',{UID: eform.params.formUID, userUID: eform.params.userUID, content: content}).then(eformData => {
        postRequest('/eform/update2',reqParam).then(eformData => {
            // console.log('eformActions.saveEform: eformData = ',eformData);
            // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');                            

            toastr.success(eform.params.eformTemplateName, 'Saved successfully !');
            // window.open('','_self').close();
            // window.close();
            // window.top.close();
            // var myWindow = window.open(location, "_self");
            // myWindow.document.write("");
            // setTimeout (function() {myWindow.close();},5000);
            // open(location, '_self').close();
            // console.log('dong')


            var objWindow = window.open(location.href, "_self");
            objWindow.close();

            
  

        });
    };
}
