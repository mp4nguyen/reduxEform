
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function REQUIRED(fieldsByName,fieldsByRef,template,func,field,updatingFields){

    //preCal
    if(fieldsByName.preCal == 'REQUIRED()') {
        fieldsByName.required = true;
        return true;
    }

    //cal
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var isRequired = false;

        for(var i=0;i<params.length;i++){
            var param = params[i];
            var inputField;
            if(param.indexOf('field_')>-1){
                inputField = fieldsByRef[param];
            }else{
                inputField = fieldsByName[param];
            }
            var inputValue = util.getField(template,inputField.fieldPosition).checked;
            if(inputValue){
                isRequired = inputValue;
                break;
            }
        }

        var gotField = util.getField(template,field.fieldPosition);
        gotField.saveRequired = isRequired;
        gotField.required = isRequired;
        updatingFields.push(gotField.fieldPosition);
        //console.log('inputValue REQUIRED>>>>gotField = ', gotField);
        resolve(isRequired)

    });

};
