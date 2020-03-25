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


var A = [], B = [],  x , epsilon, xx= [], dataInTable = [], count=1,matrixA = [], matrixB = []
var table = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    }
];
class Seidel extends Component {
    
    constructor() {
        super();
        this.state = {
           
            showMatrix : true,
            showButton: true,
            showMatrixinput: false,
            showMatrixButton: false,
            showanswer: false,
            row: 0,
            column: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.seidel = this.seidel.bind(this);
    
    }

  
    seidel(n) {
        this.datainMatrix();
        x = new Array(n);
        var xold = new Array(n);
        epsilon = new Array(n);
        x.fill(0)
        xold.fill(0);
        do {
            xold = JSON.parse(JSON.stringify(x));
            for (var i=0 ; i<n ; i++) {
                var sum = 0;
                for (var j=0 ; j<n ; j++) {
                    if (i !== j) {
                        sum = sum + A[i][j]*x[j];//สมการที่แทนxละ
                    }
                }
                x[i] = (B[i] - sum)/A[i][i]; //เปลี่ยนค่อ x ทุกครั้ง
                
            }        
        } while(this.error(x, xold)); 
        
        
        for (i=0 ; i<x.length ; i++) {
                xx.push(x[i]);
                xx.push(<br/>);
        }
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
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"#003a8c", 
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"#003a8c", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
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
        st = st+'{"iteration": ' + count++ + ',';
        for (var i=0 ; i<x.length ; i++) {
            st = st+'"x'+(i+1)+'": '+x[i].toFixed(8)+', "error'+(i+1)+'": ' + error[i].toFixed(8);
            if (i !== x.length-1) {
                st = st+','
            }
        }
        st = st+'}';
        dataInTable.push(JSON.parse(st));  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <body style={{  background: "#bae7ff", padding: "90px" , float:"left" }}>
                <h2 style={{color: "#003a8c", fontWeight: "bold",fontSize: "35px"}}>Gauss-Seidel Iteration Method</h2>
                <div>
                    <Card
                      bordered={true}
                      style={{width: 700 ,height:600, background: "#40a9ff", color: "#FFFFFFFF", float:"Auto"}}
                      onChange={this.handleChange}
                    >
                        {this.state.showMatrixinput && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}</div>}
                        
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
                                onClick={()=>this.seidel(parseInt(this.state.row))}>
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
                            <Table columns={table} dataSource={dataInTable} bordered={true} bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll"}}
                            ></Table>
                        </Card>
                    }   

                   
                </div>

                
            </body>
        );
    }
}
export default Seidel;