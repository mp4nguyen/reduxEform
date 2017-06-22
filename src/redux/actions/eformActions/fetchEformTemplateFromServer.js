
import {toastr} from 'react-redux-toastr'
import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';
import transformEformData from '../../lib/transformEformData';
import getOtherEformDatas from '../../lib/getEformDatas';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


export default function fetchEformTemplateFromServer(params){


    return dispatch => {

        connectToServerAt = new Date();

        console.log('eformActions.fetchEformTemplateFromServer is running; params = ',params);
        console.log('eformActions.fetchEformTemplateFromServer is running; connectToServerAt = ',connectToServerAt);

        //https://dev1.redimed.com.au:3065/eform/load-detail-eform

        var arrTemp = params.userUID.split('-k-n-'); 

        var reqParam = {};

        console.log('params.userUID', params.userUID, 'arrTemp', arrTemp);
        var _strToken = '';
        var _userUidStr ='';

        if (arrTemp && arrTemp.length>0) {            
            var reqParamTemp = {
              "data": {
                "EFormTemplateUID": params.templateUID,//"e6b05150-4b5f-468d-ac9e-c456790bc0de",
                // "UserUID": params.userUID,//"ddc9e298-227c-46c0-917b-a350bf9ede6c",
                "UserUID": arrTemp[0],//"ddc9e298-227c-46c0-917b-a350bf9ede6c",
                "AppointmentUID": params.appointmentUID,//"0bd47b1d-e72c-430f-afa3-70243462c684",
                "PatientUID": params.patientUID,//"e8d889ea-1be2-40b1-9b86-72e226104af4"
                "Token": arrTemp[1],//"e8d889ea-1be2-40b1-9b86-72e226104af4"
              }
            };
            _userUidStr = arrTemp[0];
            _strToken = arrTemp[1];
            reqParam = reqParamTemp;
        }else{
            var _reqParamTemp = {
              "data": {
                "EFormTemplateUID": params.templateUID,//"e6b05150-4b5f-468d-ac9e-c456790bc0de",
                "UserUID": params.userUID,//"ddc9e298-227c-46c0-917b-a350bf9ede6c",
                "AppointmentUID": params.appointmentUID,//"0bd47b1d-e72c-430f-afa3-70243462c684",
                "PatientUID": params.patientUID//"e8d889ea-1be2-40b1-9b86-72e226104af4"                
              }
            };
            reqParam = _reqParamTemp;
            _userUidStr = params.userUID;
        }                    

        var radioGroups={};
        //store all calculate during input the value of the fields -> to speed up the process as no need to find the fields when calculating
        var fieldsByName = {};
        var fieldsByRef = {};
        var trigerFields = {};

        var otherEformDatas = {};//to store data of other eformdata
        var eformDataFields = [];//to store all fields need data from orther eforms
        var eformDataList = {};//to store eform name

        var dispatchTemplate = function(template){

            console.log('eformDataList >>>>>>', eformDataList);

            getOtherEformDatas(eformDataList,params.appointmentId,otherEformDatas).then(status=>{
                //copy data from other eform to current eform
                var arrIndex =[];

                if (otherEformDatas.hasOwnProperty("Audios")) {

                   if(trigerFields)
                    {
                        var totalHzRight = 0;
                        var totalHzLeft = 0;
                        var arrRelateFieldsRightAVG = "";
                        var arrRelateFieldsLeftAVG = "" ;
                        var fieldPositionAVGRight = 0;
                        var fieldPositionAVGLeft = 0;
                        if(trigerFields.hasOwnProperty("hear_at_freq_rig_05"))
                        {
                            arrRelateFieldsRightAVG =   util.getParams(trigerFields["hear_at_freq_rig_05"][0].cal);
                            fieldPositionAVGRight =   trigerFields["hear_at_freq_rig_05"][0].field.fieldPosition;
                        }
                        if(trigerFields.hasOwnProperty("hear_at_freq_lef_05"))
                        {
                            arrRelateFieldsLeftAVG =   util.getParams(trigerFields["hear_at_freq_lef_05"][0].cal);
                            fieldPositionAVGLeft =  trigerFields["hear_at_freq_lef_05"][0].field.fieldPosition;
                        }
                    }


                    // console.log('Audios enter', otherEformDatas);
                    if (otherEformDatas["Audios"].hasOwnProperty("audiogram_image")) {
                        // console.log('audiogram_image enter', otherEformDatas);
                        var series = otherEformDatas["Audios"]["audiogram_image"].series;

                        eformDataFields.forEach((preCalField,index)=>{
                            var preCalParams = util.getParams(preCalField.preCal);
                            if (preCalParams[1]=="Workcover audio form") {
                                var arrObj = preCalParams[0].split("_");
                                var indexSeries = arrObj[0];
                                var indexData = arrObj[1];

                                preCalField.value = series[indexSeries].data[indexData];

                                var _index = arrRelateFieldsRightAVG.indexOf(preCalField.name);
                                if (_index >=0) {
                                    totalHzRight = totalHzRight + preCalField.value;

                                }

                                var _indexLeft = arrRelateFieldsLeftAVG.indexOf(preCalField.name);
                                if (_indexLeft >=0) {
                                    totalHzLeft = totalHzLeft + preCalField.value;
                                }

                                arrIndex.push(index);
                            }

                        });
                    }else {

                        var series = otherEformDatas.Audios.chart_base64_image.series;

                        eformDataFields.forEach((preCalField,index)=>{
                            var preCalParams = util.getParams(preCalField.preCal);
                            if (preCalParams[1]=="Workcover audio form") {
                                var arrObj = preCalParams[0].split("_");
                                var indexSeries = arrObj[0];
                                var indexData = arrObj[1];

                                preCalField.value = series[indexSeries].data[indexData];

                                var _index = arrRelateFieldsRightAVG.indexOf(preCalField.name);
                                if (_index >=0) {
                                    totalHzRight = totalHzRight + preCalField.value;
                                }

                                var _indexLeft = arrRelateFieldsLeftAVG.indexOf(preCalField.name);
                                if (_indexLeft >=0) {
                                    totalHzLeft = totalHzLeft + preCalField.value;
                                }

                                arrIndex.push(index);
                            }

                        });

                    }
                    if(trigerFields.hasOwnProperty("hear_at_freq_rig_05"))
                    {
                        template.sections[fieldPositionAVGRight.sectionID].rows[fieldPositionAVGRight.rowID].fields[fieldPositionAVGRight.fieldID].value=totalHzRight/4;
                    }
                    if(trigerFields.hasOwnProperty("hear_at_freq_lef_05"))
                    {
                        template.sections[fieldPositionAVGLeft.sectionID].rows[fieldPositionAVGLeft.rowID].fields[fieldPositionAVGLeft.fieldID].value=totalHzLeft/4;
                    }
                }

                // // console.log('eformDataFields',eformDataFields, arrIndex);
                // for (var i = 0; i < eformDataFields.length; i++) {
                //     if(eformDataFields[i].preCal.indexOf('Workcover audio form')>-1){
                //         eformDataFields.splice(arrIndex[i],1);
                //     }
                // }
                // console.log('eformDataFields',eformDataFields);

                // else{
                    // console.log('eformDataFields >>>', eformDataFields, otherEformDatas);

                    eformDataFields.forEach(preCalField=>{
                        var preCalParams = util.getParams(preCalField.preCal);
                        console.log('preCalParams >>>',preCalParams);
                        var eformDataObjectTemp = otherEformDatas[preCalParams[1]];
                        if(eformDataObjectTemp){
                            var fieldTemp = eformDataObjectTemp[preCalParams[0]];
                            if(preCalField.type == 'eform_input_check_radio'){
                                //console.log('eformActions: eformDataObjectTemp = ',eformDataObjectTemp);
                                // console.log('eformActions: fieldTemp = ',fieldTemp);
                                // console.log('eformActions: preCalField = ',preCalField);
                                if(preCalField.value == fieldTemp.value){
                                    preCalField.checked = fieldTemp.checked;
                                }else{
                                    if(fieldTemp.groups && fieldTemp.groups.length > 0){
                                        fieldTemp.groups.forEach(fieldInGroup=>{
                                            if(preCalField.value == fieldInGroup.value){
                                                preCalField.checked = fieldInGroup.checked;
                                            }
                                        });
                                    }
                                }
                            }else{
                                preCalField.value = fieldTemp.value;
                            }
                        }
                    });
                // }

                dispatch({type: types.FETCH_EFORM_TEMPLATE_FROM_SERVER,template,radioGroups,fieldsByName,fieldsByRef,trigerFields,otherEformDatas});
            });
        };

        //postRequest('/eform/load-detail-eform',reqParam).then(eformResponse => {
        console.log('reqParam >>>>',reqParam);

        postRequest('/eform/load-detail-eform2',reqParam).then(eformResponse => {
            console.log(' eformResponse = ',eformResponse);

            // if (eformResponse == 'Expired') {
            //     toastr.error(eform.params.eformTemplateName, 'Expired Link !');
            // }
            // else{

                var _userRole={};

                if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.UserAccount ){
                    _userRole = eformResponse.data.data.UserAccount[0];
                    dispatch({type: types.FETCH_USER_ROLE_FROM_SERVER,payload: eformResponse.data.data.UserAccount[0]});
                }

                if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.PatientAppointment ){
                    dispatch({type: types.FETCH_APPOINTMENT_FROM_SERVER,payload: eformResponse.data.data.PatientAppointment});
                }

                if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.Appointment ){
                    dispatch({type: types.FETCH_APPOINTMENT_INFO_FROM_SERVER,payload: eformResponse.data.data.Appointment});
                }

                if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.Doctor ){
                    let doctorsObject = {};
                    
                    eformResponse.data.data.Doctor.forEach(doctor=>{
                        let doctorType = doctorsObject[doctor.DoctorType];                    
                        if(doctorType){
                            
                            doctorType.push(doctor)
                        }else{
                            doctorsObject[doctor.DoctorType] = [doctor];
                        }
                    })                



                    eformResponse.data.data.Doctor = doctorsObject;
                    dispatch({type: types.FETCH_DOCTOR_INFO_FROM_SERVER,payload: doctorsObject});
                }

                // if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.EFormData && eformResponse.data.data.EFormData.EFormID){
                if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.EFormData && eformResponse.data.data.EFormData.ID){
                    // params.EFormDataID = eformResponse.data.data.EFormData.EFormDataID;

                    // params.eformID = eformResponse.data.data.EFormData.EFormID;
                    params.eformID = eformResponse.data.data.EFormData.ID;

                    //params.formUID = eformResponse.data.data.EFormData.EFormUID;
                    params.formUID = eformResponse.data.data.EFormData.UID;


                    params.printType = eformResponse.data.data.EformTemplate.PrintType;
                    params.eformTemplateName= eformResponse.data.data.EformTemplate.EFormTemplateName;
                    params.appointmentId = eformResponse.data.data.Appointment.ID;
                    params.apptFrom =  eformResponse.data.data.Appointment.FromTime;
                    params.toFrom =  eformResponse.data.data.Appointment.ToTime;

                    params.EFormDataID = eformResponse.data.data.EFormData.ID;

                    params.Token = _strToken;

                    console.log('params>>>>', params, '_strToken>>>>', _strToken);

                    dispatch({type: types.FETCH_PARAMS_FROM_URL,payload: params});
                    //create an object to store the data as hashtable, ref of field as an property name
                    //if field is the table => create the table object that containts all field of table
                    //to access the table data, access table object first by ref and then use refChild to access the table field
                    //var data = JSON.parse(eformResponse.data.data.EFormData.FormData);
                    if(eformResponse.data.data.EFormData.FormData){
                        // console.log('eformResponse.data.data.EFormData.FormData', eformResponse.data.data.EFormData.FormData);
                        var dataInObject = util.convertEformDataStringToObject(eformResponse.data.data.EFormData.FormData);

                        dispatch({type: types.FETCH_EFORM_DATA_FROM_SERVER,payload: dataInObject });
                    }

                    console.log('dataInObject >>>>>>>>', dataInObject);

                    var infoEform ={
                        IsShow : null,
                        UID : null
                    }

                    if(eformResponse.data.data.EFormData.IsShow){

                        infoEform.IsShow = eformResponse.data.data.EFormData.IsShow;

                        if (eformResponse.data.data.EFormData.UID) {
                            infoEform.UID = eformResponse.data.data.EFormData.UID;
                        }

                        console.log('eformResponse.data.data.EFormData.IsShow', eformResponse.data.data.EFormData.IsShow);
                        dispatch({type: types.FETCH_EFORM_ISSHOW_UID_FROM_SERVER,payload: infoEform });
                    }

                    var template = JSON.parse(eformResponse.data.data.EformTemplate.TemplateData);
                    template["userRole"]=_userRole;

                    console.log('template >>>aaaa', template);


                    console.log("eformActions: duration to 1:",(new Date()) - connectToServerAt);
                    transformEformData(template,eformResponse.data.data,dataInObject,radioGroups,fieldsByName,fieldsByRef,trigerFields,eformDataFields,eformDataList).then(()=>{
                        console.log("eformActions: duration to 2:",(new Date()) - connectToServerAt);
                        // console.log("eformActions: eformDataFields = ",eformDataFields);
                        // console.log("eformActions: eformDataList = ",eformDataList);
                        //if eformDataList >=1 => need to get data from other eforms => connect to server to get data
                        dispatchTemplate(template);

                    });


                }else{
                    console.log('No data in formdata');
                    //postRequest('/eform/saveInit',{templateUID: params.templateUID, appointmentUID: params.appointmentUID, tempData: "", name: eformResponse.data.data.EformTemplate.EFormTemplateName , patientUID: params.patientUID, userUID: params.userUID}).then(eformData => {

                    var dataPost = {
                        templateUID: params.templateUID, 
                        appointmentUID: params.appointmentUID, 
                        tempData: "", 
                        name: eformResponse.data.data.EformTemplate.EFormTemplateName , 
                        patientUID: params.patientUID, 
                        // userUID: params.userUID
                        userUID:_userUidStr
                    };
                    
                    postRequest('/eform/saveInit2',{data: dataPost}).then(eformData => {
                        console.log('eformActions.fetchEformTemplateFromServer; /eform/checkDetail eformData = ',eformData);
                        params.formUID = eformData.data.data.UID;
                        params.eformID = eformData.data.data.ID;
                        params.printType = eformResponse.data.data.EformTemplate.PrintType;
                        params.eformTemplateName= eformResponse.data.data.EformTemplate.EFormTemplateName;
                        params.appointmentId = eformResponse.data.data.Appointment.ID;
                        params.apptFrom =  eformResponse.data.data.Appointment.FromTime;
                        params.toFrom =  eformResponse.data.data.Appointment.ToTime;

                        params.EFormDataID = eformData.data.data.ID;
                        params.Token = _strToken;

                        var template = JSON.parse(eformResponse.data.data.EformTemplate.TemplateData);
                        template["userRole"]=_userRole;                    

                        dispatch({type: types.FETCH_PARAMS_FROM_URL,payload: params});

                        dispatch({type: types.FETCH_EFORM_DATA_FROM_SERVER,payload: {} });

                        transformEformData(template,eformResponse.data.data,{},radioGroups,fieldsByName,fieldsByRef,trigerFields,eformDataFields,eformDataList).then(()=>{
                            dispatchTemplate(template);
                            //dispatch({type: types.FETCH_EFORM_TEMPLATE_FROM_SERVER,template,radioGroups,fieldsByName,fieldsByRef,trigerFields,otherEformDatas});
                        });

                    });

                }  
            // }
            
        },function(err){
            console.log('error 11111>>>', err);
            
            if (err.toString().indexOf('403')>-1) {
                console.log('error 2222>>>', err);    
                toastr.error('This link is Expired');

                // window.open('','_self').close();
                window.close();
                
            }            
        });

    };
}
