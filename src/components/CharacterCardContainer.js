import React from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import Filters from "./Filters";

class CharacterCradContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      url: "https://rickandmortyapi.com/api/character?",
      filters: "",
      previousPageUrl: "",
      nextPageUrl: "",
      characters: [],
      errorMessage: ""
    };

    this.updateList = this.updateList.bind(this);
    this.changeNextPage = this.changeNextPage.bind(this);
    this.changePreviousPage = this.changePreviousPage.bind(this);

    this.updateList();
  }

  updateFilter = selectedFilters => {
    let filterStrings = [];
    for (let key in selectedFilters) {
      filterStrings.push(key + "=" + selectedFilters[key]);
    }

    this.setState(
      {
        filters: filterStrings.join("&")
      },
      () => {
        this.updateList();
      }
    );
  };
  updateList = () => {
    axios
      .get(this.state.url + this.state.filters)
      .then(response => {
        this.setState({
          characters: response.data.results,
          nextPageUrl: response.data.info.next,
          previousPageUrl: response.data.info.prev,
          errorMessage: ""
        });
      })
      .catch(error => {
        this.setState({
          url: "https://rickandmortyapi.com/api/character?",
          filters: "",
          previousPageUrl: "",
          nextPageUrl: "",
          characters: [],
          errorMessage: error.response.data.error
        });
      });
  };

  changeNextPage = () => {
    this.setState(
      {
        url: this.state.nextPageUrl,
        filters: ""
      },
      () => {
        this.updateList();
      }
    );
  };
  changePreviousPage = () => {
    this.setState(
      {
        url: this.state.previousPageUrl,
        filters: ""
      },
      () => {
        this.updateList();
      }
    );
  };
  render() {
    let selectedCharacters = [];
    this.state.characters.forEach(character => {
      selectedCharacters.push(<CharacterCard character={character} />);
    });
    return (
      <div className="main">
        <div className="sidebar">
          <Filters updateFilter={this.updateFilter} />
        </div>
        <div>
          {this.state.errorMessage === "" ? (
            <div className="page-wrap cards">
              {selectedCharacters}
              <div>
                <button
                  disabled={this.state.previousPageUrl === "" ? true : false}
                  onClick={this.changePreviousPage}
                >
                  &lt;
                </button>
                <button
                  disabled={this.state.nextPageUrl === "" ? true : false}
                  onClick={this.changeNextPage}
                >
                  &gt;
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3> {this.state.errorMessage}</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CharacterCradContainer;
