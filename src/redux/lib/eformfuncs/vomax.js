
import * as util from '../utilities'
/*
  this function is used to set  value for   textfield/areafield
    Men:	Vo2max (MI-Kg-1-Min-1)  =  111.33 – (0.42 x Hr)
	Women:	Vo2max (MI-Kg-1-Min-1)  =  65.81 – (0.1847 x Hr)   
*/
export default function VOMAX(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{

        var params = util.getParams(func);
        var hrvalue = 0;  
        var gender = '';       
        var value = 0;
        var inputField = null;
        var inputValue = '';
        params.forEach((param,index)=>{
            if(index == 0){              
              if(param.indexOf('field_')>-1){
                  inputField = fieldsByRef[param];
                  inputValue = util.getField(template,inputField.fieldPosition).value;
              }else{
                  inputField = fieldsByName[param];
              }
              inputValue = util.getField(template,inputField.fieldPosition).value;
              hrvalue = Number(inputValue);
            }   
            if(index == 1){  
              if(param.indexOf('field_')>-1){
                  inputField = fieldsByRef[param];
                  inputValue = util.getField(template,inputField.fieldPosition).value;                               
              }else{
                  inputField = fieldsByName[param];                  
              } 
              console.log('anhdh.inputField',inputField);
              if(inputField)
              {
                if(inputField.groups[0])
                {
                  if(inputField.groups[0].checked)
                  {
                    gender = inputField.groups[0].value;
                  }
                  else
                  {
                     gender = inputField.value;   
                  }
                               
                }
              }
            }                           
        }); 
        console.log('anhdh.gender',gender);
        if(gender.startsWith('Male'))
        {
        	field.value = 111.33 - (0.42 * hrvalue); 
        }
        else
        {
        	field.value = 65.81 - (0.1847 * hrvalue);  
        }  		
        if(updatingFields)
        {
          updatingFields.push(field.fieldPosition);
        }        
        resolve(value);        
    });

};
