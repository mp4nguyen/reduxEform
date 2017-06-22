import {toastr} from 'react-redux-toastr'

import moment from 'moment';


import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';
import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


export default function printEform(type){
    return (dispatch,getState)=>{
        var eform = getState().eform;
        var saveStartAt = new Date();
        console.log('data to print',ConvertTemplateToFieldArray(eform.template,true, eform.params));
        var data = {
            printMethod: eform.params.printType,
            data: ConvertTemplateToFieldArray(eform.template,true, eform.params),

            templateUID: eform.params.templateUID
        }

        console.log('eformActions.printEform: data = ',data);

        printRequest('/print',JSON.stringify(data)).then(printRes => {
            //console.log('eformActions.printEform: printRes = ',printRes);
            console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');

            var fileName = 'report_'+moment().format('X');

            console.log('printRequest>>>>>>>>>>>',fileName);

            var blob = new Blob([printRes.data], {
                type: 'application/pdf'
            });


            if(type == 'VIEW'){

                var win = window.open(URL.createObjectURL(blob), '_blank');
                win.focus();

            }else{
                var filesaver = saveAs(blob, fileName);
            }

            //var filesaver = saveAs(blob, fileName);

        });
    };
}
