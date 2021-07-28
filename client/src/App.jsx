import React, { Component } from 'react';
import './App.css';
import MyForm from './components/MyForm';
import PlaceList from './components/PlaceList';
import {
  getPlaces,
  updatePlaceSend,
  createPlaceSend,
  deletePlaceSend,
  getFilteredPlaces,
} from './utils/request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.getAllPlaces();
  }

  createNewPlace = async (dataToCreateNewPlace) => {
    const successOrError = await createPlaceSend(dataToCreateNewPlace);
    if (successOrError === true) {
      
      return true;
    }
    console.log('Klaida sukuriant');
    return successOrError;
  };

  getAllPlaces = async () => {
    
    const placesArr = await getPlaces();
    this.setState({ places: placesArr });
  };

  deletePlace = async (id) => {
    const success = await deletePlaceSend(id);
    if (success) {
      this.getAllPlaces();
    }
  };

  updatePlace = async (id, updatedDetails) => {
    console.log('about to update place', id, updatedDetails);
    const success = await updatePlaceSend(id, updatedDetails);
    success && this.getAllPlaces();
  };

  filterPlacesOrTowns = async (filterValue) => {
    if (!filterValue) return this.getAllPlaces();
    const filteredPlaces = await getFilteredPlaces(filterValue);
    console.log('filteredPlaces', filteredPlaces);
 
    this.setState({ places: filteredPlaces });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <MyForm onCreateNewPlace={this.createNewPlace} />
          <PlaceList
            onFilterPlace={this.filterPlacesOrTowns}
            onUpdate={this.updatePlace}
            onDelete={this.deletePlace}
            places={this.state.places || []}
          />
        </div>
      </div>
    );
  }
}

export default App;
