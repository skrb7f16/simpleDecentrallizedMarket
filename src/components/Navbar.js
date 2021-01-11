import React, { Component } from 'react'

export default class Navbar extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <p style={{
                    color: "white",
                    fontSize: "20px",
                    margin: "5px"
                }}>
                    MEOW MARKET
          </p>
                <p style={{
                    color: "white",
                    fontSize: "20px",
                    margin: "5px"
                }}>{this.props.account}</p>
            </nav>
        )
    }
}
