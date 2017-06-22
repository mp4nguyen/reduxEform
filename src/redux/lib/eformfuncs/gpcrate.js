
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function GPCRATE(fieldsByName,fieldsByRef,template,func,field,updatingFields){
   
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
       
        var total = 0;
        var count = 0;
        var inputValue;

        params.forEach(param=>{
            var inputField;
            
            if(param.indexOf('field_')>-1){
                inputField = fieldsByRef[param];
                inputValue = util.getField(template,inputField.fieldPosition).value;
            }else{
                var inputFieldTemp = fieldsByName[param];   
                
                inputField = inputFieldTemp;        
                
            }

            if(inputField){
                inputValue = util.getField(template,inputField.fieldPosition).value;
                
            }            
        });        

        if(inputValue){
            var strValue = '';
            if (inputValue == 1 || inputValue == '1') {
                strValue='Poor';
            }else if (inputValue == 2 || inputValue == '2') {
                strValue='Average';
            }else if (inputValue == 3 || inputValue == '3') {
                strValue='Good';
            }else if (inputValue == 4 || inputValue == '4') {
                strValue='Excellent';
            }
            
            

            util.getField(template,field.fieldPosition).value = strValue;
                        
            updatingFields.push(field.fieldPosition);
            resolve(strValue)

        }else{
            resolve(0)
        }

    });

};


// Auto rating Excellent,good,average,poor in "Sec 5 General Physical Capacity"