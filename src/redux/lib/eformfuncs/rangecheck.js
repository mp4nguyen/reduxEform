
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
  BMI(field_1_0_3,field_1_0_1,bmi_class,bmi,0-18.5-25-30)


  GRIPRANGETOCHECK(dominant_hand,avg_L,avg_R,normal_L,normal_R,1)
*/
export default function RANGECHECK(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var bmi = null;
        var from = 0;
        var to = 0;
        var isChecked = false;
        params.forEach((param,index)=>{
            if(index == 0){
              var inputField;
              if(param.indexOf('field_')>-1){
                  inputField = fieldsByRef[param];
                  var inputValue = util.getField(template,inputField.fieldPosition).value;
              }else{
                  inputField = fieldsByName[param];
              }
              var inputValue = util.getField(template,inputField.fieldPosition).value;
              bmi = Number(inputValue);
            }
            if(index == 1){
              from = Number(param);
            }
            if(index == 2){
              to = Number(param);
            }
        });

        if(from <= bmi && bmi <= to){
          isChecked = true;
        }else{
          isChecked = false;
        }

        util.getField(template,field.fieldPosition).checked = isChecked;
        updatingFields.push(field.fieldPosition);
        resolve(isChecked)
    });

};
