import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';


export default class SignaturePatient extends Component {

    static propTypes = {
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number
    }

    componentDidMount() {

    }

    render() {

        var isDisabled = false;
        var isVisible = true;

        if(this.props.isDisabled){
            isDisabled = this.props.isDisabled;
        }

        if(this.props.isVisible){
            isVisible = this.props.isVisible;
        }

        // var userRoleStr = this.props.userRole.RoleVs[0].RoleCode;

        // var arrRolesEdit =  null;
        // var arrRolesView =  null;
        
        // if (this.props.roles) {
        //     arrRolesEdit =  this.props.roles.edit;
        //     arrRolesView =  this.props.roles.view.list;    
        //     isDisabled=util.getDisabled(arrRolesEdit, userRoleStr);
        //     isVisible=util.getVisible(arrRolesView, userRoleStr);
        // }

        
        var type = this.props.type;
        var html = null;
        var htmlSignature = (this.imageSignature)?<img ref="sign"/>:'No signature';
        var display = (
            <div className="col-xs-12">
                <img ref="canvas" width="100%" id={this.props.refTemp} disabled={isDisabled}/>
            </div>
        )
        switch(type){
            case 'eform_input_image_patient':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        <div className="form-group" id={this.props.groupId}>
                            {display}
                        </div>
                    </div>
                )
        }
        return html;

    }
}
