import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';
import AddCatForm from './AddCatForm';
import UpdateCatForm from './UpdateCatForm';


class App extends Component {

  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      name: '',
      showCatsComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
      show: false,
      index:0,
      catName:'',
      catBreed:''

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

  updateCat = async(event)=>{
    event.preventDefault();
    const catData = {
      catName : event.target.catName.value,
      catBreed : event.target.catBreed.value,
      ownerName: this.state.name
    }

    let catsData = await axios.put(`${this.state.server}/updateCat/${this.state.index}`,catData)

      this.setState({
        cats:catsData.data
      })


    // console.log(this.cats);

  }

  showUpdateForm = (idx)=>{
    this.setState({
      show:true,
      index:idx,
      catName:this.state.cats[idx].catName,
      catBreed:this.state.cats[idx].breed
    })

  }

  updateCatName = (e)=>{
    this.setState({
      catName : e.target.value
    })
  }

  updateCatBreed = (e)=>{
    this.setState({
      catBreed : e.target.value
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
            showupdateFormProps={this.showUpdateForm}
          />
          {
            this.state.show &&
            <UpdateCatForm
            updateCats={this.updateCat}
            catName={this.state.catName}
            catBreed={this.state.catBreed}
            updateCatNameProps={this.updateCatName}
            updateCatBreedProps={this.updateCatBreed}

            />
          }
        
        </div>
      </>
    )
  }
}

export default App;