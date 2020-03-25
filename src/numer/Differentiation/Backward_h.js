import React, {Component} from 'react';
import {Card, Input, Button} from 'antd';

import 'antd/dist/antd.css';
import { compile} from 'mathjs';
import axios from 'axios';
const InputColor = {
    background: "#bae7ff",
    color: "#003a8c", 
    fontWeight: "bold", 
    fontSize: "24px",
    width: 300 ,
    height:50

};

var ans;


class Backward_h extends Component {
    constructor() {
        super();
        this.state = {
            
            x: 0,
            h: 0,
            fx: "",
            degree: 0,
            showtable: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    Backward_h(x, h, degree) {
        if(degree===1){
            ans = (this.func(x) - this.func(x-(1*h))) / h
        }

        if(degree===2){
            ans = (this.func(x) - 2*this.func(x-(1*h)) + this.func(x-(2*h))) / Math.pow(h, 2)
        }

        if(degree===3){
            ans = (this.func(x) - 3*this.func(x-(1*h)) + 3*this.func(x-(2*h)) - this.func(x-(3*h))) / Math.pow(h, 3)
        }

        if(degree===4){
            ans = (this.func(x) - 4*this.func(x-(1*h)) + 6*this.func(x-(2*h)) - 4*this.func(x-(3*h)) + this.func(x-(4*h))) / Math.pow(h, 4) 
        }
        
        this.setState({
            showtable: true
        })
    }

    func(datastr) {
        
        var comfunc = compile(this.state.fx)
        let data = {x:parseFloat(datastr)}

        return comfunc.eval(data)       
    }


    dataapi = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/showForwardh').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            degree:response['data'][0]['degree'],
            x:response['data'][0]['x'],
            h:response['data'][0]['h']
        })
        this.Backward_h(this.state.x,this.state.h,this.state.degree);
    }

    render() {
        return(
            <body style={{background: "#bae7ff", padding: "90px" , float:"left" }}>
                <h2 style={{color: "#003a8c", fontWeight: "bold",fontSize: "35px"}}>Backward Divided-Differences O(h)</h2>
                <div style={{float:"left"}}>
                    <Card
                    bordered={true}
                    style={{ width: 700 ,height:600, background: "#40a9ff", color: "#FFFFFFFF", float:"Auto"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                        <h2>f(x)</h2><Input size="large" name="fx"  placeholder={"Input f(x)"} style={InputColor}></Input><br/><br/><br/>
                        <h2>Order derivative</h2><Input size="large" name="degree" style={InputColor}></Input><br/><br/><br/>
                        <h2>X</h2><Input size="large" name="x" style={InputColor}></Input><br/><br/><br/>
                        <h2>H</h2><Input size="large" name="h" style={InputColor}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.Backward_h(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                            }  
                        style={{width: 150 , height:50,background: "#4caf50", color: "white", fontSize: "30px"}}>Submit</Button>

                        <Button id="submit_button" onClick= {
                                
                                ()=>this.dataapi()
                        }  
                        style={{width: 150 , height:50,background: "#4caf50", color: "white", fontSize: "30px"}}>API</Button>
                        
                    </Card>     
                    {this.state.showtable && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "100%", background: "#2196f3", color: "#FFFFFFFF", float:"inline-start", marginBlockStart:"2%"}}
                        id="outputCard"
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Approximate = {ans}<br/>
                            </p>
                        </Card>
                    }              
                </div>                
            </body>
        );
    }
}
export default Backward_h;