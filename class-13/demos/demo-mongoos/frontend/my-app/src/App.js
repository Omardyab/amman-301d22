import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';
import AddCatForm from './AddCatForm';


class App extends Component {

  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      name: '',
      showCatsComponent: false,
      server: process.env.REACT_APP_SERVER_URL
    }
  }

  getCats = async (event) => {
    event.preventDefault();
    try {
      const paramsObj = {
        name: this.state.name
      }
 
      const cats = await axios.get(`${this.state.server}/cat`, { params: paramsObj });
      // const cats = await axios.get(`${this.state.server}/cat?name=${this.state.name}`);
      this.setState({
        cats: cats.data,
        showCatsComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }


  updateName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  addCat = async(event) => {
    event.preventDefault();
    // const catName = event.target.catName.value;
    // const breed = event.target.catBreed.value;
    // const ownerName = this.state.name;

    const catFormData = {
      catName: event.target.catName.value,
      breed: event.target.catBreed.value,
      ownerName: this.state.name
    }
    console.log(catFormData);
    // const newCats = await axios.get(`${this.state.server}/addCat`, {params:catFormData});
    const newCats = await axios.post(`${this.state.server}/addCat`, catFormData);
    console.log('after adding',newCats.data);
    // console.log(newCats);
    this.setState({
      cats:newCats.data
    })
  }

  deleteCat = async(index)=>{
    const ownerName = {
      name :this.state.name
    }
    let newCats = await axios.delete(`${this.state.server}/deleteCat/${index}`,{ params: ownerName })
    this.setState({
      cats:newCats.data
    })

  }

  render() {
    return (
      <>
        <div>
          <Form
            updateName={this.updateName}
            getCats={this.getCats}
          />
          <AddCatForm 
          addCatProps={this.addCat}
          />
          <Cats
            cats={this.state.cats}
            showCatsComponent={this.state.showCatsComponent}
            deleteCatProps={this.deleteCat}
          />
        </div>
      </>
    )
  }
}

export default App;