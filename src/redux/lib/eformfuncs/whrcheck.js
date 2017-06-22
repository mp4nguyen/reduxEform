
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
  BMI(field_1_0_3,field_1_0_1,bmi_class,bmi,0-18.5-25-30)
  WHR(field_1_0_5,field_1_0_7,whr_class,whr,0-0.85-0.96,0-0.75-0.86,gender)
*/
export default function WHRCHECK(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var whr = null;
        var gender = null;
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
              whr = Number(inputValue);
            }
            if(index == 1){
              var inputField;
              if(param.indexOf('field_')>-1){
                  inputField = fieldsByRef[param];
                  var inputValue = util.getField(template,inputField.fieldPosition).value;
              }else{
                  inputField = fieldsByName[param];
              }

              var inputValue=null;

              if (inputField.checked == true) {
                inputValue = util.getField(template,inputField.fieldPosition).value;
              }else{
                if (inputField.groups) {
                  for (var i = 0; i < inputField.groups.length; i++) {
                    if(inputField.groups[i].checked == true){
                      inputValue = util.getField(template,inputField.groups[i].fieldPosition).value;                    
                    }
                  }
                }
              }

              // var inputValue = util.getField(template,inputField.fieldPosition).value;
              gender = (inputValue);
            }

        });

        console.log('whrcheck: whr = ',whr,' gender = ',gender);

        if (gender) {
          if(gender.toUpperCase() == 'MALE'){
            if(whr < 0.85){
                if(field.value == 0){
                  isChecked = true;
                }
            }else if(0.85 <= whr && whr <= 0.95){
                if(field.value == 0.85){
                  isChecked = true;
                }
            }else if(0.95 < whr){
                if(field.value == 0.96){
                  isChecked = true;
                }
            }
          }else if(gender.toUpperCase() == 'FEMALE'){
            if(whr < 0.75){
                if(field.value == 0){
                  isChecked = true;
                }
            }else if(0.75 <= whr && whr <= 0.85){
                if(field.value == 0.85){
                  isChecked = true;
                }
            }else if(0.85 < whr){
                if(field.value == 0.96){
                  isChecked = true;
                }
            }
          }
        }

        util.getField(template,field.fieldPosition).checked = isChecked;

        if (updatingFields) {
            updatingFields.push(field.fieldPosition);
        }
            
        resolve(isChecked)
    });

};
