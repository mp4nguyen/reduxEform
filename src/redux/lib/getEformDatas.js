import {postRequest} from './request';
import * as util from './utilities';

var getOtherEformDatas = function(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas){

    if(eformDataArray.length > eformDataArrayIndex){
        console.log('eformDataArray',eformDataArray);
        var eformDataObject = eformDataArray[eformDataArrayIndex];
        var reqParam = {
                          "data": {
                            "templateID": eformDataObject.eformTemplateID,
                            "appointmentID": appointmentId
                          }
                        };
                        reqParam

        console.log("eformActions: reqParam = ",reqParam);

        if (reqParam.data.templateID=="50" || reqParam.data.templateID=="70" || reqParam.data.templateID==50 || reqParam.data.templateID==70) { // eforms audio 
            postRequest('/eform/get-eform-data2',reqParam).then(eformDataResponse => {
                console.log("eformActions: eformDataResponse = ",eformDataResponse);

                if(eformDataResponse.data && eformDataResponse.data.data && eformDataResponse.data.data.FormData){                
                    otherEformDatas["Audios"] = util.convertEformDataStringToObjectByName(eformDataResponse.data.data.FormData);                
                    eformDataArrayIndex++;
                    getOtherEformDatas(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas)

                }else{
                    reqParam.data.templateID="50";
                    postRequest('/eform/get-eform-data2',reqParam).then(response => {
                        console.log("eformActions: response = ",response);
                        //otherEformDatas["Audios"] = util.convertEformDataStringToObjectByName(response.data.data.FormData); 
                        if(response.data && response.data.data && response.data.data.FormData)
                        {
                            otherEformDatas["Audios"] = util.convertEformDataStringToObjectByName(response.data.data.FormData);
                        }
                        console.log("otherEformDatas 2 = ",otherEformDatas);         
                        eformDataArrayIndex++;
                        getOtherEformDatas(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas)
                    });
                }
                       
            });
        }else{
            postRequest('/eform/get-eform-data2',reqParam).then(eformDataResponse => {
                console.log("eformActions: eformDataResponse = ",eformDataResponse);
                console.log("otherEformDatas:",otherEformDatas);
                if(eformDataResponse.data && eformDataResponse.data.data && eformDataResponse.data.data.FormData){
                    if(otherEformDatas)
                    {
                        otherEformDatas[eformDataObject.eformName] = util.convertEformDataStringToObjectByName(eformDataResponse.data.data.FormData);
                    }
                }
                eformDataArrayIndex++;
                getOtherEformDatas(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas)
            });
        }
        
    }else{        
        resolve('FINISH');
    }
};

export default function(eformDataList,appointmentId,otherEformDatas){

    var propValue;
    var eformDataArray = [];
    var eformDataArrayIndex = 0;
    for(var propName in eformDataList) {
        propValue = eformDataList[propName]
        console.log(propName,propValue);
        eformDataArray.push(propValue);
    }

    return new Promise((resolve,reject)=>{
        getOtherEformDatas(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas)
    });
}
