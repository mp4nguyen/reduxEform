
import {printRequest,postRequest,getRequest} from '../request';

/*
  this function is used to set default value for  textfield/areafield
  so far: just TODAY value
  will add more in the future
*/

export default function updatePatientInfo(infoType, infoField, patientUID, value){

    console.log('vo updatePatientInfo', infoType, infoField, patientUID, value);

    if (infoType && infoField && patientUID && value) {
      
      var data = {

        PatientInfo:{}
      };

      data.PatientInfo['UID'] = patientUID;        

      if (infoType == 'Kin') {

        data['PatientKin']={};

        if (infoField.trim() == 'ContactName') {
          value = value.trim();
          var arrValue = value.split(' ');
          var firstName = null;
          var middleName = null;
          var lastName = null;
          if (arrValue.length == 1) {
            firstName = arrValue[0];
            data.PatientKin['FirstName'] = firstName; 
            data.PatientKin['MiddleName'] = '';
            data.PatientKin['LastName'] = '';
          }else if(arrValue.length == 2) {
            firstName = arrValue[0];
            lastName = arrValue[1];
            data.PatientKin['FirstName'] = firstName;
            data.PatientKin['MiddleName'] = '';
            data.PatientKin['LastName'] = lastName;
          }else if(arrValue.length >= 3) {  
            firstName = arrValue[0];
            middleName='';
            for (var i = 1; i < arrValue.length - 1; i++) {
              middleName = middleName + ' ' + arrValue[i];
            }
            lastName = arrValue[arrValue.length - 1];
            data.PatientKin['FirstName'] = firstName;
            data.PatientKin['MiddleName'] = middleName;
            data.PatientKin['LastName'] = lastName;
          }
          
        }else{
          
          data.PatientKin[infoField.trim()] = value;        
        }
        
      }else{

        data.PatientInfo[infoField.trim()] = value;                      
        data['PatientKin']={};

      }

      var dataPost = {
        data: data
      }

      postRequest('/eform/update-patient-from-medical-history',dataPost).then(eformResponse => {

      },function(error){
        
      }); 
      
    } 

};
