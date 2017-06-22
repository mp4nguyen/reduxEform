import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


export default function updateSection(sectionID,property,value){

    return (dispatch,getState)=>{



        var eform = getState().eform;
        var updatingFields = [];
        var templateClone =  Object.assign({},eform.template);
            //console.log('updateField:new 0. time = ',(new Date()) - updateStartAt ,' ms');
        var section = templateClone.sections[sectionID];
        
        // console.log('vo hide section', value);
        var sectionIDRelateArr=[-1];

        if (!value) {
            // console.log('vo hide section');
            for (var i = 0; i < section.rows.length; i++) {
                for (var j = 0; j < section.rows.length; j++) {
                    // console.log('section.rows[i]', section.rows[i]);
                    // console.log('section.rows[i].fields[j]', section.rows[i].fields[j]);
                    if (section.rows[i].fields[j]) {
                        var nameField = section.rows[i].fields[j].name || '';
                        
                        if (eform.trigerFields.hasOwnProperty(nameField)) {
                            var arrRelateFields = eform.trigerFields[nameField];
                            // console.log('nameField', nameField);
                            // console.log('arrRelateFields', arrRelateFields);
                    
                            for (var k = 0; k < arrRelateFields.length; k++) {
                                // console.log('kkkkkkk', k);
                                var sectionIDFieldRelate = arrRelateFields[k].field.fieldPosition.sectionID;
                                var rowIDFieldRelate = arrRelateFields[k].field.fieldPosition.rowID;
                                var fieldIDFieldRelate = arrRelateFields[k].field.fieldPosition.fieldID;
                                // console.log('IDDDDDD', sectionIDFieldRelate, rowIDFieldRelate, fieldIDFieldRelate);
                                // console.log('templateClone.field truoc', templateClone.sections[sectionIDFieldRelate].rows[rowIDFieldRelate].fields[fieldIDFieldRelate]);
                                if (sectionIDFieldRelate != sectionID ) {
                                    templateClone.sections[sectionIDFieldRelate].rows[rowIDFieldRelate].fields[fieldIDFieldRelate].checked=null;
                                }
                                // var isExist = 0
                                // for (var l = 0; l < sectionIDRelateArr.length; l++) {                                    
                                //    if (sectionIDFieldRelate == sectionIDRelateArr[l]) {
                                //         isExist = 1;
                                //    }
                                // }
                                // if (isExist == 1) {
                                    // sectionIDRelateArr.push(52);
                                // }

                                // console.log('templateClone.field sau', templateClone.sections[sectionIDFieldRelate].rows[rowIDFieldRelate].fields[fieldIDFieldRelate]);
                            }
                        }
                    }
                                    
                }                
            }
        }

        // console.log('updateSection: section abc = ',section);

        //if(section.viewType = "dynamic"){
            section[property] = value;

            
            if (!value) {
                updatingFields.push({sectionID:'reLoad',rowID:null,fieldID:null,value:""});
            }else{
                updatingFields.push({sectionID,rowID:null,fieldID:null,value:""});    
            }
            
            // for (var i = 0; i < sectionIDRelateArr.length; i++) {
            //     updatingFields.push({sectionID : sectionIDRelateArr[i],rowID:null,fieldID:null,value:""});
            // }
            // console.log('updatingFields out ', updatingFields);
            
        //}

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
