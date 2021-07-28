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

   
    if (this.props.place) {
      // console.log('Editinam one Sukuriam');
      this.props.onEdit(dataToCreateNewPlace);
      return;
    }

    // console.log('dataToCreateNewPlace', dataToCreateNewPlace);
   
    // console.log('Sukuriam');

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
        {this.props.place ? null : <h2>Sukurti nauja vietovę</h2>}
        {s.error && (
          <div className="alert alert-danger" role="alert">
            Prašome patikrinti pildymo formą <br />
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
              placeholder="Vietovės pavadinimas"
            />
          </div>
          <div className="form-group">
            <input
              value={s.continent}
              onChange={this.handleInput}
              type="text"
              className={'form-control ' + (s.error.errors?.continent ? 'is-invalid' : '')}
              name="continent"
              placeholder="Kontinentas"
            />
          </div>
          <div className="form-group">
            <input
              value={s.population}
              onChange={this.handleInput}
              type="number"
              className={'form-control ' + (s.error.errors?.population ? 'is-invalid' : '')}
              name="population"
              placeholder="Gyventojų skaičius"
            />
          </div>
          <select
            value={s.placeType}
            onChange={this.handleInput}
            name="placeType"
            className="custom-select"
          >
            <option value="town">Miestas</option>
            <option value="country">Šalis</option>
          </select>
          <button className="btn btn-primary my-4">{this.props.place ? 'Save' : 'Sukurti'}</button>
        </form>
      </div>
    );
  }
}

export default MyForm;
