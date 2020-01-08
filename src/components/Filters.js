import React from "react";

class Filters extends React.Component {
  filterArray = [
    {
      filterId: 1,
      filterHeader: "Gender",
      apiKey: "gender",
      apiValues: ["Male", "Female"]
    },
    {
      filterId: 2,
      filterHeader: "Species",
      apiKey: "species",
      apiValues: ["Human", "Mytholog", "Other species.."]
    },
    {
      filterId: 3,
      filterHeader: "Origin",
      apiKey: "origin",
      apiValues: [
        "Unknown",
        "Post-Apocalyptic Earth",
        "Nuptia 4",
        "Other orgins.."
      ]
    }
  ];

  constructor() {
    super();
    this.state = {
      img: "./img/minus.png",
      active: true
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange = e => {
    let value = JSON.parse(e.target.value);
    this.setState(
      {
        [value.filterApiKey]: value.filterValue
      },
      () => {
        this.props.updateFilter(this.state);
      }
    );
  };

  addClass = () => {
    this.setState(prevState => ({
      img: !prevState.active ? "./img/minus.png" : "./img/plus.png",
      active: !prevState.active
    }));
  };

  render() {
    return (
      <div>
        <div className="filter-header">
          <div className="filter-text">
            <h3>Filters</h3>
          </div>
          <div>
            <input
              type="image"
              src={this.state.img}
              alt="-"
              width="10%"
              height="10%"
              onClick={this.addClass}
            />
          </div>
          <hr />
        </div>
        <div className={!this.state.active ? "collapse" : null}>
          {this.filterArray.length > 0
            ? this.filterArray.map(filter => (
                <div className="container">
                  <div>
                    <div className="header">
                      <label> {filter.filterHeader} </label>
                    </div>
                  </div>
                  <div>
                    {filter.apiValues.map(value => (
                      <div>
                        <input
                          type="radio"
                          key={filter.apiKey}
                          checked={this.state[filter.apiKey] === value}
                          value={
                            '{"filterApiKey": "' +
                            filter.apiKey +
                            '", "filterValue": "' +
                            value +
                            '"}'
                          }
                          onChange={this.handleFilterChange}
                        />
                        <label> {value} </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Filters;
