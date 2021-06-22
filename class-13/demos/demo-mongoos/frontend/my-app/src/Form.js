import React, { Component } from 'react'

export class Form extends Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.getCats(e)}>
                <label>Enter your name</label>
                <input type="text" onChange={(e) => this.props.updateName(e)} />
                <input type="submit" value="get cats" />
            </form>
        )
    }
}

export default Form