

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


    }, 500);
};
var stopTimer = function(){
    clearTimeout(timer);
};

export default function updateChartLineImage(sectionID,rowID,fieldID,valueImage){

    //console.log('eformActions.updateChartLineImage = ',sectionID,rowID,fieldID,valueImage);

    var updateStartAt = new Date();

    return (dispatch,getState)=>{

        // startTimer(getState);

        var eform = getState().eform;
        var updatingFields = [];
            var templateClone =  Object.assign({},eform.template);

        var field = util.getField(templateClone,{sectionID,rowID,fieldID});

        console.log('eformActions.updateChartLineImage: field = ',field);

        if(field.type == "line_chart"){

            field.image=valueImage;

            updatingFields.push({sectionID,rowID,fieldID,value:""});

            
            // console.log('eform.template auto save chart image line', eform.template);
            // var content = JSON.stringify(ConvertTemplateToFieldArray(eform.template));

            // postRequest('/eform/update2',{data:{ID: eform.params.EFormDataID, userUID: eform.params.userUID, content: content}}).then(eformData => {               
            // });
        }

        if(field.type == "rec_chart"){

            field.image=valueImage;

            updatingFields.push({sectionID,rowID,fieldID,value:""});

            var contentRec = JSON.stringify(ConvertTemplateToFieldArray(eform.template));

            postRequest('/eform/update2',{data:{ID: eform.params.EFormDataID, userUID: eform.params.userUID, content: contentRec}}).then(eformData => {               
            });
        }

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
