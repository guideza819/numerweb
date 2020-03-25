import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <body style={{ background: "#bae7ff", padding: "90px" , float:"left"}}>
                    <br/>
                    <h2 style={{color: "#faad14", fontWeight: "bold",fontSize: "35px"}}>  วิชา Numer </h2><br/><br/>
                    <h2 style={{color: "#ad8b00", fontWeight: "bold",fontSize: "35px"}}>  เรื่อง </h2><br/><br/>
                    <h2 style={{color: "#a0d911", fontWeight: "bold",fontSize: "25px"}}><li>  Root of Equation</li> </h2><br/><br/>
                    <h2 style={{color: "#52c41a", fontWeight: "bold",fontSize: "25px"}}><li>  Linear Algebra</li> </h2><br/><br/>
                    <h2 style={{color: "#13c2c2", fontWeight: "bold",fontSize: "25px"}}><li>  Interpolation</li> </h2><br/><br/>
                    <h2 style={{color: "#1890ff", fontWeight: "bold",fontSize: "25px"}}><li>  Least Square Error</li> </h2><br/><br/>
                    <h2 style={{color: "#2f54eb", fontWeight: "bold",fontSize: "25px"}}><li>  Integration</li> </h2><br/><br/>
                    <h2 style={{color: "#722ed1", fontWeight: "bold",fontSize: "25px"}}><li>  Differentiation</li> </h2><br/><br/>
                    <h2 style={{color: "#eb2f96", fontWeight: "bold",fontSize: "35px"}}>  นายธนวัต พุ่มพวง 6004062636190</h2>
                </body>
            </div>
        )
    }
}
