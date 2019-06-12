import React, { Component } from 'react'
// import 'assets/css/style.css';
import './profile.css'

export default class SideBar extends Component {
    render() {
        var style = {
            color: 'white',
            height: 200
          };
        return (
            <div>
                <div className="container h-100">
                <div className = "row h-100">
                <div className="col-5 bg-primary  h-100">
                <p>hiiii</p> 
                </div>
                <div className="col-7 h-100">
                <p></p>
                </div>
                   </div>

                </div>
            </div>

        )
    }
}
