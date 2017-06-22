
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
  BMI(field_1_0_3,field_1_0_1,bmi_class,bmi,0-18.5-25-30)
  WHR(field_1_0_5,field_1_0_7,whr_class,whr,0-0.85-0.96,0-0.75-0.86,gender)
*/
export default function BMI(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var bmi = 0;
        var height = 0;
        var weight = 0;

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
                  height = Number(inputValue)/100;
                }
                if(index == 0){
                  weight = Number(inputValue);
                }
            }
        });

        if(height){
          //bmi = Math.round(weight/(height*height),-1);
          bmi = (weight/Math.pow(height, 2)).toFixed(1);
        }
        util.getField(template,field.fieldPosition).value = bmi;
        console.log(" BMI is running with total = ",bmi,' weight = ',weight,' height = ',height );
        updatingFields.push(field.fieldPosition);
        resolve(bmi)
    });

};
