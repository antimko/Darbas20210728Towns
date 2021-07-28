import React, { Component } from 'react';

class MyForm extends Component {
  state = {
    name: '',
    continent: '',
    population: '',
    placeType: 'town',
    error: '',
  };

  componentDidMount() {
    // kai komponentas yra edit vietoje
    this.props.place && this.propsToState();
  }

  propsToState() {
    const { name, continent, population, placeType } = this.props.place;
    this.setState({
      name,
      continent,
      population,
      placeType,
    });
  }

  clearInputs = () => {
    this.setState({
      name: '',
      continent: '',
      population: '',
      placeType: 'town',
      error: '',
    });
  };

  handleSubmitLocal = async (e) => {
    e.preventDefault();
    console.log('stop right there');
    const { name, continent, population, placeType } = this.state;
    const dataToCreateNewPlace = {
      name,
      continent,
      population,
      placeType,
    };

    // jei mes esam Place item vidue tai norim vygdyti PlaceItem metoda
    if (this.props.place) {
      console.log('Editinam one Sukuriam');
      this.props.onEdit(dataToCreateNewPlace);
      return;
    }

    // console.log('dataToCreateNewPlace', dataToCreateNewPlace);
    // create new Place
    console.log('Sukuriam');

    const createSuccessOrError = await this.props.onCreateNewPlace(dataToCreateNewPlace);
    if (createSuccessOrError === true) return this.clearInputs();
    console.log('Klaida sukuriant Formoj, createSuccessOrError', createSuccessOrError);
    this.setState({ error: createSuccessOrError });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { state: s } = this;
    return (
      <div className={this.props.place ? 'card-body' : 'w-50'}>
        {this.props.place ? null : <h2>Create new place</h2>}
        {s.error && (
          <div className="alert alert-danger" role="alert">
            Please check form fields <br />
            {s.error.message}
          </div>
        )}
        <form onSubmit={this.handleSubmitLocal} autoComplete="off">
          <div className="form-group">
            <input
              value={s.name}
              onChange={this.handleInput}
              type="text"
              className={'form-control ' + (s.error.errors?.name ? 'is-invalid' : '')}
              name="name"
              placeholder="Name of Place"
            />
          </div>
          <div className="form-group">
            <input
              value={s.continent}
              onChange={this.handleInput}
              type="text"
              className={'form-control ' + (s.error.errors?.continent ? 'is-invalid' : '')}
              name="continent"
              placeholder="Continent"
            />
          </div>
          <div className="form-group">
            <input
              value={s.population}
              onChange={this.handleInput}
              type="number"
              className={'form-control ' + (s.error.errors?.population ? 'is-invalid' : '')}
              name="population"
              placeholder="Population"
            />
          </div>
          <select
            value={s.placeType}
            onChange={this.handleInput}
            name="placeType"
            className="custom-select"
          >
            <option value="town">Town</option>
            <option value="country">Country</option>
          </select>
          <button className="btn btn-primary my-4">{this.props.place ? 'Save' : 'Create'}</button>
        </form>
      </div>
    );
  }
}

export default MyForm;
