import React, { Component } from 'react'


export default class Label extends Component {

    static propTypes = {
      size: React.PropTypes.string,      
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number
    }

    componentDidMount() {

    }

    render() {
        var type = this.props.type;
        var html = null;
        var labelStyle = {
            "white-space": "pre-wrap"
        }
        
        switch(type){
          case 'default':
              html = (
                  <label>Label</label>
              )
              break;
          case 'eform_input_check_label_html':
              html = (
                  <div className={"dragula col-md-"+this.props.size} ref="group">
                      <div className="form-group" id={this.props.groupId}>
                          <div className="col-md-12">
                              <span className="form-control-static"
                                  dangerouslySetInnerHTML={{__html: this.props.label}} ref="label" onDoubleClick = {this.selection} style = {labelStyle}/>
                          </div>
                      </div>

                  </div>
              )
              break;
          case 'eform_input_check_label':
              html = (
                  <div className={"dragula col-xs-"+this.props.size} ref="group">
                      <div className="form-group" id={this.props.groupId}>
                          <div className="col-xs-12">
                              <span className="form-control-static" ref="label"  onDoubleClick = {this.selection} style = {labelStyle}>
                                  {this.props.label}
                              </span>
                          </div>
                      </div>
                  </div>
              )
        }

        return html;
  
    }
}
