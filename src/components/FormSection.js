import React from 'react'

const FormSection = (prop) => {

  
    return (
        <div id = {"article" + prop.counter} className = "section">
            <article className="d-flex flex-column w-100 border my-3 py-2 shadow">
                <label for={"header" + prop.counter }>Header:  </label>
                <input id = {"header" + prop.counter} className="border rounded m-2" name={"header" + prop.counter} defaultValue = {prop.header ? prop.header : ""} maxlength = "50"/>
                <label for={"paragraph" + prop.counter}>Paragraph {prop.counter}: </label>
                <textarea id = {"paragraph" + prop.counter} className="border rounded m-2" name={"paragraph" + prop.counter} defaultValue = {prop.paragraph? prop.paragraph : ""} required></textarea>
                {prop.button}
            </article>
        </div>
    )
}

export default FormSection
