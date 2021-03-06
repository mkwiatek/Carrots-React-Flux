import React from 'react';

import ValidationStore from '../stores/ValidationStore';
import * as profileActions from '../actions/ProfilesActions';
import * as validationActions from '../actions/ValidationActions';

class NewProfile extends React.Component {
  constructor() {
    super();
    this.updateState = this.updateState.bind(this);   // TO AVOID PROBLEMS WITH 'THIS' IN REMOVE LISTENER

    this.state = {
      formValid: ValidationStore.isFormValid()
    }
  }

  updateState() {
    this.setState({
      formValid: ValidationStore.isFormValid()
    });
  }

  componentWillMount() {
    ValidationStore.on("stateChange", this.updateState)
  }

  componentWillUnmount() {
    ValidationStore.removeListener("stateChange", this.updateState);
  }

  handleFormChange() {
    const { name, carrotsCount } = this.refs;
    const inputsValues = {
      rabbitName: name.value,
      carrotsCount: carrotsCount.value
    }

    validationActions.validateForm(inputsValues);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, carrotsCount } = this.refs;

    profileActions.createProfile(name.value, carrotsCount.value);

    alert(`Created new rabbit: ${name.value} with ${carrotsCount.value} carrots`)
    e.target.reset();
    this.handleFormChange(); 
  }

  render() {
    return (
      <div className="card createProfile">
        <h3 className="card-header card-success">Create new profile</h3>
        <form className="card-block" onChange={() => this.handleFormChange()} onSubmit={e => this.handleSubmit(e)}>
          <div className="formRow">
            <label>Rabbit name: </label>
            <input type="text" name="rabbitName" ref="name" required minLength="3" maxLength="18" id="rabbitName" />
          </div>
          <div className="formRow">
            <label>Carrots count: </label>
            <input type="number" name="carrotsCount" ref="carrotsCount" required min="0" max="10000" id="carrotsCount" />
          </div>
          <input type="submit" disabled={!this.state.formValid} className="btn btn-success" value="Create" />
        </form>
      </div>
    )
  }
}


export default NewProfile;