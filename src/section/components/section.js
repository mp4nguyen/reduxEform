import React, { Component } from 'react'
import * as _ from 'underscore'
import Row from '../../row/components/row';

export default class Section extends Component {

    static contextTypes = {
      updatingFields: React.PropTypes.array,
      updateSection: React.PropTypes.func
    }

    static propTypes = {
      rows: React.PropTypes.array,
      sectionID: React.PropTypes.number,
      name: React.PropTypes.string,
      code: React.PropTypes.number,
      viewType: React.PropTypes.string,
      isShow:  React.PropTypes.bool,
      userRole: React.PropTypes.object,
      isOpen: React.PropTypes.bool,
      isComplete: React.PropTypes.bool,
      showOpenCloseSection: React.PropTypes.string,
      defaultOpenCloseSection: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isComplete: false
        }
    }

    componentWillMount(){
      // console.log('section.componentWillMount: sectionID = ',this.props.sectionID);
      // console.log('section.componentWillMount: isOpen = ',this.props.isOpen);
      // console.log('section.componentWillMount: showOpenCloseSection = ',this.props.showOpenCloseSection);
      // console.log('section.componentWillMount: defaultOpenCloseSection = ',this.props.defaultOpenCloseSection);
      //this.setState({isShow:this.props.isOpen});
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        //only update section that have the updated field
        //by checking sectionID
        //var startAt = new Date();
        //console.log(' section nextContext.updatingFields = ',nextContext.updatingFields);
        var isUpdate = false;
        nextContext.updatingFields.forEach(f=>{
            // if(this.props.sectionID == f.sectionID) || f.sectionID == 'reLoad'){
              if(this.props.sectionID == f.sectionID || f.sectionID == 'reLoad') {
                isUpdate =  true;
              }
        });

        return isUpdate;
        //return true;
    }

    componentDidMount() {

    }

    _onChangeViewType(value){
        console.log('ShowHide change value = ',value);
        //this.setState({isShow:value});
        this.context.updateSection(this.props.sectionID,'isShow',value);
    }

    _openCloseSection(){
        //var newState = Object.assign({},{isShow:!this.state.isShow});
        //this.setState(newState);
        this.context.updateSection(this.props.sectionID,'isOpen',!this.props.isOpen);
    }

    _completeSection(){
        this.context.updateSection(this.props.sectionID,'isComplete',!this.props.isComplete);
    }

    _calShowRow() {
        let isShowRow = false;
        if (this.props.isOpen == false ) {
          isShowRow = false
        } else if (this.props.isOpen == true) {
          isShowRow = true
        } else if (this.props.defaultOpenCloseSection == 'NO' || this.props.defaultOpenCloseSection == undefined) {
          isShowRow = false
        } else if (this.props.showOpenCloseSection == undefined || this.props.showOpenCloseSection == 'NO' ) {
          isShowRow = true
        }
        return isShowRow
    }

    _showhideButtons(){
        //Only hide OpenClose button if it is forced to NO
        let isShowRow = this._calShowRow();
        if (this.props.showOpenCloseSection == 'YES')
          return (
            <div><i className={ isShowRow ?'fa fa-minus':'fa fa-plus'}></i> { isShowRow ?'Close section':'Open section' }</div>
          )
        else
          return null
    }

    _renderShowHide(){
        if(this.props.viewType == 'dynamic'){
          return(

            <div style={{display: 'inline-block', marginBottom: '10px'}} className="form-group">
              <div className={this.props.isShow?"iradio_square-green checked":"iradio_square-green"}>
                <input
                      style={{ labelHover: false, cursor: true, radioClass: 'iradio_square-green', position: 'absolute', opacity:0}}
                      type="radio" value="yes" name={this.props.sectionID+'_viewType'} onChange={this._onChangeViewType.bind(this,true)}
                      checked={this.props.isShow}/>
                </div>
                      Show &nbsp;

              <div className={!this.props.isShow?"iradio_square-green checked":"iradio_square-green"}>
                <input
                     style={{ labelHover: false, cursor: true, radioClass: 'iradio_square-green', position: 'absolute', opacity:0}}
                     type="radio" value="no" name={this.props.sectionID+'_viewType'} onChange={this._onChangeViewType.bind(this,false)} checked={!this.props.isShow}/>
              </div>
                      Hide &nbsp;<b>{this.props.name}</b>

            </div>

          );
        }else{
          return null;
        }
    }

    _renderSection(){
      if(this.props.viewType == 'dynamic'){
        if(this.props.isShow){
          return (
            <div className="portlet box green" ref="section">
                  <div className="portlet-title">
                      <div className="caption">
                          {this.props.name}
                          &nbsp;
                      </div>
                  </div>

                  <div className="portlet-body form">
                      <div className="form-horizontal">
                          <div className="form-body">
                            {
                              this.props.rows.map(function(row,index){
                                  return <Row
                                            key={index}
                                            fields = {row.fields}
                                            rowID={index}
                                            sectionID={this.props.sectionID}
                                            userRole = {this.props.userRole}
                                          />
                              },this)
                            }
                          </div>
                      </div>
                  </div>
               </div>
          );
        }else{
          return null;
        }

      }else{
        return (
          <div className="portlet box green" ref="section">
                <div className="portlet-title">
                    <div className="caption">
                        {this.props.name}
                        &nbsp;
                    </div>
                    <div className="actions">
                      <a className="btn green btn-sm" onClick={this._completeSection.bind(this)}>
                          <i className={this.props.isComplete? 'fa fa-check' : 'fa fa-close' }></i> {this.props.isComplete?'Complete':'Incomplete'}
                      </a>
                      <a className={this.props.showOpenCloseSection == 'YES' ? 'btn green btn-sm' : 'btn green btn-sm invisible'} onClick={ this._openCloseSection.bind(this) }>
                          { this._showhideButtons() }
                      </a>

                    </div>
                </div>
                  {/*<div className="portlet-body form flip-scroll">*/}
                 <div className="portlet-body form">
                      <div className="form-horizontal">
                          <div className="form-body">
                            {
                                this._renderRows()
                            }
                          </div>
                      </div>
                  </div>
             </div>
        );
      }

    }

    _renderRows(){
      //only close section if isOpen == false && defaultOpenCloseSection = 'NO'

      let isShowRow = this._calShowRow();
      // this.setState({isShowRow:isShowRow});

      if (!isShowRow) {
        //close section
        return <div />
      }
      else {
        var rows = [];
        this.props.rows.map(function(row,index){
            rows.push(<Row
                      key={index}
                      fields = {row.fields}
                      rowID={index}
                      sectionID={this.props.sectionID}
                      userRole = {this.props.userRole}
                    />);
        },this)
      }
      return rows;
    }

    render() {
        // console.log('Rendering sectionID = ',this.props.sectionID);
        return (
              <div className="row">
                  <div className="col-md-12">
                      {this._renderShowHide()}
                      {this._renderSection()}
                  </div>
              </div>
        )
    }
}


//{this.renderRows()}
