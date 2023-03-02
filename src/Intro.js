import React from 'react'
import Login from './Login'
const Intro = () => {
    return (
        <div id = "intro" className = "container-fluid row vh-100">
            <div className = "my-5 col-12 col-md-5 p-md-5">
                <h1 className = "display-1">My Notes</h1>
                <p>
                    <b>MyNotes</b> is a concept of an online, digital notebook.
                    Though it is functional, this is mostly a concept site.
                    Please don't store any sensitive information.  It's vulnerable!
                </p>
            </div>
            <Login/>
        </div>
    )
}

export default Intro
