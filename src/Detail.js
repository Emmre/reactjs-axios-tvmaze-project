import React, { Component } from "react";
import axios from "axios";
import jsonQuery from "json-query";

import Layout from "./components/Layout";

export default class Detail extends Component {
  state = {
    batmanItem: [],
    image: "",
    medium: "",
    summary: "",
    summaryNested: ""
  };

  //ES6 async await yapısı

  async componentDidMount() {
    const id = this.props.match.params.id;

    //ES6 template literal yapısı
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    this.setState({ batmanItem: data });

    var image = jsonQuery("{image}", { data: this.state.batmanItem.image })
      .value;
    this.setState({ image: image });

    var medium = jsonQuery("{medium}", { data: this.state.image.medium }).value;
    this.setState({ medium: medium });

    var summary = jsonQuery("{summary}", {
      data: this.state.batmanItem.summary
    }).value;
    this.setState({ summary: summary });

    var summaryNested = jsonQuery("{summary}", { data: this.state.summary })
      .value;
    this.setState({ summaryNested: summaryNested });
  }

  render() {
    const summary = this.state.summaryNested;
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div
              className="card"
              style={{ marginRight: 20, marginBottom: 20, width: "100%" }}
            >
              <div className="card-header">{this.state.batmanItem.name}</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-3" style={{ width: "100%" }}>
                    <img
                      src={this.state.medium}
                      style={{ marginBottom: 20, float: "left" }}
                    />
                  </div>
                  <div className="col-9" style={{ width: "100%" }}>
                    <p>Language: {this.state.batmanItem.language}</p>
                    <p>Genres: {this.state.batmanItem.genres}</p>
                    <p>Premiered: {this.state.batmanItem.premiered}</p>
                  </div>
                  <div className="col-12">
                    <p className="card-text">
                      {summary.replace(/<.*?>/gm, "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
