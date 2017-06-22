
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function MAXHR85(templateClone,field,updatingFields,value){
    return new Promise((resolve,reject)=>{
        //console.log('equal value = ',value);
        field.value = (220 - value)*0.85;
        updatingFields.push(field.fieldPosition);
        resolve(value);
    });
};
