import React, { Component } from 'react'
import 'assets/css/style.css';


export default class SideBar extends Component {
    render() {
        return (
            <div>
                <div className="ui left vertical inverted labeled icon sidebar menu ">
                    <a className="item">
                        <i className="home icon"></i>
                        Home
                      </a>
                    <a className="item">
                        <i class="block layout icon"></i>
                        Topics
                        </a>
                    <a className="item">
                        <i class="smile icon"></i>
                        Friends
                        </a>
                    <a className="item">
                        <i class="calendar icon"></i>
                        History
                      </a>
                    <a className="item">
                        <i class="mail icon"></i>
                        Messages
                     </a>
                    <a className="item">
                        <i class="chat icon"></i>
                        Discussions
                      </a>
                    <a className="item">
                        <i class="trophy icon"></i>
                        Achievements
                        </a>
                    <a className="item">
                        <i class="shop icon"></i>
                        Store
                      </a>
                    <a className="item">
                        <i class="settings icon"></i>
                        Settings
                   </a>
                </div>
            </div>
        )
    }
}
