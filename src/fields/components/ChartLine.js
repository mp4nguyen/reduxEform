import React, { Component } from 'react'
import InputAxisX from '../../fields/components/InputAxisX';

var labelsY = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export default class ChartLine extends Component {
   
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
   
   
    _clickUpdateChart(){

        
        var chart = $(this.refs.line_chart).highcharts();       

        var data0 = this.props.series[0].data;
        var data1 = this.props.series[1].data;


        chart.series[0].update({data: data0}, true);
        chart.series[1].update({data: data1}, true);
        
        chart.redraw();

        
        this.getBase64Value();
       
    }

   
    getBase64Value(){

        var self=this;

        var chart = $(this.refs.line_chart).highcharts();

        var render_width = chart.chartWidth;
        var render_height = chart.chartHeight;

        var svg = chart.getSVG({
            exporting: {
                sourceWidth: chart.chartWidth,
                sourceHeight: chart.chartHeight
            }
        });

        var canvas = document.createElement('canvas');
        canvas.height = render_height;
        canvas.width = render_width;

        var data='';
        var image = new Image;
        image.onload = function() {
            canvas.getContext('2d').drawImage(this, 0, 0, render_width, render_height);
            data = canvas.toDataURL("image/png");
            if (data != '') {
                data=data.replace('data:image/png;base64,','');
                self.updateChartImage(data);
            }
            //console.log('aaaaaaaaaaaaaaa',data);            
        };
        image.src = 'data:image/svg+xml;base64,' + window.btoa(svg);

        var dataHeader='';
        html2canvas($(self.refs.header), {           
            onrendered: function(canvas){
                // canvas.height = 200;
                // canvas.width =  500;
                dataHeader = canvas.toDataURL("image/png");
                if (dataHeader != '') {
                    dataHeader=dataHeader.replace('data:image/png;base64,','');
                }      
                self.updateChartHeaderImage(dataHeader);
                //console.log('aaaaaaaaaaaaaaa',dataHeader);           
            }
        })

    }

     componentDidMount(){
        if(typeof this.refs.group !== 'undefined' && this.props.context !== 'none'){
            $(this.refs.group).contextmenu({
                target: '#'+this.props.context,
                before: function(e, element, target) { 
                    e.preventDefault();
                    return true;
                },
                onItem: function(element, e) {
                    this.props.onRightClickItem(this.props.code, e, this.props.refTemp);
                }.bind(this)
            })
        }
        if(this.props.permission !== 'eformDev'){
            console.log('this.props.series >>>>', this.props.series);
            var self = this;
            var series = this.props.series;
            if(series[1]){
                series[1].color = 'blue'; 
                series[1].marker = {
                    symbol: 'triangle'
                }               
            }

            if(series[0]){
                series[0].color = 'red';
            }

            $(this.refs.line_chart).highcharts({
                chart: {
                    renderTo: 'line_chart',
                    height: 700,
                    // width: 'auto',
                    backgroundColor: '#FFFFFF',
                    marginTop: 90
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: this.props.axisX.categories,
                    tickmarkPlacement: 'on',
                    type: 'datetime',
                    labels: {
                      y: -580,
                      x: -20,
                      align: 'left',
                      style: {
                            color: 'black',
                            fontSize: '16px'
                        }
                    },
                    gridLineWidth: 2,
                    gridLineColor: 'black',
                    lineColor: 'black',
                    lineWidth: 2
                },
                yAxis: {
                    title: {
                        text: 'Hearing Level in Decibels (dB)'
                    },
                    labels: {
                        style: {
                            color: 'black',
                            fontSize: '16px'
                        }
                    },
                    reversed: true,
                    max: 120,
                    min: -10,
                    minRange: 5,
                    tickInterval: 10,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: 'black'
                    }],
                    gridLineWidth: 2,
                    gridLineColor: 'black',
                    lineColor: 'black',
                    lineWidth: 2
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0,
                    style: {
                        color: 'black',
                        fontSize: '16px'
                    }

                },

                plotOptions: {
                    series: {
                        marker: {
                            radius: 10
                        }
                    }
                },

                series: series

            })
        }
       
        this.getBase64Value();
    }

   
    render(){

        console.log('labelsY',labelsY);

        console.log('this props series ttt', this.props.series);

        if(this.props.permission === 'eformDev'){
            return (
                <div className={"col-xs-"+this.props.size} ref="group">
                    <div className="form-group" id={this.props.groupId}>
                        <div className="col-xs-12">
                            Line Chart
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                
                <div className={"dragula col-xs-"+this.props.size} ref="group">
                    <div className="form-group" id={this.props.groupId}>
                        <div className="col-xs-12">
                            <a  className="btn btn-primary btn-small" onClick={this._clickUpdateChart.bind(this)}>
                                Update Chart
                            </a>
                            <div ref="header" id="line_chart_header">
                                <InputAxisX 
                                
                                            ref="inputAxisX"                                             
                                            axisX = {this.props.axisX}
                                            series = {this.props.series}
                                            fieldID={this.props.fieldID}
                                            rowID={this.props.rowID}
                                            sectionID={this.props.sectionID}

                                            />
                                <center><h5>{this.props.title}</h5></center>
                                <center>{this.props.subtitle}</center>
                            </div>
                            
                            <div ref="line_chart" id="line_chart" style={{width:'100%'}}/>
                            
                        </div>
                    </div>
                </div>
                
            )
        }
    }
}
