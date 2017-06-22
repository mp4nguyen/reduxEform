import moment from 'moment';
import * as util from './utilities';
import eformFuncs from './eformfuncs';

var calculating = function(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,field,trigerFields,updatingFields,value,calStartAt){
    console.log(' >>>>>>> will find all output fields for ',field.name,field.ref);
    var tempOutputFields = trigerFields[field.name];
    var tempOutputFields2 = trigerFields[field.ref];
    var outputFields = null;

    if(tempOutputFields){
        outputFields = tempOutputFields;
    }

    if(outputFields){
        outputFields = tempOutputFields.concat(tempOutputFields2);
    }else{
        outputFields = tempOutputFields2;
    }

    if(outputFields){
        console.log('outputFields in calculating trigger fields',outputFields);
        outputFields.forEach(outputFieldTemp=>{
            //Only calculate for other fields. not for itself, this is because there are errors when define the fields, sometimes, it cal for itself
            if(outputFieldTemp && (outputFieldTemp.preCal||outputFieldTemp.cal) && (outputFieldTemp.field.name != field.name) ){
                var outputField = util.getField(template,outputFieldTemp.field.fieldPosition);

                console.log(" -  will calculate and set outputs to for",outputField,outputFieldTemp.cal,outputFieldTemp.preCal);
                if(util.getPrefixField(outputFieldTemp.preCal,'EQUAL(') > -1 || util.getPrefixField(outputFieldTemp.preCal,'EQUALP(') > -1 || util.getPrefixField(outputFieldTemp.cal,'EQUAL(') > -1 || util.getPrefixField(outputFieldTemp.cal,'EQUALP(') > -1){
                    eformFuncs.equal(radioGroups,template,outputField,updatingFields,value).then(value=>{
                        // console.log('EQUAL for ',outputField,' value =',value);
                        // console.log('will calculating from ',outputField);
                        // console.log('will calculating from ',outputFieldTemp.field);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputFieldTemp.field,trigerFields,updatingFields,value);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'EQUALOR(') > -1 || util.getPrefixField(outputFieldTemp.cal,'EQUALOR(') > -1 ){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.equalor(radioGroups,template,fieldsByName,fieldsByRef,func,outputField,updatingFields,value, field).then(value=>{
                        // console.log('EQUALOR for ',outputField,' value =',value);
                        // console.log('will calculating from ',outputField);
                        // console.log('will calculating from ',outputFieldTemp.field);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputFieldTemp.field,trigerFields,updatingFields,value);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'EQUALRADIO(') > -1 || util.getPrefixField(outputFieldTemp.cal,'EQUALRADIO(') > -1 ){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.equalradio(radioGroups,template,func,outputField,updatingFields,value).then(value=>{
                        // console.log('EQUALRADIO for ',outputField,' value =',value);
                        // console.log('will calculating from ',outputField);
                        // console.log('will calculating from ',outputFieldTemp.field);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputFieldTemp.field,trigerFields,updatingFields,value);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'EQUALGROUPRADIOS(') > -1 || util.getPrefixField(outputFieldTemp.cal,'EQUALGROUPRADIOS(') > -1 ){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                        eformFuncs.equalgroupradios(radioGroups,func,outputField,updatingFields).then(value=>{
                        // console.log('EQUALGROUPSRADIOS for ',outputField,' value =',value);
                        // console.log('will calculating from ',outputField);
                        // console.log('will calculating from ',outputFieldTemp.field);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputFieldTemp.field,trigerFields,updatingFields,value);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'SUM(') > -1 || util.getPrefixField(outputFieldTemp.preCal,'SUMP(') > -1 || util.getPrefixField(outputFieldTemp.cal,'SUM(') > -1 || util.getPrefixField(outputFieldTemp.cal,'SUMP(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.sum(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        // console.log('SUM for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'AVG(') > -1 || util.getPrefixField(outputFieldTemp.preCal,'AVGP(') > -1 || util.getPrefixField(outputFieldTemp.cal,'AVG(') > -1 || util.getPrefixField(outputFieldTemp.cal,'AVGP(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.avg(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(avg=>{
                        console.log('AVG for ',outputField,' avg =',avg);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,avg);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'REQUIRED(') > -1 || util.getPrefixField(outputFieldTemp.cal,'REQUIRED(') > -1 ){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.required(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(isRequired=>{
                        console.log('REQUIRED for ',outputField,' isRequired =',isRequired);
                        resolve('FINISH CALCULATIONS');
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'MAXHR(') > -1 || util.getPrefixField(outputFieldTemp.cal,'MAXHR(') > -1 ){
                    eformFuncs.maxhr(template,outputField,updatingFields,value).then(value=>{
                        console.log('MAXHR for ',outputField,' value =',value);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputFieldTemp.field,trigerFields,updatingFields,value);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'MAXHR85(') > -1 || util.getPrefixField(outputFieldTemp.cal,'MAXHR85(') > -1 ){
                    eformFuncs.maxhr85(template,outputField,updatingFields,value).then(value=>{
                        console.log('MAXHR for ',outputField,' value =',value);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputFieldTemp.field,trigerFields,updatingFields,value);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'BMI(') > -1  || util.getPrefixField(outputFieldTemp.cal,'BMI(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.bmi(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        console.log('BMI for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'RANGECHECK(') > -1  || util.getPrefixField(outputFieldTemp.cal,'RANGECHECK(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.rangecheck(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        console.log('RANGECHECK for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'WHR(') > -1  || util.getPrefixField(outputFieldTemp.cal,'WHR(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.whr(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        console.log('WHR for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'WHRCHECK(') > -1  || util.getPrefixField(outputFieldTemp.cal,'WHRCHECK(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.whrcheck(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        console.log('WHRCHECK for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'GRIPRANGETOCHECK(') > -1  || util.getPrefixField(outputFieldTemp.cal,'GRIPRANGETOCHECK(') > -1){

                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.griprangecheck(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        console.log('GRIPRANGETOCHECK for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'GRIPLBSRANGETOCHECK(') > -1  || util.getPrefixField(outputFieldTemp.cal,'GRIPLBSRANGETOCHECK(') > -1){

                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.griprangecheck(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(total=>{
                        console.log('GRIPLBSRANGETOCHECK for ',outputField,' value =',total);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,total);
                    });
                }
                else if(util.getPrefixField(outputFieldTemp.preCal,'GPCRATE(') > -1 || util.getPrefixField(outputFieldTemp.cal,'GPCRATE(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.gpcrate(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(gpcrate=>{
                        console.log('GPCRATE for ',outputField,' gpcrate =',gpcrate);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields,gpcrate);
                    });
                }
                 else if(util.getPrefixField(outputFieldTemp.preCal,'VOMAX(') > -1  || util.getPrefixField(outputFieldTemp.cal,'VOMAX(') > -1){
                    var func = outputFieldTemp.preCal || outputFieldTemp.cal;
                    eformFuncs.vomax(fieldsByName,fieldsByRef,template,func,outputField,updatingFields).then(value=>{
                        console.log('VOMAX for ',outputField,' value =',value);
                        calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,outputField,trigerFields,updatingFields);
                    });
                }
            }
        });
    }else{
            console.log('calculatingEform: finish');
        resolve('FINISH CALCULATIONS');
    }
}

export default function calculatingEform(radioGroups,fieldsByName,fieldsByRef,template,changedFields,trigerFields,updatingFields,value) {
    var calStartAt = new Date();
    //calculating("resolve","reject",radioGroups,fieldsByName,fieldsByRef,template,field,trigerFields,updatingFields,value,calStartAt);
      return new Promise((resolve,reject)=>{
        changedFields.forEach(changedfield=>{
            console.log('******************** calculatingEform: will calculating for changedfield = ',changedfield);
            calculating(resolve,reject,radioGroups,fieldsByName,fieldsByRef,template,changedfield.field,trigerFields,updatingFields,value,calStartAt);
        });
    });
}
