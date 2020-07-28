import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import Clarifai from "clarifai";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "221341198cf043fdbe9f515ca8f7a180",
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
    state = {
      input: "",
      imageUrl: "",
      box: {},
  };

  calculateFaceLocation = (data) => {};
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    let inputUrl = this.state.input;
    this.setState({ imageUrl: inputUrl});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.calculateFaceLocation(response).catch((err) => console.log(err))
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
