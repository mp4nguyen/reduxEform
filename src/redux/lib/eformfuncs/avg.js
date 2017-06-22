
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function AVG(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var total = 0;
        var count = 0;

        var isRound = 0;

        if (params && params.length>0 && params[params.length-1] == "isRound") {
          isRound = 1;
          params.splice(params.length-1,1);          
        }

        params.forEach(param=>{
            var inputField;
            var inputValue;

            if(param.indexOf('field_')>-1){
                inputField = fieldsByRef[param];
                var inputValue = util.getField(template,inputField.fieldPosition).value;
            }else{
                var inputFieldTemp = fieldsByName[param];
                if(inputFieldTemp.type == 'eform_input_check_radio'){
                      if(!inputFieldTemp.checked){
                          if(inputFieldTemp.groups && inputFieldTemp.groups.length > 0){
                              for(var i=0;i<inputFieldTemp.groups.length;i++){
                                  var f = inputFieldTemp.groups[i];
                                  if(f.checked){
                                    inputField = f;
                                    break;
                                  }
                              }
                          }
                      }else{
                          inputField = inputFieldTemp;
                      }
                }else{
                    inputField = inputFieldTemp;
                }
            }

            if(inputField){
                inputValue = util.getField(template,inputField.fieldPosition).value;
            }

            if(!isNaN(inputValue)){
                total = total + Number(inputValue);
                count++;
            }else{
                count++;
            }
        });
        

        if(count > 0){

            var result = -1;
            if (isRound = 1) {
              result=Math.floor(total/count);
            }else{
              result=total/count;
            }

            util.getField(template,field.fieldPosition).value = result;
            //console.log(" SUM is running with total = ",total);
            updatingFields.push(field.fieldPosition);
            resolve(result)
        }else{
            resolve(0)
        }

    });

};
