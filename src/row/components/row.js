import React, { Component } from 'react';
import * as _ from 'underscore'

import Table from '../../table/components/table';
import InputText from '../../fields/components/InputText';
import Label from '../../fields/components/Label';
import Radio from '../../fields/components/Radio';
import CheckBox from '../../fields/components/CheckBox';
import TextArea from '../../fields/components/TextArea';
import InputDate from '../../fields/components/InputDate';
import Signature from '../../fields/components/Signature';
import SignatureDoctor from '../../fields/components/SignatureDoctor';
import SignaturePatient from '../../fields/components/SignaturePatient';
import ChartLine from '../../fields/components/ChartLine';
import RecChart from '../../fields/components/RecChart';


export default class Row extends Component {

    static contextTypes = {
      updatingFields: React.PropTypes.array
    }

    static propTypes = {
      fields: React.PropTypes.array,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        //var startAt = new Date();
        //console.log(' row nextContext.updatingFields = ',nextContext.updatingFields);
        var isUpdate = false;
        nextContext.updatingFields.forEach(f=>{
            if(this.props.rowID == f.rowID || f.sectionID == 'reLoad'){
                isUpdate =  true;
            }
        });

        return isUpdate;

    }

    componentDidMount() {

    }

    render() {

        // console.log('Redering  RowID = ' , this.props.rowID);


        return (
                <div className="row">
                  {
                      this.props.fields.map((field,index)=>{
                        //console.log('field = ',field);
                        var groupId = 'fieldgroup_'+this.props.codeSection+'_'+this.props.code+'_'+index;
                        if(field.type === 'eform_input_text'){
                            return <InputText
                                    key={index}
                                    name={field.name}
                                    size={field.size}
                                    labelPrefix={field.labelPrefix}
                                    labelSuffix={field.labelSuffix}
                                    roles={field.roles}
                                    userRole = {this.props.userRole}
                                    preCal={field.preCal}
                                    cal={field.cal}
                                    value={field.value}
                                    required={field.required}
                                    isDisabled={field.isDisabled}
                                    isVisible={field.isVisible}
                                    fieldID={index}
                                    rowID={this.props.rowID}
                                    sectionID={this.props.sectionID}
                                />
                        }else if(field.type === 'eform_input_check_label'){
                            return <Label
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        size={field.size}
                                        code={index}
                                        label={field.label}/>
                        }else if(field.type === 'eform_input_check_label_html'){
                            return <Label
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        size={field.size}
                                        code={index}
                                        label={field.label}/>
                        }else if(field.type === 'eform_input_check_radio'){
                            return <Radio
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        code={index}
                                        label={field.label}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        preCal={field.preCal}
                                        cal={field.cal}
                                        value={field.value}
                                        checked={field.checked}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />
                        }else if(field.type === 'eform_input_check_checkbox'){
                            return <CheckBox
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        code={index}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        checked= {field.checked}
                                        preCal={field.preCal}
                                        cal={field.cal}
                                        value={field.value}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        label={field.label}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />
                        }else if(field.type === 'eform_input_textarea'){
                            return <TextArea
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        permission={this.props.permission}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        code={index}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        preCal={field.preCal}
                                        cal={field.cal}
                                        value={field.value}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        rows={field.rows}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />

                        }else if(field.type === 'eform_input_date'){
                            return <InputDate
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        refTemp={field.ref}
                                        code={index}
                                        preCal={field.preCal}
                                        cal={field.cal}
                                        value = {field.value}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />
                        }else if(field.type === 'eform_input_signature'){                            
                            return <Signature
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        code={index}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        height={field.height}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        value = {field.value}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        />
                        }else if(field.type === 'eform_input_image_doctor'){
                            
                            return <SignatureDoctor
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        code={index}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        height={field.height}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        image={field.image}
                                        doctorType = {field.doctorType}
                                        valueSign={field.valueSign}
                                        />
                        }else if(field.type === 'eform_input_image_patient'){
                            return <SignaturePatient
                                        key={index}
                                        type={field.type}
                                        groupId={groupId}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        code={index}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        isDisabled={field.isDisabled}
                                        isVisible={field.isVisible}
                                        height={field.height}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />
                        }else if(field.type === 'table'){
                            return <Table
                                        key={index}
                                        type={field.type}
                                        roles={field.roles}
                                        content={field.content}
                                        tableHeader={field.tableHeader}
                                        tableData={field.tableData}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />
                        }else if(field.type === 'line_chart'){
                                    return <ChartLine
                                        key={index}
                                        type={field.type}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        axisX={field.axisX}
                                        series={field.series}
                                        title={field.title}
                                        subtitle={field.subtitle}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />

                        }
                        else if(field.type === 'rec_chart'){
                                    return <RecChart
                                        key={index}
                                        type={field.type}
                                        name={field.name}
                                        size={field.size}
                                        ref={field.ref}
                                        refTemp={field.ref}
                                        axisX={field.axisX}
                                        series={field.series}
                                        title={field.title}
                                        subtitle={field.subtitle}
                                        roles={field.roles}
                                        userRole = {this.props.userRole}
                                        fieldID={index}
                                        rowID={this.props.rowID}
                                        sectionID={this.props.sectionID}
                                        />

                        }
                        else{
                          return <div key={index}/>
                        }

                      },this)
                  }
                </div>
                )
    }
}


//{this.renderRows()}
