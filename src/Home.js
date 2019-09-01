import React, { Component } from "react";
import axios from "axios";
import Layout from "./components/Layout";

export default class Home extends Component {
  state = {
    batmanFilms: [],
    batmanItem: [],
    image: [],
    medium: []
  };

  componentDidMount() {
    axios.get("http://api.tvmaze.com/search/shows?q=batman").then(result => {
      const batmanFilms = result.data;
      this.setState({ batmanFilms });
    });
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            {this.state.batmanFilms.map(batmanFilms => (
              <div
                class="card"
                style={{ marginRight: 20, marginBottom: 20, width: "100%" }}
              >
                <div class="card-body">
                  <img
                    src={batmanFilms.show.image.medium}
                    class="card-img-top"
                    alt="..."
                    style={{ float: "left", width: "15%", marginRight: 20 }}
                  />

                  <h5 class="card-title">{batmanFilms.show.name}</h5>
                  <p class="card-text">
                    {batmanFilms.show.summary.replace(/<.*?>/gm, "")}
                  </p>
                  <a
                    href={`/detail/${batmanFilms.show.id}`}
                    class="btn btn-primary"
                  >
                    Show Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}
