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

export default function updateAxisXField(sectionID,rowID,fieldID,rowAxisId,colAxisId,value){

    console.log('eformActions.updateAxisXField = ',sectionID,rowID,fieldID,rowAxisId,colAxisId,value);

    var updateStartAt = new Date();

    return (dispatch,getState)=>{

        startTimer(getState);

        var eform = getState().eform;
        var updatingFields = [];
            var templateClone =  Object.assign({},eform.template);
            //console.log('updateField:new 0. time = ',(new Date()) - updateStartAt ,' ms');
        console.log('templateClone updateAxisXField: = ',templateClone);
        var field = util.getField(templateClone,{sectionID,rowID,fieldID});

        console.log('eformActions.updateAxisXField: field = ',field);

        if(field.type == "line_chart" || field.type == "rec_chart"){
            if (value != "") {
                if (value.startsWith('-')) {
                    if (isNaN(value)==false) {
                        value = Number(value);
                    }else{
                        value=value;
                    }
                }else{
                    value = Number(value);

                }
                
            }
            field.series[rowAxisId].data[colAxisId]=value;

            updatingFields.push({sectionID,rowID,fieldID,value:""});
        }
        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
