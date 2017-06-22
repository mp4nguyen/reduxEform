
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
  BMI(field_1_0_3,field_1_0_1,bmi_class,bmi,0-18.5-25-30)
*/
export default function BMI(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var whr = 0;
        var hip = 0;
        var waist = 0;

        params.forEach((param,index)=>{
            var inputField;
            if(param.indexOf('field_')>-1){
                inputField = fieldsByRef[param];
                var inputValue = util.getField(template,inputField.fieldPosition).value;
            }else{
                inputField = fieldsByName[param];
            }
            var inputValue = util.getField(template,inputField.fieldPosition).value;
            if(!isNaN(inputValue)){
                if(index == 1){
                  hip = Number(inputValue);
                }
                if(index == 0){
                  waist = Number(inputValue);
                }
            }
        });

        if(hip){
          whr = waist/hip;
        }
        whr = whr.toFixed(2);
        util.getField(template,field.fieldPosition).value = whr;
        //console.log(" BMI is running with total = ",bmi,' weight = ',weight,' height = ',height );
        updatingFields.push(field.fieldPosition);
        resolve(whr)
    });

};
