
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/

export default function EQUALGROUPRADIOS(radioGroups,func,field,updatingFields){
    console.log('equalgroupradios: is running ......');
    return new Promise((resolve,reject)=>{

        if(field.type == "eform_input_check_radio"){
            var params = util.getParams(func);
            updatingFields.push(field.fieldPosition);

            if(params.length > 0){
                let operation = params[0];
                let values = [];
                let inputFields = [];
                let noOfFields = 0;//used to AND check the radio
                for(var i = 1;i < params.length; i++){
                    let param = params[i];
                    console.log('equalgroupradios: will process para = ',param);
                    let inputField = radioGroups[param];
                    if(!inputField){
                        values.push(param);
                    }else{
                        noOfFields++;
                        inputField.forEach(f=>{
                          inputFields.push(f)
                        })
                    }

                }

                let checkValue = function(field){
                    for(var i = 0;i<values.length;i++){
                        let v = values[i];
                        if(field.value == v && field.checked){
                            field.checked = true;
                            return true;
                        }
                    }
                    return false;
                }
                console.log('equalgroupradios: inputFields = ',inputFields,values);
                if(operation=='OR'){
                    let isFalse = true;
                    for(var i=0;i<inputFields.length;i++){
                        let templateField = inputFields[i];
                        //let templateField = util.getField(template,f.fieldPosition);
                        console.log('equalgroupradios: templateField = ',templateField);
                        if(checkValue(templateField)){
                            isFalse = false;
                            field.checked = true;
                            resolve(true);
                            break;
                        }
                    }

                    if(isFalse){
                        field.checked = false;
                        resolve(false);
                    }

                }else{
                    //for AND operation
                    //required all fields set = true => output = true
                    //check by count the number of true comparing to noOfFields
                    let noOfTrue = 0;
                    for(var i=0;i<inputFields.length;i++){
                        let templateField = inputFields[i];
                        //let templateField = util.getField(template,f.fieldPosition);
                        console.log('equalgroupradios: templateField = ',templateField);
                        if(checkValue(templateField)){
                            noOfTrue++;
                        }
                    }

                    if(noOfTrue == noOfFields){
                        field.checked = true;
                        resolve(true);
                    }else{
                        field.checked = false;
                        resolve(false);
                    }
                }

            }

        }
    });



};
