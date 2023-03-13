import React from 'react'
import Login from './Login'
const Intro = () => {
    return (
        <div id = "intro" className = "container-fluid row vh-100">
            <div className = "my-5 col-12 col-md-5 p-md-5">
                <h1 className = "display-1">My Notes</h1>
                <p>
                    <b>MyNotes</b> is an online, digital notebook.
                    Though it is functional, it is mostly just a <b>proof of concept</b> and not meant for any serious usage. 
                    Please don't store any sensitive information.  It's vulnerable!  To test use the username 'guest' with password
                    'easypassword'.
                </p>
            </div>
            <Login/>
        </div>
    )
}

export default Intro
