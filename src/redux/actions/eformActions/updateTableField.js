import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr'

import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';
import transformEformData from '../../lib/transformEformData';
import getOtherEformDatas from '../../lib/getEformDatas';

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


export default function updateTableField(sectionID,rowID,fieldID,rowTableId,colTableId,value){

    console.log('eformActions.updateTableField = ',sectionID,rowID,fieldID,rowTableId,colTableId,value);

    var updateStartAt = new Date();

    return (dispatch,getState)=>{

        var eform = getState().eform;
        var updatingFields = [];
            var templateClone =  Object.assign({},eform.template);
            //console.log('updateField:new 0. time = ',(new Date()) - updateStartAt ,' ms');
        var field = util.getField(templateClone,{sectionID,rowID,fieldID});

        console.log('eformActions.updateTableField: field = ',field);

        if(field.type == "table" && field.tableData){
            var tableField = field.tableData[rowTableId][colTableId];
            tableField.value = value;

            console.log("table field", tableField);

            console.log('eformActions.updateTableField: tableField = ',tableField);
            updatingFields.push({sectionID,rowID,fieldID,value:""});
        }
        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
