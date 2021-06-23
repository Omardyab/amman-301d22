import React, { Component } from 'react'

export class Cats extends Component {
    render() {
        return (
            <>
                { this.props.showCatsComponent &&
                    this.props.cats.map((cat, idx) => {
                        return (
                            <div key={idx}>
                               <div>
                                   name : {cat.catName}
                                   <button onClick={()=>this.props.deleteCatProps(idx)}>X</button>
                                   <button onClick={()=>this.props.showupdateFormProps(idx)}>Update</button>
                                </div> 
                               {/* <p>breed: {cat.breed}</p> */}
                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default Cats