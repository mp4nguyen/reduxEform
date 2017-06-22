import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';


export default class Radio extends Component {

    static contextTypes = {
      onBlur: React.PropTypes.func,
      updateField: React.PropTypes.func,
      updateTableField: React.PropTypes.func
    }

    static propTypes = {
      name: React.PropTypes.string,
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      checked: React.PropTypes.bool,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number
    }


    componentDidMount(){

    }

    onChange(event) {
        // console.log('radio change = ',event.currentTarget.value);
        // this.context.updateField(this.props.sectionID,this.props.rowID,this.props.fieldID,event.currentTarget.value);

        // if(this.props.rowTableId >= 0 && this.props.colTableId >= 0){
        //     console.log('InputText: update value = ',event.target.value);
        //     this.context.updateTableField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowTableId,this.props.colTableId,event.currentTarget.value);
        // }else{
            this.context.updateField(this.props.sectionID, this.props.rowID, this.props.fieldID, event.currentTarget.value);
        //}
    }

    render() {

        // console.log('Redering  field = ' , this.props.checked);

        var type = this.props.type;
        var html = null;
        var display_name = null;

        var cssCheckBox = "iradio_square-green";

        var isDisabled = false;
        var isVisible = true;

        isDisabled = this.props.isDisabled;



        if(this.props.isDisabled){                    
            if (this.props.checked == true && isDisabled == true) {            
                cssCheckBox = "iradio_square-grey checked";
            }else if (this.props.checked == false && isDisabled == true) {
                cssCheckBox = "iradio_square-grey";
            }
        }else{
            if (this.props.checked == true && isDisabled == false) {
                cssCheckBox = "iradio_square-green checked";
            }else if (this.props.checked == false && isDisabled == false) {
                cssCheckBox = "iradio_square-green";
            }
        }

        if(this.props.isVisible){
            isVisible = this.props.isVisible;
        }

        if(!this.props.checked){
            cssCheckBox = "iradio_square-grey";
        }

        // var userRoleStr = '';

        // if(this.props.userRole && this.props.userRole.RoleVs){
        //     userRoleStr = this.props.userRole.RoleVs[0].RoleCode;
        // }

        // if (this.props.checked) {
        //         cssCheckBox = "iradio_square-green checked";
        // }


        // var arrRolesEdit =  null;
        // var arrRolesView =  null;

        // var isConcat = false;
        // var isHaveCal = false;

        // if (this.props.roles) {
        //     arrRolesEdit =  this.props.roles.edit;
        //     arrRolesView =  this.props.roles.view.list;
        //     isVisible=util.getVisible(arrRolesView, userRoleStr);
        //     if (this.props.cal) {
        //         isConcat = this.props.cal.startsWith("CONCAT");
        //         isHaveCal=true;
        //     }
        //     if (this.props.preCal) {
        //         isConcat = this.props.preCal.startsWith("CONCAT");
        //         isHaveCal=true;
        //     }
        //     // if (isConcat == false && isHaveCal == true) {
        //     //     isDisabled = true;
        //     // }else{
        //     //      isDisabled = util.getDisabled(arrRolesEdit, userRoleStr);
        //     // }

        //     isDisabled = util.getDisabled(arrRolesEdit, userRoleStr);
        // }




        if(this.props.permission === 'eformDev'){
            display_name = (
                <div style={{position: 'absolute', top: -30, left: 0, backgroundColor: 'green', color: 'white', padding: 5}}>
                    {this.props.name + ' ' +this.props.refTemp}
                </div>
            )
        }



        switch(type){
            case 'default':
                html = (
                    <input type="radio"  name={this.props.name} id={this.props.id} ref="input" value={this.props.value} disabled={isDisabled} />
                )
                break;
            case 'eform_input_check_radio':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        {display_name}
                        <div className="form-group" id={this.props.groupId}>
                            <div className="col-xs-12">

                                    <label ref="label_radio" onDoubleClick = {this.selection}>
                                        <div className={cssCheckBox} style={{position: 'relative'}}>
                                            <input
                                                style={{ labelHover: false, cursor: true, radioClass: 'iradio_square-green', position: 'absolute', opacity:0}}
                                                type="radio"
                                                name={this.props.name}
                                                checked={this.props.checked}
                                                title={this.props.name}
                                                tabIndex="-1"
                                                value={this.props.value}
                                                id={this.props.refTemp}
                                                onChange={this.onChange.bind(this)}
                                                disabled={isDisabled}

                                            />
                                        </div>
                                        <span>&nbsp;</span>
                                        {this.props.label}
                                    </label>

                            </div>
                        </div>
                    </div>
                )
                break;

            case 'radio_yes_no':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        {display_name}
                        <div className="form-group" id={this.props.groupId}>
                            <div className="col-xs-12">
                                <div className="icheck-inline">
                                    <label ref="label_radio" onDoubleClick = {this.selection}>
                                        <div className={cssCheckBox} style={{position: 'relative'}}>
                                            <input
                                                style={{ labelHover: false, cursor: true, radioClass: 'iradio_square-green', position: 'absolute', opacity:0}}
                                                type="radio"
                                                name={this.props.name}
                                                checked={this.props.checked}
                                                title={this.props.name}
                                                tabIndex="-1"
                                                value={this.props.value}
                                                id={this.props.refTemp}
                                                onChange={this.onChange.bind(this)}
                                                disabled={isDisabled}
                                                
                                            />
                                        </div>
                                        <span>&nbsp;</span>
                                        {this.props.label}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
        }
        return html

    }
}
