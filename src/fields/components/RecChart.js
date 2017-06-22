
import React, { Component } from 'react'
import InputRecChart from '../../fields/components/InputRecChart';


var labelsY = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
var labelsX = [
    {value: 500},
    {value: 1000},
    {distance: 'near', value: 1500, position: 'up'},
    {distance: 'near', value: 2000},
    {distance: 'near', value: 3000, position: 'up'},
    {distance: 'near', value: 4000},
    {distance: 'near', value: 6000, position: 'up'},
    {distance: 'near', value: 8000}
];

var paper = null;
var dataMain = [];

export default class RecChart extends Component {

    static contextTypes = {
      updateField: React.PropTypes.func,
      updateTableField: React.PropTypes.func,
      updateAxisXField: React.PropTypes.func,
      updateChartLineImage: React.PropTypes.func,
      updateChartLineHeaderImage: React.PropTypes.func
    }

    static propTypes = {
      name: React.PropTypes.string,      
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,      
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number,
      rowAxisID:React.PropTypes.number,
      colAxisID:React.PropTypes.number,
      axisX:React.PropTypes.object,  
      series:React.PropTypes.array,  
      title:React.PropTypes.string,  
      subtitle:React.PropTypes.string                                      
    }
   
    updateChartImage(value){        
        this.context.updateChartLineImage(this.props.sectionID,this.props.rowID,this.props.fieldID, value);
    }

    updateChartHeaderImage(header){        
        this.context.updateChartLineHeaderImage(this.props.sectionID,this.props.rowID,this.props.fieldID, header);
    }

    componentDidMount(){
        
        if(this.props.permission !== 'eformDev'){            

            paper = Raphael('chart', 840, 620);

            var rectangle = paper.rect(30, 30, 800, 520);

            paper.text(45, 290, 'm').attr({'font-size': 14});
            paper.text(165, 330, 'ee').attr({'font-size': 14});
            paper.text(195, 340, 'or').attr({'font-size': 14});
            paper.text(345, 330, 'ar').attr({'font-size': 14});
            paper.text(345, 240, 'p').attr({'font-size': 14});
            paper.text(465, 260, 'k').attr({'font-size': 14});
            paper.text(565, 160, 'f').attr({'font-size': 14});
            paper.text(615, 202, 'th').attr({'font-size': 14});
            paper.text(615, 260, 't').attr({'font-size': 14});
            paper.text(568, 280, 'sh').attr({'font-size': 14});
            paper.text(645, 280, 's').attr({'font-size': 14});

            var distance = 30;
            var distance_line = 70;
            for(var ly = 0; ly < labelsY.length; ly++){
                if(labelsY[ly] == 10){
                    paper.path([
                        'M', 30, distance_line,
                        'L', 830, distance_line
                    ]).attr({
                        'stroke-width': 3                        
                    });
                }else{
                    if(ly < labelsY.length-2){
                        paper.path([
                            'M', 30, distance_line,
                            'L', 830, distance_line
                        ]);
                    }
                }
                paper.text(10, distance, labelsY[ly]).attr({'font-size': 12});
                distance += 40;
                distance_line += 40;
            }

            var distance = 180;
            var distance_line = 180;
            for(var lx = 0; lx < labelsX.length; lx++){
                if(typeof labelsX[lx].distance !== 'undefined' && labelsX[lx].distance === 'near'){
                    distance = distance-75;
                    distance_line = distance_line-75;
                    if(typeof labelsX[lx].position !== 'undefined' && labelsX[lx].position === 'up'){
                        paper.text(distance, 15, labelsX[lx].value).attr({'font-size': 14});
                        paper.path([
                            'M', distance_line, 30,
                            'L', distance_line, 550
                        ]).attr({"stroke-dasharray": "--"});
                    }else{
                        paper.text(distance, 565, labelsX[lx].value).attr({'font-size': 14});
                        paper.path([
                            'M', distance_line, 30,
                            'L', distance_line, 550
                        ]);
                    }
                }else{
                    paper.text(distance, 565, labelsX[lx].value).attr({'font-size': 14});
                    paper.path([
                        'M', distance_line, 30,
                        'L', distance_line, 550
                    ]);
                }
                distance += 150;
                distance_line += 150;
            }

            var data = this.props.series;
            this._drawChart(data);

            this.getPrint();
        }
    }
   

