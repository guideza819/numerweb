import React, { Component } from 'react'
import {Card, Input, Button} from 'antd';

import 'antd/dist/antd.css';
import { det } from 'mathjs';

const InputColor = {
    background: "#bae7ff",
    color: "#003a8c", 
    fontWeight: "bold", 
    fontSize: "24px",
    width: 300 ,
    height:50,

};


var  ans = [], matrixA = [], matrixB = [],A = [], B = []

class Cramer extends Component {
    
    constructor() {
        super();
        this.state = {

            showMatrix: true,
            showButton: true,
            showMatrixinput: false,
            showMatrixButton: false,
            showanswer: false,
            row: parseInt(0),
            column: parseInt(0),
        }
        this.handleChange = this.handleChange.bind(this);
        this.cramer = this.cramer.bind(this);
    
    }

    cramer() {
        this.datainMatrix();
        for (var counter=0 ; counter<this.state.row ; counter++) { 

            var transformMatrix = JSON.parse(JSON.stringify(A));
            for (var i=0 ; i<this.state.row ; i++) {
                for (var j=0 ; j<this.state.column ; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }
                    
                }
            
            } 
            

            ans.push(<h2>X<sub>{counter}</sub>=&nbsp;&nbsp;{Math.round(det(transformMatrix))/Math.round(det(A))}</h2>)

            ans.push(<br/>)
            ans.push(<br/>)
            
            
            

        }

        this.setState({
            showanswer: true
        });

      
    }
    createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"#003a8c", 
                    marginInlineEnd: "15%", 
                    marginBlockEnd: "10%",
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
                marginInlineEnd: "15%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
        }

        this.setState({


            showMatrix: false,
            showButton: false,
            showMatrixinput: true,
            showMatrixButton: true
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
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <body style={{  background: "#bae7ff", padding: "90px" , float:"left"}}>
                <h2 style={{color: "#003a8c", fontWeight: "bold",fontSize: "35px"}}>Cramer's Rule</h2>
                <div>
                    <Card
                    

                    bordered={true}
                    style={{ width: 700 ,height:600, background: "#40a9ff", color: "#FFFFFFFF", float:"Auto"}}
                    onChange={this.handleChange}
                    >

                        {this.state.showMatrixinput && 
                            <div>
                                <h2>MatrixA</h2><br/>{matrixA}<h2>VectorB<br/></h2>{matrixB}
                            </div>}
                        
                        {this.state.showMatrix && 
                            <div>
                                <h2>Row</h2><Input size="large" name="row"  placeholder={"Input Row"} style={InputColor}></Input><br/><br/><br/><br/>
                                <h2>Column</h2><Input size="large" name="column"  placeholder={"Input Column"} style={InputColor}></Input><br/><br/><br/><br/>
                            </div> 
                        }

                        <br></br>

                        {this.state.showButton &&

                            <Button id="dimention_button" onClick= {
                                ()=>this.createMatrix(this.state.row, this.state.column)
                                }  
                                style={{width: 150 , height:50,background: "#4caf50", color: "white", fontSize: "30px"}}>

                                Submit<br></br>
                                </Button>

                        }


                        {this.state.showMatrixButton && 
                            <Button 
                                id="matrix_button"  
                                style={{width: 150 , height:50,background: "#4caf50", color: "white", fontSize: "30px"}}

                                onClick={()=>this.cramer()}>

                                Submit
                            </Button>
                        }
                        
                    </Card>
                    
                    {this.state.showanswer &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: 700 ,height:600, background: "#40a9ff", color: "#FFFFFFFF", float:"Auto"}}
                        onChange={this.handleChange}>
                        <p style={{fontSize: "24px", fontWeight: "bold"}}>{ans}</p>
                        </Card>
                    }

                   
                </div>

                
            </body>
        );
    }
}
export default Cramer;