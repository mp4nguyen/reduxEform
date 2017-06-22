import React, { Component } from 'react'

import * as util from '../../redux/lib/utilities';


export default class InputText extends Component {

    static contextTypes = {
      onMyBlur: React.PropTypes.func,
      updateField: React.PropTypes.func,
      updateTableField: React.PropTypes.func,
      updateAxisXField: React.PropTypes.func,
      trigerFields : React.PropTypes.object
    }

    static propTypes = {
      name: React.PropTypes.string,
      labelPrefix: React.PropTypes.string,
      labelSuffix: React.PropTypes.string,
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number,
      colTableId: React.PropTypes.number,
      rowTableId: React.PropTypes.number,
      required: React.PropTypes.bool,
      rowAxisID:React.PropTypes.number,
      colAxisID:React.PropTypes.number
    }


    componentDidMount() {
        
        var tempArr = this.context.trigerFields[this.props.name];

        if (tempArr && tempArr.length>0) {
            for (var j = 0; j < tempArr.length; j++) {
                if (tempArr[j].preCal && (tempArr[j].preCal.indexOf('EQUAL')>-1 || tempArr[j].preCal.indexOf('EQUALP')>-1)) {
                   this.context.updateField(tempArr[j].field.fieldPosition.sectionID,tempArr[j].field.fieldPosition.rowID,tempArr[j].field.fieldPosition.fieldID,this.props.value); 
                } 
            }
        }                            
           
    }

    onBlur(event){
      this.context.onMyBlur(this.props.sectionID,this.props.rowID,this.props.fieldID,event.target.value);
    }

    updateField(event){
        console.log('onchange ..........');
        if(this.props.rowTableId >= 0 && this.props.colTableId >= 0){
            //console.log('InputText: update value = ',event.target.value);
            //console.log('v1');
            this.context.updateTableField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowTableId,this.props.colTableId,event.target.value);
        }else{
            if(this.props.rowAxisID >= 0 && this.props.colAxisID >= 0){
                //console.log('v3', this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowAxisID,this.props.colAxisID,event.target.value);
                //console.log('InputText: update value = ',event.target.value);
                this.context.updateAxisXField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowAxisID,this.props.colAxisID,event.target.value);
            }else{
                //console.log('v2');
                this.context.updateField(this.props.sectionID,this.props.rowID,this.props.fieldID,event.target.value);
            }
        }



    }

    render() {

        var labelPrefixStyle = {
            border: 'none',
            color: '#666',
            paddingLeft: '1px',
            paddingRight:'5px'
        }
        var labelSuffixStyle = {
            border: 'none',
            color: '#666',
            paddingLeft: '5px',
            paddingRight:'1px'
        }
        var inputStyle = {
            paddingLeft: '1px',
            paddingRight:'1px'
        }

        var disabledStyle={
            paddingLeft: '1px',
            paddingRight:'1px',
            border : '1px solid #b6b6b6'
        }

        var requiredStyle={
            paddingLeft: '1px',
            paddingRight:'1px',
            border : '2px solid red'
        }

        var hidden = {
            display:'none'
        }

        var classNameInputText = "form-control";

        var styleInputText={};

        var isRequired = this.props.required;

        var isDisabled = false;
        var isVisible = true;

        if(this.props.isDisabled){
            isDisabled = this.props.isDisabled;
        }

        if(this.props.isVisible){
            isVisible = this.props.isVisible;
        }

        if (isRequired && (this.props.value == '' || this.props.value == undefined )) {
            styleInputText=requiredStyle;
        }else{
            if (isDisabled) {
                styleInputText=disabledStyle;
            }else{
               styleInputText=inputStyle;
            }
        }

        // console.log('value this props', this.props.value);

        return (

              <div  className={isVisible ? hidden : ''}>
                <div className={"dragField col-xs-"+this.props.size} ref="group">
                    <div className="form-group" id={this.props.groupId}>
                        <div className="col-xs-12">
                            {
                                this.props.labelPrefix || this.props.labelSuffix?
                                <div className="input-group">
                                    {this.props.labelPrefix?
                                        <span className="input-group-addon" style={labelPrefixStyle}>{this.props.labelPrefix}</span>
                                        :null
                                    }
                                    <input  type="text" name={this.props.name} className="form-control has-danger" style={styleInputText} 
                                            placeholder={this.props.placeholder} value={this.props.value} disabled={isDisabled} 
                                            onChange={this.updateField.bind(this)} required={isRequired} onBlur={this.onBlur.bind(this)}/>
                                    {this.props.labelSuffix?
                                        <span className="input-group-addon" style={labelSuffixStyle}>{this.props.labelSuffix}</span>
                                        :null
                                    }

                                </div>
                                :<input type="text" name={this.props.name} className="form-control has-danger" style={styleInputText} 
                                        placeholder={this.props.placeholder} value={this.props.value} disabled={isDisabled} 
                                        onChange={this.updateField.bind(this)} required={isRequired} onBlur={this.onBlur.bind(this)}/>
                            }

                        </div>
                    </div>
                </div>
              </div>
                )
    }
}
