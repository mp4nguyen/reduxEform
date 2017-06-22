import {
        FETCH_PARAMS_FROM_URL,
        FETCH_EFORM_TEMPLATE_FROM_SERVER,
        FETCH_USER_ROLE_FROM_SERVER,
        FETCH_APPOINTMENT_FROM_SERVER,

        FETCH_APPOINTMENT_INFO_FROM_SERVER,
        FETCH_DOCTOR_INFO_FROM_SERVER,

        FETCH_PATIENT_FROM_SERVER,
        FETCH_EFORM_DATA_FROM_SERVER,
        FETCH_EFORM_ISSHOW_UID_FROM_SERVER,
        FILL_IN_DATA,
        UPDATE_FIELD,
        UPDATE_RADIO
      } from '../lib/types';

import * as util from '../lib/utilities';
import eformFuncs from '../lib/eformfuncs';

var peform = {
              template:{},
              userRole:{},
              PatientAppointment:{},
              Appointment:{},
              Patient:{},
              Doctor:{},
              eformData:{},
              isShowUID:{},
              updatingFields:[],
              radioGroups:{},
              fieldsByName:{},
              fieldsByRef:{},
              trigerFields:{},
              params:{}
            };





let eformReducer = function(eform = peform,action){
  switch(action.type){
    case FETCH_PARAMS_FROM_URL:
      return Object.assign({},eform,{params: action.payload});
    case FETCH_EFORM_TEMPLATE_FROM_SERVER:
      //store all radioGroups to control set check in each group -> to speed up the process as no need to find the fields in the same group

      return Object.assign({},eform,{template: action.template,radioGroups: action.radioGroups,fieldsByName: action.fieldsByName,fieldsByRef: action.fieldsByRef,trigerFields: action.trigerFields,otherEformDatas: action.otherEformDatas});

    case FETCH_USER_ROLE_FROM_SERVER:
      return Object.assign({},eform,{userRole: action.payload });
    case FETCH_APPOINTMENT_FROM_SERVER:
      return Object.assign({},eform,{PatientAppointment: action.payload });

    case FETCH_APPOINTMENT_INFO_FROM_SERVER:
      return Object.assign({},eform,{Appointment: action.payload });

    case FETCH_DOCTOR_INFO_FROM_SERVER:
      return Object.assign({},eform,{Doctor: action.payload });

    case FETCH_PATIENT_FROM_SERVER:
      return Object.assign({},eform,{Patient:  action.payload });
    case FETCH_EFORM_DATA_FROM_SERVER:
      return Object.assign({},eform,{eformData:  action.payload });

    case FETCH_EFORM_ISSHOW_UID_FROM_SERVER:
      return Object.assign({},eform,{isShowUID:  action.payload });
    
    case FILL_IN_DATA:
      return eform;
    case UPDATE_FIELD:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    default:
      console.log('----------default return value');
      return eform;
  }
}

export default eformReducer;
