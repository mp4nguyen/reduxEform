
import * as util from '../utilities'
import eformFuncs from '../eformfuncs';

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
  BMI(field_1_0_3,field_1_0_1,bmi_class,bmi,0-18.5-25-30)
*/
export default function EQUALOR(radioGroups,templateClone,fieldsByName,fieldsByRef,func,field,updatingFields,value, originField){
    return new Promise((resolve,reject)=>{
      // var params = util.getParams(func);
      // console.log('params>>>>>>>>>>', params, 'value enter', value, 'func', func);
      // var valueitem = 0;
      // var value1 = 0;
      // var value2 = 0;
      // params.forEach((param,index)=>{
      //     console.log('param>>>>>>>>>>', param, 'index >>>>>>', index);
      //     var inputField;
      //     if(param.indexOf('field_')>-1){
      //         inputField = fieldsByRef[param];
      //         // var inputValue = util.getField(templateClone,inputField.fieldPosition).value;
      //     }else{
      //         inputField = fieldsByName[param];
      //     }
      //     // var inputValue = util.getField(templateClone,inputField.fieldPosition).value;
      //     console.log('inputField>>>>>>>>>>', inputField, 'radioGroups', radioGroups);

      //     if(inputField){

              // if (index == 0) {
              //   value1 = Number(inputField.value);
              //   inputField.checked = true;
              //   updatingFields.push(inputField.fieldPosition);
              // }

              // if (index == 1) {
              //   value2 = Number(inputField.value);
              //   inputField.checked = true;

              // }

              

              // originField.checked=true;
              // updatingFields.push(originField.fieldPosition);

              field.value=value;
              updatingFields.push(field.fieldPosition);




    //           if(index == 0){  
    //             	eformFuncs.equalradio(radioGroups,templateClone,func,inputField,updatingFields,value).then(value=>{
    //                   value1 = Number(value);
    //               });
    //           }
    //           if(index == 1){
    //             	eformFuncs.equalradio(radioGroups,templateClone,func,inputField,updatingFields,value).then(value=>{
    //                   value2 = Number(value);
    //               });
    //           }
    //       }
    //   });        
    //   // console.log('anhdh.valueitem',value);
    //   // console.log('anhdh.value1',value1);
    //   // console.log('anhdh.value2',value2);
  		// if(value1>0)
  		// 	valueitem = value1;
  		// else{valueitem = value}
    //     util.getField(templateClone,field.fieldPosition).value = valueitem; 
    //     // updatingFields.push(field.fieldPosition);
        resolve(value)
    });

};
