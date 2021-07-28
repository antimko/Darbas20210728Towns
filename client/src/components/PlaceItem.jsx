import React, { Component } from 'react';
import MyForm from './MyForm';

class PlaceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdiOn: false,
    };
  }

  handleEdit = (updatedPlaceData) => {
    if (this.state.isEdiOn) this.props.onUpdate(this.props.place._id, updatedPlaceData);

    this.setState({ isEdiOn: !this.state.isEdiOn });
  };

  render() {
    const { place: p } = this.props;
    return (
      <div className={'card m-5 ' + (p.placeType === 'country' ? 'text-primary bg ' : '')}>
        {this.state.isEdiOn ? (
          <MyForm place={p} onEdit={this.handleEdit} />
        ) : (
          <React.Fragment>
            <div className="card-header">Place type: {p.placeType} </div>
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">Continent: {p.continent}</p>
              <p className="card-text">Population: {p.population}</p>
            </div>
            <div className="card-footer">
              <button onClick={this.handleEdit} className="btn btn-success">
                Edit
              </button>
              <button onClick={() => this.props.onDelete(p._id)} className="btn btn">
                <strong>Delete</strong>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default PlaceItem;
