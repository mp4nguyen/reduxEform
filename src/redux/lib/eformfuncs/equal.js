
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function EQUAL(radioGroups,templateClone,field,updatingFields,value){
    return new Promise((resolve,reject)=>{
        console.log('equal value = ',value);
        if(field.type == "eform_input_check_radio"){
            console.log('equal: comparing  value = ',value,' with field = ',field);
            if(field.value == value){
                field.checked = true;
                updatingFields.push(field.fieldPosition);
                resolve(true);
            }else{
                field.checked = false;
                updatingFields.push(field.fieldPosition);
                resolve(false);
            }
        }else{
            field.value = value;
            updatingFields.push(field.fieldPosition);
            resolve(value);
        }


    });
};
