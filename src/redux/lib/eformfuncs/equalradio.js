
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function EQUALRADIO(radioGroups,templateClone,func,field,updatingFields,value){
    return new Promise((resolve,reject)=>{

        console.log('field equalradio >>>>>>', field, 'func', func, 'value', value, 'radioGroups', radioGroups);

        if(field.type == "eform_input_check_radio"){

            var params = util.getParams(func);
            console.log('params equalradio>>>>>>', params);
            var isSet = false;
            if(params.length >= 2){
                for(var i = 1; i< params.length; i++){
                    console.log('params[i] equalradio>>>>>>', params[i]);
                    if(params[i] == value){
                        console.log('params[i]>>>>>>>>>>', params[i]);
                        field.checked = true;
                        isSet = true
                        updatingFields.push(field.fieldPosition);
                        break;
                    }
                }
            }

            console.log('isSet >>>>>>', isSet, 'field.checked', field.checked);


            if(!isSet){
                field.checked = false;
                updatingFields.push(field.fieldPosition);
            }
            resolve(field.checked);
            
        }else{
            field.value = value;
            updatingFields.push(field.fieldPosition);
            resolve(value);
        }


    });
};
