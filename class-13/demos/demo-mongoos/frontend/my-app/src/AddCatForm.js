import React, {Component} from 'react';

class AddCatForm extends Component {
    render(){
        return(
            <form onSubmit={(e)=>this.props.addCatProps(e)}>
                <label>Cat Name</label>
                <input type='text' name='catName'/>
                <label>Cat Breed</label>
                <input type='text' name='catBreed'/>

                <input type='submit' value='Add Cat' />
            </form>
        )
    }
}

export default AddCatForm;