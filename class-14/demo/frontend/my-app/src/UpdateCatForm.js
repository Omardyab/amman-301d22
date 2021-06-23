import React, {Component} from 'react';

class UpdateCatForm extends Component {
    render(){
        return(
            <>
            <form onSubmit={(e)=>this.props.updateCats(e)}>
            <fieldset>
                <legend>Update Form</legend>
                <label>Cat Name</label>
                <input type='text' name='catName' onChange={(e)=>this.props.updateCatNameProps(e)} value={this.props.catName}/>
                <label>Cat Breed</label>
                <input type='text' name='catBreed' onChange={(e)=>this.props.updateCatBreedProps(e)} value={this.props.catBreed}/>

                <input type='submit' value='Update Cat Info' />

                </fieldset>
            </form>
            </>
        )
    }
}

export default UpdateCatForm;