   _drawChart(data){

        if (dataMain) {
            dataMain.map(function(d){
                d.path.remove();
            });
        }

        var v_index = 0;
        var path = null;
        data.map(function(v){
            var distance_y = 30;
            var distance_x = 180;
            var d_index = 0;
            var d_array = ['M'];
            v.data.map(function(d){
                if(d >= 0)
                    var d_y = (d*4)+30+40;
                else{
                    if(d === -10)
                        var d_y = 30;
                    else
                        var d_y = Math.abs((d*4))+30;
                }
                if(d_index === 0){
                    d_array.push(distance_x);
                    d_array.push(d_y);
                    distance_x += 150;
                }
                else{
                    d_array.push('L');
                    d_array.push(distance_x);
                    d_array.push(d_y);
                    distance_x += 75;
                }
                d_index++;
            })
            if(v_index === 0){
                path = paper.path(d_array)
                .attr({
                    'stroke-width': 3,
                    'stroke': 'red',
                    'stroke-dasharray':'.'
                });
                
                dataMain.push({path: path});
               
            }else{
                path = paper.path(d_array)
                .attr({
                    'stroke-width': 3,
                    'stroke': 'blue'
                });
               
                dataMain.push({path: path});
               
            }
            v_index++;
        })
   }
   
    _clickUpdateChart(){
        var data = this.props.series;
        this._drawChart(data); 
        this.getPrint();       
    }

    
    getPrint(){
        var self = this;
        var svg = document.getElementById('chart');
        svg = svg.innerHTML;
        var image = new Image;
        var canvas = document.createElement('canvas');
        canvg(canvas, svg);
        var data = canvas.toDataURL();
        
        if (data != '') {
            data=data.replace('data:image/png;base64,','');
            self.updateChartImage(data);
        }

        var dataHeader='';
        html2canvas($(self.refs.header), {           
            onrendered: function(canvas){              
                dataHeader = canvas.toDataURL("image/png");
                if (dataHeader != '') {
                    dataHeader=dataHeader.replace('data:image/png;base64,','');
                }      
                self.updateChartHeaderImage(dataHeader);                
            }
        })
    }

    render(){

        if(this.props.permission === 'eformDev'){
            return (
                <div className={"col-xs-"+this.props.size} ref="group">
                    <div className="form-group" id={this.props.groupId}>
                        <div className="col-xs-12">
                            Rec Chart
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className={"col-xs-"+this.props.size} ref="group">
                    <div className="form-group" id={this.props.groupId}>
                        <div className="col-xs-12">
                            <button className="btn btn-primary btn-small" onClick={this._clickUpdateChart.bind(this)}>
                                Update Chart
                            </button>
                            <div ref="header" id="rec_chart_header">
                                <InputRecChart                                 
                                            ref="InputRecChart"                                             
                                            axisX = {this.props.axisX}
                                            series = {this.props.series}
                                            fieldID={this.props.fieldID}
                                            rowID={this.props.rowID}
                                            sectionID={this.props.sectionID}
                                            />
                            </div>
                            <center>
                                <span style={{width: '10px', background: 'red', height: '5px', display: 'inline-block'}}></span> 
                                &nbsp;
                                <span style={{width: '10px', background: 'red', height: '5px', display: 'inline-block'}}></span>
                                &nbsp;
                                <span style={{width: '10px', background: 'red', height: '5px', display: 'inline-block'}}></span>
                                &nbsp;
                                <span style={{width: '10px', background: 'red', height: '5px', display: 'inline-block'}}></span>                                                            
                                &nbsp;
                                Right Ear
                                &nbsp;
                                <span style={{width: '50px', background: 'blue', height: '5px', display: 'inline-block'}}></span> Left Ear                                
                            </center>
                            <br/>
                            <div ref="chart" id="chart"/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}