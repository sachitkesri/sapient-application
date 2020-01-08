import React from "react";

class CharacterCard extends React.Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.character.image} alt={this.props.character.name} />
        <div className="columns">
          <div>
            <div className="label">
              <label>STATUS</label>
            </div>
            <div className="value">
              <label>{this.props.character.status}</label>
            </div>
            <hr />
          </div>
          <div>
            <div className="label">
              <label>SPECIES</label>
            </div>
            <div className="value">
              <label>{this.props.character.species}</label>
            </div>
            <hr />
          </div>
          <div>
            <div className="label">
              <label>GENDER</label>
            </div>
            <div className="value">
              <label>{this.props.character.gender}</label>
            </div>
            <hr />
          </div>
          <div>
            <div className="label">
              <label>ORIGIN</label>
            </div>
            <div className="value">
              <label>{this.props.character.origin.name}</label>
            </div>
            <hr />
          </div>
          <div>
            <div className="label">
              <label>LAST LOCATION</label>
            </div>
            <div className="value">
              <label>{this.props.character.location.name}</label>
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterCard;
