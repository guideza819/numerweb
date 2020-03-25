import React, {Component} from 'react';
import {Card, Input, Button} from 'antd';

import 'antd/dist/antd.css';
import { compile} from 'mathjs';
import axios from 'axios';
var Algebrite = require('algebrite')


const InputColor = {
    background: "#bae7ff",
    color: "#003a8c", 
    fontWeight: "bold", 
    fontSize: "24px",
    width: 300 ,
    height:50

};
var I, exact, error;
class CompositeSimpson extends Component {
    constructor() {
        super();
        this.state = {
            a: 0,
            b: 0,
            n: 0,
            fx: "",
            showtable: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    CompositeSimpson(a, b, n) {

        var h = (b-a)/n
        I = (h / 3) * (this.func(a) + this.func(b) + 4*this.Func_sum(1, n, 2*h) + 2*this.Func_sum(2, n, 2*h))

        exact = this.Func_exact(a, b)
        error = Math.abs((I-exact) / I) * 100
        
        this.setState({
            showtable: true
        })
    }
    Func_exact(a, b) {
        
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    Func_sum(start, n, h) {
        var num = h
        var sum = 0
        
        for (var i=start ; i<n ; i+=2) {
            sum = sum + this.func(num)
            num = num +  2*h
        }
        return sum
    }
    func(datastr) {
        
        var comfunc = compile(this.state.fx)
        let data = {x:parseFloat(datastr)}

        return comfunc.eval(data)       
    }
    dataapi = async()=>{
        var response = await axios.get('http://localhost:3001/api/users/showcompusitesim').then(res => {return res.data});
        this.setState({
            fx:response['data'][0]['fx'],
            a:response['data'][0]['a'],
            b:response['data'][0]['b'],
            n:response['data'][0]['n']
        })
        this.CompositeSimpson(this.state.a,this.state.b,this.state.n);
    }
    render() {
        return(
            <body style={{background: "#bae7ff", padding: "90px" , float:"left"}}>
                <h2 style={{color: "#003a8c", fontWeight: "bold",fontSize: "35px"}}>Composite Simpson's Rule</h2>
                <div style={{float:"left"}}>
                    <Card
                    bordered={true}
                    style={{ width: 700 ,height:600, background: "#40a9ff", color: "#FFFFFFFF", float:"Auto"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                        <h2>f(x)</h2><Input size="large" name="fx"   placeholder={"Input f(x)"} style={InputColor}></Input><br/><br/>
                        <h2>Lower bound (A)</h2><Input size="large" name="a" style={InputColor}></Input><br/><br/>
                        <h2>Upper bound (B)</h2><Input size="large" name="b" style={InputColor}></Input><br/><br/>
                        <h2>N</h2><Input size="large" name="n" style={InputColor}></Input><br/><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.CompositeSimpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
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
                                Approximate = {I}<br/>
                                Exact = {exact}<br/>
                                Error = {error}%
                            </p>
                        </Card>
                    }              
                </div>                
            </body>
        );
    }
}
export default CompositeSimpson;