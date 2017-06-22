import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import * as eformActions from '../../redux/actions/eformActions/';
import Section from '../../section/components/section';
import SubmitModal from './submitModal.component.js';

var updateAt = null;

var createAt = null;


var handleWindowClose = function(ev){
    ev.preventDefault();
    alert("Alerted Browser Close");
}

class Home extends Component {


    static childContextTypes = {
      onMyBlur: React.PropTypes.func,
      updateField: React.PropTypes.func,
      updateSection: React.PropTypes.func,
      updateTableField: React.PropTypes.func,
      updatingFields: React.PropTypes.array,
      updateAxisXField:React.PropTypes.func,
      updateChartLineImage:React.PropTypes.func,
      updateChartLineHeaderImage:React.PropTypes.func,
      Doctor:React.PropTypes.object,
      trigerFields: React.PropTypes.object,
      submitEform: React.PropTypes.func
    }


    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            error: null,
			      errorDetails: null,
            open: false,

        }

        this.handler = (ev) => {
          ev.preventDefault();

          // if(this.props.saveEform){
          //     this.props.saveEform();
          // }

          return ev.returnValue = 'Are you sure you want to close?';
        }
    }

    componentWillMount(){
      console.log(' eformActions = ',eformActions);
      console.log('home.component.js.componentWillMount: locationParams = ',this.props);

      console.log('this.props.location >>>> ',this.props.location);


      if(this.props.location.query.templateUID){
          this.props.fetchEformTemplateFromServer(this.props.location.query);
      }else {
          this.setState({
				error:'please enter route like : home/?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14',
				errorDetails: this.props.location.pathname + ' ' + this.props.location.search
				});
          console.log('please enter route like : home/?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14');
      }
    }

    componentWillUnmount(e){

    }

    componentDidMount() {
      window.addEventListener("beforeunload", this.handler);
      window.addEventListener("pagehide", this.handler);

    }

    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.handler);
      window.removeEventListener("pagehide", this.handler);
    }

    componentWillUpdate(){
      updateAt = new Date();
      console.log("home.container.componentWillUpdate: start at = ",updateAt);
    }

    componentDidUpdate() {
      console.log("home.container.componentDidUpdate: at ",(new Date()) - updateAt );
    }

    getChildContext() {
      var o = {
        onMyBlur: this.props.onMyBlur,
        updateField: this.props.updateField,
        updateTableField: this.props.updateTableField,
        updatingFields: this.props.eform.updatingFields,
        updateSection: this.props.updateSection,
        updateAxisXField : this.props.updateAxisXField,
        updateChartLineImage:this.props.updateChartLineImage,
        updateChartLineHeaderImage:this.props.updateChartLineHeaderImage,
        Doctor: this.props.eform.Doctor,
        trigerFields : this.props.eform.trigerFields,
        submitEform: this.props.submitEform
      };
      return o;
    }

    _saveForm(event){
        event.preventDefault();
        this.props.saveEform();
    }

    _printForm(type){
        console.log('home.container._printForm: type = ',type, this.props);
        this.props.printEform(type);
    }

    _SubmitForm(type){
        this.setState({open: true});
    }

    _EnableEform(){
        console.log('home.container._EnableEform: type ');
        this.props.updateShowHideEform();
    }

    _handleClose(){
      this.setState({open: false});
    }



    render() {

        //createAt = new Date();
        //console.log("ended load data from server at ",createAt);
        if(this.props.eform.params && this.props.eform.params.eformTemplateName){
            document.title = this.props.eform.params.eformTemplateName;
        }else{
            document.title = 'Eform loading...';
        }

        var displayButtonEnableEform=null;
        if (this.props.eform.isShowUID.IsShow && this.props.eform.isShowUID.IsShow  == 'N') {
          displayButtonEnableEform = (
            <button ref="btnEnable" className="btn green btn-sm" onClick={this._EnableEform.bind(this,'DOWNLOAD')}>
                                                 <i className="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;
                                                 Enable Eform
            </button>
          );
        }

        var displaySubmitButton=null;
        console.log('this.props.eform.params.Token >>>>>>', this.props.eform.params.Token);
        console.log('this.props.eform.params >>>>>>', this.props.eform.params);
        if (this.props.eform.params.Token && this.props.eform.params.Token  != '') {
          displaySubmitButton = (
            <button ref="btnSubmit" type="button" className="btn green btn-sm" onClick={this._SubmitForm.bind(this)}>
                         <i className="fa fa-save"></i>&nbsp;
                         Submit Form
            </button>
          );
        }

        if(this.props.eform && this.props.eform.template && this.props.eform.template.sections){

          var numberOfSections = this.props.eform.template.sections.length;

          console.log('home.render: numberOfSections = ',numberOfSections);


          return (
            <form id="myEform" className="container-fluid" onSubmit={this._saveForm.bind(this)}>
              <div className="page-content">
                  <SubmitModal isOpen={this.state.open} closeDialog={this._handleClose.bind(this)}/>
                  <div ref="content">
                    <div className="page-bar">
                         <div className="page-toolbar">
                             <div className="pull-right">
                                 <button ref="btnSave" type="submit" className="btn green btn-sm">
                                               <i className="fa fa-save"></i>&nbsp;
                                               Save Form
                                 </button>
                                 &nbsp;
                                 <button ref="btnSave" type="button" className="btn green btn-sm" onClick={this._printForm.bind(this,'VIEW')}>
                                               <i className="fa fa-save"></i>&nbsp;
                                               Print eForm
                                 </button>
                                 &nbsp;
                                 <button ref="btnSave" type="button" className="btn green btn-sm" onClick={this._printForm.bind(this,'DOWNLOAD')}>
                                               <i className="fa fa-save"></i>&nbsp;
                                               Download eForm
                                 </button>
                                 &nbsp;
                                
                                 {displayButtonEnableEform}
                             </div>
                         </div>
                     </div>
                     <h3 className="page-title"> {this.props.eform.params.eformTemplateName}</h3>
                      <div className="row">
                          <div className="col-md-12">
                              {
                                  this.props.eform.template.sections.map(function(section, index){
                                          return <Section
                                                    key={index}
                                                    name={section.name}
                                                    rows={section.rows}
                                                    code={index}
                                                    sectionID={index}
                                                    viewType={section.viewType}
                                                    isShow={section.isShow}
                                                    userRole={this.props.eform.userRole}
                                                    isOpen={section.isOpen}
                                                    isComplete={section.isComplete}
                                                    showOpenCloseSection={section.showOpenCloseSection}
                                                    defaultOpenCloseSection={section.defaultOpenCloseSection}
                                                />
                                  }, this)
                              }
                          </div>
                      </div>
                      <div className="page-bar">
                           <div className="page-toolbar">
                               <div className="pull-right">
                                 <div className="pull-right">
                                     <button ref="btnSave" type="submit" className="btn green btn-sm">
                                                   <i className="fa fa-save"></i>&nbsp;
                                                   Save Form
                                     </button>
                                     &nbsp;
                                     <button ref="btnSave" type="button" className="btn green btn-sm" onClick={this._printForm.bind(this,'VIEW')}>
                                                   <i className="fa fa-save"></i>&nbsp;
                                                   Print Form
                                     </button>
                                     &nbsp;
                                     <button ref="btnSave" type="button" className="btn green btn-sm" onClick={this._printForm.bind(this,'DOWNLOAD')}>
                                                   <i className="fa fa-save"></i>&nbsp;
                                                   Download Form
                                     </button>
                                     &nbsp;

                                     {displaySubmitButton}

                                     &nbsp;
                                     {displayButtonEnableEform}
                                 </div>
                               </div>
                           </div>
                       </div>
                  </div>
              </div>
            </form>
          );
        }else if(this.state.error){
          return(
				<div>
					<div>{this.state.error}</div>
					<div>{this.state.errorDetails}</div>
				</div>

                )
        }else{
          return(
                <div>Loading...</div>
                )
        }

    }

}



const mapStateToProps = (state) => {
    return {
        eform: state.eform
    }
}
export default connect(mapStateToProps, eformActions)(Home)
