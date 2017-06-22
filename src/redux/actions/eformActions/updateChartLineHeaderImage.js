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


    }, 500);
};
var stopTimer = function(){
    clearTimeout(timer);
};

export default function updateChartLineHeaderImage(sectionID,rowID,fieldID,valueHeader){

    //console.log('eformActions.updateChartLineImage = ',sectionID,rowID,fieldID,valueHeader);

    var updateStartAt = new Date();

    return (dispatch,getState)=>{

        // startTimer(getState);

        var eform = getState().eform;
        var updatingFields = [];
            var templateClone =  Object.assign({},eform.template);

        //console.log('templateClone updateChartLineImage: = ',templateClone);
        var field = util.getField(templateClone,{sectionID,rowID,fieldID});

        //console.log('eformActions.updateChartLineImage: field = ',field);

        if(field.type == "line_chart"){

            field.headerImage=valueHeader;

            updatingFields.push({sectionID,rowID,fieldID,value:""});
            
            // console.log('eform.template auto save chart header line', eform.template);
            var content = JSON.stringify(ConvertTemplateToFieldArray(eform.template));

            postRequest('/eform/update2',{data:{ID: eform.params.EFormDataID, userUID: eform.params.userUID, content: content}}).then(eformData => {
                // console.log('eformActions.saveEform: eformData = ',eformData);
                // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');

            });
        }



        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
