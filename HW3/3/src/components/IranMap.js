import React from "react";

import "./IranMap.css";

import CityModal from "./CityModal";
import cityModal from "./CityModal";

class IranMap extends React.Component {
  state = {
    citiesData: null,
    selectedCity: null,
    isModalOpen: false,
  };

  componentDidMount() {
    fetch("http://localhost:9000/cities/")
      .then((response) => response.json())
      .then((data) => this.setState({ citiesData: data }));
  }
  cityClicked = (id) => (event) => {
    event.preventDefault();
    fetch("http://localhost:9000/cities/" + id)
      .then((response) => response.json())
      .then((cityDetails) => this.setState({ selectedCity: cityDetails }));

    this.state.isModalOpen = true;
    //
    // Fetch city details and open modal
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    return (
      <div>
        <div className="map-container">
          {(this.state.citiesData || []).map((record) => (
            <div
              key={record.id}
              className="city-name"
              style={{
                top: `${record.top}%`,
                left: `${record.left}%`,
              }}
              onClick={this.cityClicked(record.id)}
            >
              {record.name}
            </div>
          ))}
        </div>
        <CityModal
          city={this.state.selectedCity}
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}

export default IranMap;
