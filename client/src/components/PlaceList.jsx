import React, { Component } from 'react';
import PlaceItem from './PlaceItem';

class PlaceList extends Component {
  render() {
    if (!this.props.places.length) return <h2>Nepasirnkta(-s) šalis/miestas </h2>;
    return (
      <div className="main-list">
        <h2>Šalių ir miestų sąrašas</h2>
        <div className="btn-group mb-3" role="group" aria-label="Basic example">
          <button onClick={() => this.props.onFilterPlace()} type="button" className="btn btn-primary">
            Visos šalys / visi miestai
          </button>
          <button
            onClick={() => this.props.onFilterPlace('town')}
            type="button"
            className="btn btn-light"
          >
            Tik miestai
          </button>
          <button
            onClick={() => this.props.onFilterPlace('country')}
            type="button"
            className="btn btn-info"
          >
            Tik šalys
          </button>
        </div>
        <div className="places-list d-flex flex-wrap">
          {this.props.places.map((place) => (
            <PlaceItem
              onUpdate={this.props.onUpdate}
              onDelete={this.props.onDelete}
              place={place}
              key={place._id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlaceList;
