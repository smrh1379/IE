import React from "react";
import NotFound from "./NotFound";
export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      movie: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/movies/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((movie) => {
        console.log(movie);
        this.setState({ movie: movie });
      })
      .catch((e) => this.setState({ error: true }));
  }

  render() {
    return !this.state.error ? (
      <div className="movie-detail container">
        <img className="movie-banner" src={this.state.movie.banner} alt="" />
        <div className="detail-body">
          <div>
            <h2 className="card-title">
              {this.state.movie.title}
              <span className="release-year">
                {" "}
                {this.state.movie.release_year}
              </span>
            </h2>
            <div className="detail-description">
              <p className="card-description">{this.state.movie.description}</p>
            </div>
          </div>
          <div className="images">
            <img className="detail-img" src={this.state.movie.image} alt="" />
          </div>
        </div>
      </div>
    ) : (
      <NotFound />
    );
  }
}
