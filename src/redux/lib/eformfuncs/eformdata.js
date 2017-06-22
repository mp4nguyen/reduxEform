
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function EFORMDATA(field,preCal,params){
    var preCalRes = util.getParams(preCal);
    return new Promise((resolve,reject)=>{

        EFormService.eformCheckDetail({templateName: preCalRes[2], appointmentID: params.appointmentID}).then(function(eformRes){
                if(eformRes.data) {
                    var formData = eformRes.data.EFormData.FormData?JSON.parse(eformRes.data.EFormData.FormData):null;
                    for (var i = 0; i < formData.length; i++) {
                        var item = formData[i];
                        if (item.name == preCalRes[0]) {
                            objRef[refField] = {refRow: refRow, value: item.value};
                            self.refs[refSection].setValue(refRow, refField, item.value);
                            resolve({status: 'success', msg:'get value success'});
                            break;
                            return {status: 'success', msg:'get value success'};
                        }
                    }
                } else {
                    resolve({status: 'warning', msg: 'not found'});
                }
            }, function (err) {
                resolve({status:'error', msg: err});
            })

    });
};
//
//
//
// console.log("______________________________eformDetail._serverPreFormDetail.EFormData : is running obj =  ",obj);
// var preCalRes = obj.preCalRes;
// var refRow = obj.refRow;
// var refField = obj.refField;
// var refSection = obj.refSection;
// var promise = new Promise(function (resolve, reject) {
//     setTimeout(function(refRow, refField, refSection){
//         EFormService.eformCheckDetail({templateName: preCalRes[1], appointmentCode: preCalRes[2]}).then(function(eformRes){
//                 if(eformRes.data) {
//                     var formData = eformRes.data.EFormData.FormData?JSON.parse(eformRes.data.EFormData.FormData):null;
//                     for (var i = 0; i < formData.length; i++) {
//                         var item = formData[i];
//                         if (item.name == preCalRes[0]) {
//                             objRef[refField] = {refRow: refRow, value: item.value};
//                             self.refs[refSection].setValue(refRow, refField, item.value);
//                             resolve({status: 'success', msg:'get value success'});
//                             break;
//                             return {status: 'success', msg:'get value success'};
//                         }
//                     }
//                 } else {
//                     resolve({status: 'warning', msg: 'not found'});
//                 }
//             }, function (err) {
//                 resolve({status:'error', msg: err});
//             })
//     },0, refRow, refField, refSection);
// });
// return promise;
