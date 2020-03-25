import React, { Component } from 'react'
import {Card, Input, Button, Table} from 'antd';

import 'antd/dist/antd.css';

const InputColor = {

    background: "#bae7ff",
    color: "#003a8c", 
    fontWeight: "bold", 
    fontSize: "24px",
    width: 300 ,
    height:50

};


var  matrixA = [], matrixB = [], x , epsilon, count=1 ,A = [] , B = [],schedule = []

var table = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    }
];

class JacobiIterationMethod extends Component {
    
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showMatrix : true,
            showButton: true,
            showMatrixinput: false,
            showMatrixButton: false,
            showanswer: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.jacobi = this.jacobi.bind(this);
    
    }

  
    jacobi(n) {
        this.datainMatrix();
        x = new Array(n);
        var temp;
        var xold = new Array(n);
        epsilon = new Array(n);
        x.fill(0)
        xold.fill(0);
        do {
            temp = [];
            xold = x;
            for (var i=0 ; i<n ; i++) {
                var sum = 0;
                for (var j=0 ; j<n ; j++) {
                    if (i !== j) { 
                        sum = sum + A[i][j]*x[j];
                    }
                }
                temp[i] = (B[i] - sum)/A[i][i]; 
                
            }        

            x = temp;


        } while(this.error(x, xold)); 
        
        this.setState({
            showanswer: true
        });

      
    }
    error(xnew, xold) {
        for (var i=0 ; i<xnew.length ; i++) {
            epsilon[i] = Math.abs((xnew[i]-xold[i]) / xnew[i])
        }
        this.ErrorinTable(x, epsilon);
        for (i=0 ; i<epsilon.length ; i++) {
            if (epsilon[i] > 0.000001) {
                return true;
            }    
        }
        return false;  
    }   
    createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "20%",
                    height: "50%", 
                    backgroundColor:"#003a8c", 
            
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }

            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "20%",
                height: "50%", 
                backgroundColor:"#003a8c", 
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
                
            
        }

        this.setState({
            showMatrix : false,
            showButton : false,
            showMatrixinput : true,
            showMatrixButton : true
        })

        

    }
    datainMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {

                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }
    createX(n) {
        for (var i=1 ; i<=n ; i++) {
            table.push({
                title: "X"+i,
                dataIndex: "x"+i,
                key: "x"+i
            },)
        }
        for (i=1 ; i<=n ; i++) {
            table.push({
                title: "Error"+i,
                dataIndex: "error"+i,
                key: "error"+i
            },)
        }
    }

    ErrorinTable(x, error) {
        var st = ''
        st = st +'{"iteration": ' + count++ + ',';
        for (var i=0 ; i<x.length ; i++) {
            st = st+'"x'+(i+1)+'": '+x[i].toFixed(8)+', "error'+(i+1)+'": ' + error[i].toFixed(8);
            if (i !== x.length-1) {
                st = st+ ','
            }
        }
        st = st+ '}';
        schedule.push(JSON.parse(st));  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <body style={{  background: "#bae7ff", padding: "90px" , float:"left" }}>
                <h2 style={{color: "#003a8c", fontWeight: "bold",fontSize: "35px"}}>Jacobi Iteration Method</h2>
                <div>
                    <Card
                      
                      bordered={true}
                      style={{ width: 700 ,height:600, background: "#40a9ff", color: "#FFFFFFFF", float:"Auto"}}
                      onChange={this.handleChange}
                    >
                        {this.state.showMatrixinput && <div><h2>MatrixA</h2><br/>{matrixA}<h2>VectorB<br/></h2>{matrixB}</div>}
                        
                        {this.state.showMatrix && 
                            <div>
                                <h2>Row</h2><Input size="large"  name="row"  placeholder={"Input Row"} style={InputColor}></Input><br/><br/><br/><br/>
                                <h2>Column</h2><Input size="large" name="column"  placeholder={"Input Column"}style={InputColor}></Input><br/><br/><br/><br/>
                            </div> 
                        }
                        <br></br>

                        {this.state.showButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>{this.createMatrix(this.state.row, this.state.column);
                                     this.createX(this.state.row)}
                                }  
                                style={{width: 150 , height:50,background: "#4caf50", color: "white", fontSize: "30px"}}>
                                Submit<br></br>
                            </Button>
                        }
                        {this.state.showMatrixButton && 
                            <Button 
                                id="matrix_button"  
                                style={{width: 150 , height:50,background: "#4caf50", color: "white", fontSize: "30px"}}
                                onClick={()=>this.jacobi(parseInt(this.state.row))}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    

                    {this.state.showanswer && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "100%", background: "#2196f3", color: "#FFFFFFFF", float:"inline-start", marginBlockStart:"2%"}}
                        id="outputCard"
                        >
                            <Table columns={table}  dataSource={schedule} bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll", border:"2px solid white"}}
                            ></Table>
                        </Card>
                    }   

                   
                </div>

                
            </body>
        );
    }
}
export default JacobiIterationMethod;