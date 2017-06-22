import moment from 'moment';
import * as util from './utilities';
import eformFuncs from './eformfuncs';

export default function transformEformData(template,apptInfo,eformData,radioGroups,fieldsByName,fieldsByRef,trigerFields,eformDataFields,eformDataList) {

        var isResolve = true;
        var arrFormular=[];
        return new Promise((resolve,reject)=>{

            console.log('transformEformData >>> apptInfo', apptInfo);

            var startAt = new Date();

            console.log('----------------------------------->startAt = ',startAt,'<------------------------------');

            var arrFieldsAfter = [];

            // var countInputText = 0;

            var roleHome = {};
            if (template.roles) {
              roleHome = template.roles;
            }

            var mainRoles = {};
            if (roleHome) {
              mainRoles = roleHome;
            }

            for(var section_index = 0; section_index < template.sections.length; section_index++){
                var section = template.sections[section_index];
                                
                if (section.roles) {
                  mainRoles = section.roles;
                }

                //console.log(" * transformEformData: section = ",section);

                //if(section.viewType == 'dynamic'){
                  if(eformData){
                      var dataSection = eformData[section.ref];
                      if(dataSection){
                          section.isOpen = dataSection.isOpen;
                          section.isComplete = dataSection.isComplete;
                      }else{
                        section.isOpen = true;
                        section.isComplete = false;
                      }
                  }else{
                      section.isOpen = true;
                      section.isComplete = false;
                  }
                //}

                if(section.viewType == 'dynamic'){
                  if(eformData){
                    var dataSection = eformData[section.ref];
                    if(dataSection){
                        section.isShow = dataSection.isShow;
                        section.isOpen = dataSection.isOpen;
                        section.isComplete = dataSection.isComplete;
                    }
                  }
                }

                for(var row_index = 0; row_index < section.rows.length; row_index++){
                    var row = section.rows[row_index];

                    if (row.roles) {
                      mainRoles = row.roles;
                    }

                    // console.log("    - transformEformData: row = ",row);
                    // console.log("    - transformEformData: row = ",row.fields);
                    // console.log("    - transformEformData: row = ",row.fields.length);
                    for(var field_index = 0; field_index < row.fields.length; field_index++){
                        var field = row.fields[field_index];

                        if (field.roles) {
                          mainRoles = field.roles;
                        }

                        /// set role of field

                        var isDisabled = false;
                        var isVisible = true;
                        var userRoleStr = '';

                        if(template.userRole && template.userRole.RoleVs){
                            userRoleStr = template.userRole.RoleVs[0].RoleCode;
                        }

                        var arrRolesEdit =  null;
                        var arrRolesView =  null;

                        var isConcat = false;
                        var isHaveCal = false;

                        console.log('mainRoles', mainRoles);

                        if (mainRoles) {

                            arrRolesEdit =  mainRoles.edit;
                            isDisabled = util.getDisabled(arrRolesEdit, userRoleStr);
                            
                            // arrRolesView =  mainRoles.view.list;
                            // isVisible = util.getVisible(arrRolesView, userRoleStr);

                            if (mainRoles.view) {
                              arrRolesView =  mainRoles.view.list;  
                              isVisible = util.getVisible(arrRolesView, userRoleStr);
                            }

                            if (field.cal) {
                                isHaveCal=true;
                                if (field.cal.startsWith("CONCAT") || field.cal.startsWith("REQUIRED") || field.cal.startsWith("DEFAULTVALUE") || field.cal.startsWith("updatePatientInfo")) {
                                  isConcat = true;
                                }
                            }
                            if (field.preCal) {
                                isHaveCal=true;
                                if (field.preCal.startsWith("CONCAT") || field.preCal.startsWith("REQUIRED") || field.preCal.startsWith("DEFAULTVALUE") || field.preCal.startsWith("updatePatientInfo")) {
                                  isConcat = true;
                                }
                            }
                            if (isConcat == false && isHaveCal == true) {
                                isDisabled = true;
                            }

                        }
                        ////////////////////////

                        field.isDisabled = isDisabled;
                        field.isVisible = isVisible;


                        console.log('field.isDisabled >>>>>>',field.isDisabled, 'field', field);
                        console.log('field.isVisible >>>>>>',field.isVisible);


                        /// end set

                        var calArray = [];
                        field.fieldPosition = {sectionID: section_index, rowID: row_index, fieldID: field_index};

                        // if (field.type == 'eform_input_text') {
                        //   countInputText = countInputText + 1;
                        // }
                        

                        //This code is used to make the radioGroups
                        //Each group is an object of radioGroups
                        //Check the existing group by field name
                        //If having, add the field into the group
                        //if not exist, create new group
                        if(field.type =="eform_input_check_radio"){
                            var group = radioGroups[field.name];
                            if(group){
                              group.push(field);
                            }else{
                              radioGroups[field.name] = [field]
                            }
                        }

                        //create 2 dimention array for table
                        if(field.type =="table"){
                              var tableData=[];
                              for(var indexRow = 0;indexRow < field.content.rows; indexRow++){
                                    var tableRow = [];
                                    field.content.cols.map(function(c, indexCol){
                                          tableRow.push(
                                              {
                                                  "refChild": "field_"+indexRow+'_'+indexCol,
                                                  "value": null,
                                                  "type": field.type,
                                                  "typeChild": c.type,
                                                  "ref": field.ref,
                                                  "name": field.name,
                                                  "lable": c.label,
                                                  "row": indexRow,
                                                  "col": indexCol,
                                                  fieldPosition: {sectionID: section_index, rowID: row_index, fieldID: field_index,tableRowID: indexRow, tableColId: indexCol}
                                              }
                                          );
                                    },this);
                                    tableData.push(tableRow);
                              }
                              field.tableData = tableData;
                              field.tableHeader = field.content.cols;
                        }

                        //add the fields into fieldsByName object that use to search when calculating

                        var existingField = fieldsByName[field.name];
                        console.log('field add', field, 'existingField test', existingField);
                        if(existingField){
                            if(!existingField.groups){
                                existingField.groups = [];
                            }
                            existingField.groups.push(field);
                        }else{
                            fieldsByName[field.name] = field
                        }

                        //add the ref into fieldsByRef object that use to search when calculating
                        var existingRef = fieldsByRef[field.ref];
                        if(existingRef){
                            console.error("transformEformData: there are 2 fields have the same ref : ",existingRef,field);
                        }else{
                            fieldsByRef[field.ref] = field
                        }


                        if(typeof field.cal !== 'undefined')
                            calArray = field.cal.split('|');

                        calArray.map(function(cal){
                          if(cal){
                            // console.log(' cal of field',field,' = ',cal);
                            // if (util.getPrefixField(cal, 'field_') > -1) {
                            //     arrFormular.push({section_index, row_index, field_index, formular:cal, name: field.name});
                            // }

                            if(
                                util.getPrefixField(cal, 'EQUALP(') > -1 ||
                                util.getPrefixField(cal, 'EQUAL(') > -1 ||
                                util.getPrefixField(cal, 'EQUALOR(') > -1 ||
                                util.getPrefixField(cal, 'EQUALRADIO(') > -1 ||
                                util.getPrefixField(cal, 'EQUALGROUPRADIOS(') > -1 ||
                                util.getPrefixField(cal, 'SUMP(') > -1 ||
                                util.getPrefixField(cal, 'SUM(') > -1 ||
                                util.getPrefixField(cal, 'BMI(') > -1 ||
                                util.getPrefixField(cal, 'WHR(') > -1 ||
                                util.getPrefixField(cal, 'MAXHR(') > -1 ||
                                util.getPrefixField(cal, 'MAXHR85(') > -1 ||
                                util.getPrefixField(cal, 'AVG(') > -1 ||
                                util.getPrefixField(cal, 'REQUIRED(') > -1 ||
                                util.getPrefixField(cal, 'RANGECHECK(') > -1 ||

                                util.getPrefixField(cal, 'GRIPRANGETOCHECK(') > -1 ||

                                util.getPrefixField(cal, 'GRIPLBSRANGETOCHECK(') > -1 ||

                                util.getPrefixField(cal, 'WHRCHECK(') > -1 ||

                                util.getPrefixField(cal, 'GPCRATE(') > -1 ||

                                util.getPrefixField(cal, 'VOMAX(') > -1 ||

                                util.getPrefixField(cal, 'COUNT(') > -1
                              ){
                                  //create a list of triggerFields so, each time, field is changed value, we can search in the list and set the value for the relevent fields
                                  var params = util.getParams(cal);
                                  //console.log('transformEformData: >>>> cal =',cal,params);

                                  params.forEach(param=>{
                                      //console.log('transformEformData: >>>>>>>>>>>>>>> param =',param);
                                      var triggerField = trigerFields[param];

                                      if(triggerField){
                                          triggerField.push({field,cal});


                                      }else{
                                          var initialTrigerField = [{field,cal}];
                                          trigerFields[param] = initialTrigerField;
                                      }
                                  });
                            }

                            if(util.getPrefixField(cal,'GRIPRANGETOCHECK(') > -1 || util.getPrefixField(cal,'GRIPLBSRANGETOCHECK(') > -1 ){
                                //console.log('calculating GRIP');
                                // fieldsByName,fieldsByRef,template,func,field,updatingFields
                                //eformFuncs.griprangecheck(fieldsByName, fieldsByRef, template, cal, field);
                                arrFieldsAfter.push(field);
                            }

                            if(util.getPrefixField(cal,'WHRCHECK(') > -1 || util.getPrefixField(cal,'VOMAX(') > -1){                                
                                arrFieldsAfter.push(field);
                            }

                          }
                        })


                        var preCalArray = [];
                        if(typeof field.preCal !== 'undefined'){
                            preCalArray = field.preCal.split('|');
                            //console.log("    - transformEformData: field = ",field);
                        }

                        preCalArray.map(function(preCal){
                          if(preCal){
                            //console.log(' preCal of field',field,' = ',preCal);

                            // if (util.getPrefixField(preCal, 'field_') > -1) {
                            //     arrFormular.push({section_index, row_index, field_index, formular:preCal, name: field.name});
                            // }

                            if( util.getPrefixField(preCal, 'EQUALP(') > -1 ||
                                util.getPrefixField(preCal, 'EQUAL(') > -1 ||
                                util.getPrefixField(preCal, 'EQUALOR(') > -1 ||
                                util.getPrefixField(preCal, 'EQUALRADIO(') > -1 ||
                                util.getPrefixField(preCal, 'EQUALGROUPRADIOS(') > -1 ||
                                util.getPrefixField(preCal, 'BMI(') > -1 ||
                                util.getPrefixField(preCal, 'WHR(') > -1 ||
                                util.getPrefixField(preCal, 'MAXHR(') > -1 ||
                                util.getPrefixField(preCal, 'MAXHR85(') > -1 ||
                                util.getPrefixField(preCal, 'AVG(') > -1 ||
                                util.getPrefixField(preCal, 'REQUIRED(') > -1 ||
                                util.getPrefixField(preCal, 'RANGECHECK(') > -1 ||

                                util.getPrefixField(preCal, 'GRIPRANGETOCHECK(') > -1 ||

                                util.getPrefixField(preCal, 'GRIPLBSRANGETOCHECK(') > -1 ||

                                util.getPrefixField(preCal, 'WHRCHECK(') > -1 ||
                                util.getPrefixField(preCal, 'GPCRATE(') > -1 ||

                                util.getPrefixField(preCal, 'VOMAX(') > -1 ||


                                util.getPrefixField(preCal, 'COUNT(') > -1
                              ){
                                //create a list of triggerFields so, each time, field is changed value, we can search in the list and set the value for the relevent fields
                                var params = util.getParams(preCal);
                                //console.log('>>>>>>>>> preCal params =',preCal,params);



                                params.forEach(param=>{
                                    if(!param) {
                                      param=field.ref;
                                      console.log("NULL PRECAL PARAM", param);
                                    }
                                    var triggerField = trigerFields[param];
                                    //console.log("triggerField:", trigerFields);

                                    if(triggerField){
                                        triggerField.push({field,preCal});
                                    }else{
                                        var initialTrigerField = [{field,preCal}];
                                        trigerFields[param] = initialTrigerField;
                                    }
                                });


                            }

                            if(util.getPrefixField(preCal,'CONCAT') > -1){
                                eformFuncs.concat(field,preCal,apptInfo);
                                console.log('field after transform >>>>', field);
                                //console.log('transformEformData: field = ',field);
                            }

                            if(util.getPrefixField(preCal,'REQUIRED') > -1){
                                eformFuncs.required(field,preCal,template);
                            }

                            if(util.getPrefixField(preCal,'DEFAULT(') > -1){
                                console.log('vo vo vo vo Default', field);
                                eformFuncs.default(field,preCal);
                            }

                            if (util.getPrefixField(preCal, 'DEFAULTVALUE(') > -1) {
                                eformFuncs.defaultValue(field,preCal);
                            }

                            if(util.getPrefixField(preCal,'AGE(') > -1){
                                eformFuncs.age(field,preCal,apptInfo);
                            }

                            if(util.getPrefixField(preCal,'GRIP(') > -1){
                                //console.log('calculating GRIP');
                                eformFuncs.grip(field,preCal,apptInfo);
                            }

                            if(util.getPrefixField(preCal,'G_R_I_PLBS(') > -1){ //GRIPLBS
                                //console.log('calculating G_R_I_PLBS');
                                eformFuncs.griplbs(field,preCal,apptInfo);
                            }

                            if(util.getPrefixField(preCal,'MAXHR(') > -1){
                                eformFuncs.maxhrInLoadingTime(field,preCal,apptInfo);
                                //console.log('calculating MAXHR......',field);
                            }

                            if(util.getPrefixField(preCal,'VOMAX(') > -1){
                                eformFuncs.vomax(field,preCal,apptInfo);                                
                            }

                            if(util.getPrefixField(preCal,'MAXHR85(') > -1){
                                eformFuncs.maxhr85InLoadingTime(field,preCal,apptInfo);
                                //console.log('calculating MAXHR......',field);
                            }

                            if(util.getPrefixField(preCal,'EFORMDATA(') > -1){
                                //get all eform name and eform id from other eformdatas
                                //console.log('transformEformData: field = ',field);
                                eformDataFields.push(field);
                                var preCalRes = util.getParams(preCal);
                                var foundEformData = eformDataList[preCalRes[1]];
                                if(!foundEformData){
                                    eformDataList[preCalRes[1]] = {eformName: preCalRes[1],eformTemplateID:preCalRes[2]}
                                }
                            }

                            if(util.getPrefixField(preCal,'SignatureType(') > -1){
                                // console.log('transformEformData: field = ',field);
                                var preCalRes = util.getParams(preCal);
                                if(preCalRes.length>0){
                                    field.doctorType =  preCalRes[0]
                                }


                            }                          

                          }
                        })//end pre cal array

                        //Set disable for the fields
                        //Rules:
                        //      - ROLE
                        //      - preCal and cal:
                        //          +   Ignore all precal and cal that set itself
                        //          +   Except : CONCAT and ISREQUIRED (CONCAT and ISREQUIRED  => ROLE will cover)
                        //          +   OTHERS: => set disable = true

                        ///////////////////
                        // var isDisabled = false;
                        // var isVisible = true;
                        // var userRoleStr = '';

                        // if(template.userRole && template.userRole.RoleVs){
                        //     userRoleStr = template.userRole.RoleVs[0].RoleCode;
                        // }

                        // var arrRolesEdit =  null;
                        // var arrRolesView =  null;

                        // var isConcat = false;
                        // var isHaveCal = false;

                        // if (field.roles) {

                        //     isDisabled = util.getDisabled(arrRolesEdit, userRoleStr);

                        //     arrRolesEdit =  field.roles.edit;
                        //     arrRolesView =  field.roles.view.list;
                        //     isVisible = util.getVisible(arrRolesView, userRoleStr);
                        //     if (field.cal) {
                        //         isHaveCal=true;
                        //         if (field.cal.startsWith("CONCAT") || field.cal.startsWith("REQUIRED") || field.cal.startsWith("DEFAULTVALUE") ) {
                        //           isConcat = true;
                        //         }
                        //     }
                        //     if (field.preCal) {
                        //         isHaveCal=true;
                        //         if (field.preCal.startsWith("CONCAT") || field.preCal.startsWith("REQUIRED") || field.preCal.startsWith("DEFAULTVALUE")) {
                        //           isConcat = true;
                        //         }
                        //     }
                        //     if (isConcat == false && isHaveCal == true) {
                        //         isDisabled = true;
                        //     }

                        // }
                        // ////////////////////////

                        // field.isDisabled = isDisabled;
                        // field.isVisible = isVisible;


                        //merge eformData into eformtemplate
                        var fieldData = null;

                        // console.log('eformData >>>>>>>>', eformData);

                        if(eformData){

                          fieldData = eformData[field.ref];
                        }

                        // console.log('transformEformData: field = ',field);
                        // console.log('transformEformData: fieldData = ',fieldData);

                        if (field && field.type == 'line_chart') {
                            if (!eformData) {
                                field.series[0].data=[0,0,0,0,0,0,0,0];

                                field.series[1].data=[0,0,0,0,0,0,0,0];
                                field.series[1]["marker"]={};

                                field["image"]="";
                                field["headerImage"]="";

                            }else{
                                if (fieldData) {
                                    if (fieldData.series[0].data.length <= 0 || fieldData.series[1].data.length <= 0  ) {
                                        field.series[0].data=[0,0,0,0,0,0,0,0];
                                        field.series[1].data=[0,0,0,0,0,0,0,0];
                                        field.series[1]["marker"]={};
                                    }else{
                                        field.series = fieldData.series;
                                    }
                                    field["image"]="";
                                    field["headerImage"]="";

                                }else {
                                    field.series[0].data=[0,0,0,0,0,0,0,0];
                                    field.series[1].data=[0,0,0,0,0,0,0,0];
                                    field.series[1]["marker"]={};
                                    field["image"]="";
                                    field["headerImage"]="";
                                }
                            }
                        }else if (field && field.type == 'rec_chart') {
                            if (!eformData) {
                                field.series[0].data=[0,0,0,0,0,0,0,0];
                                field.series[1].data=[0,0,0,0,0,0,0,0];

                                field["image"]="";
                                field["headerImage"]="";

                            }else{
                                if (fieldData) {
                                    if (fieldData.series[0].data.length <= 0 || fieldData.series[1].data.length <= 0  ) {
                                        field.series[0].data=[0,0,0,0,0,0,0,0];
                                        field.series[1].data=[0,0,0,0,0,0,0,0];
                                    }else{
                                        field.series = fieldData.series;
                                    }
                                    field["image"]="";
                                    field["headerImage"]="";

                                }else {
                                    field.series[0].data=[0,0,0,0,0,0,0,0];
                                    field.series[1].data=[0,0,0,0,0,0,0,0];
                                    field["image"]="";
                                    field["headerImage"]="";
                                }
                            }
                        }else if (field && field.type == 'eform_input_image_doctor') {
                            if (!eformData) {
                                field["image"]="";
                                field["valueSign"]={
                                  main:null,
                                  sub:null
                                };

                                field["isPrintDoctor"]=false;

                            }else{
                                if (fieldData) {
                                  field.image=fieldData.image;
                                  field.valueSign=fieldData.valueSign;
                                  field["isPrintDoctor"]=fieldData.isPrintDoctor;
                                  
                                }else{
                                  field["image"]="";
                                  field["valueSign"]={
                                    main:null,
                                    sub:null
                                  };
                                  field["isPrintDoctor"]=false;
                                }
                            }

                        }

                        if(fieldData && fieldData.type == 'table'){
                            field.tableData.forEach((row,index)=>{
                                //console.log('transformEformData: row = ',row);
                                row.forEach(col=>{
                                    //console.log('transformEformData: col = ',col);
                                    var tableFieldData = fieldData.fields[col.refChild];
                                    //console.log('transformEformData: tableFieldData = ',tableFieldData);
                                    if(tableFieldData){
                                        col.value = tableFieldData.value;
                                    }
                                });
                            });
                        }else if(fieldData && fieldData.value){                         
                          if(field.type =="eform_input_check_radio" || field.type =="eform_input_check_checkbox" ){                              

                              if (field.preCal || field.cal ) {
                                if(util.getPrefixField(field.preCal,'PatientAppointment.Gender') == -1 
                                  && util.getPrefixField(field.cal,'PatientAppointment.Gender') == -1  && util.getPrefixField(field.preCal,'GRIPRANGETOCHECK(') == -1 
                                  && util.getPrefixField(field.cal,'GRIPRANGETOCHECK(') == -1
                                  && util.getPrefixField(field.preCal,'CONCAT(PatientAppointment.Title)') == -1
                                  && util.getPrefixField(field.cal,'WHRCHECK(') == -1){
                                  field.checked = fieldData.checked;
                                }
                              }else{
                                  // console.log('enter enter 2', field, 'fieldData 2', fieldData);
                                  field.checked = fieldData.checked;
                              }
                              // field.checked = fieldData.checked;
                          }else{
                              if (field.preCal || field.cal) {

                                if (util.getPrefixField(field.preCal,'DEFAULT(') > -1) {
                                  console.log('lalalalalala',field);
                                  if (fieldData && fieldData!=''){
                                      field.value=fieldData.value;
                                    }else{
                                      eformFuncs.default(field,field.preCal);  
                                    }       
                                }


                                if(util.getPrefixField(field.preCal,'GRIP(') == -1 && util.getPrefixField(field.preCal,'G_R_I_PLBS(') == -1
                                   && util.getPrefixField(field.preCal,'CONCAT(PatientAppointment.FirstName,PatientAppointment.LastName)') == -1
                                   && util.getPrefixField(field.preCal,'CONCAT(PatientAppointment.DOB)') == -1
                                   && util.getPrefixField(field.preCal,'AGE(PatientAppointment.DOB)') == -1                                   
                                   ){ 

                                      field.value = fieldData.value;
                                }
                              }else{
                                field.value = fieldData.value;                                
                              }                             
                          }
                        }

                    }
                }//End for of rows
            }//end for of sections

            console.log('----------------------------------->End Time 0',(new Date() - startAt),'<------------------------------');

            for (var i = 0; i < arrFieldsAfter.length; i++) {
              if(util.getPrefixField(arrFieldsAfter[i].cal,'GRIPRANGETOCHECK(') > -1 || util.getPrefixField(arrFieldsAfter[i].cal,'GRIPLBSRANGETOCHECK(') > -1){                                
                eformFuncs.griprangecheck(fieldsByName, fieldsByRef, template, arrFieldsAfter[i].cal, arrFieldsAfter[i]);                
              }

              if(util.getPrefixField(arrFieldsAfter[i].cal,'WHRCHECK(') > -1){  
                console.log('arrFieldsAfter[i] >>>>', arrFieldsAfter[i]);                                          
                eformFuncs.whrcheck(fieldsByName,fieldsByRef,template,arrFieldsAfter[i].cal,arrFieldsAfter[i])
              }
              if(util.getPrefixField(arrFieldsAfter[i].cal,'VOMAX(') > -1){                                                           
                eformFuncs.vomax(fieldsByName,fieldsByRef,template,arrFieldsAfter[i].cal,arrFieldsAfter[i])
              }
            }

            // console.log('total count:', countInputText);

            if(isResolve){
                resolve('success');
            }
        });

}
