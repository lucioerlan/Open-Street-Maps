import React, { Component } from "react";
import ContentLoader from "react-content-loader";

export default class Placeholder extends Component {
  render() {
    return (
      <ContentLoader
        height={200}
        width={470}
        speed={2}
        primaryColor="#dfd9d9"
        secondaryColor="#ecebeb"
        style={{ marginTop: "-100px", marginLeft: "-40px" }}
      >

        <rect x="0" y="60" rx="0" ry="0" width="100%" height="13" />

        <circle cx="60" cy="100" r="8" />

        <rect x="75" y="95" rx="5" ry="5" width="350" height="10" />

        <circle cx="60" cy="120" r="8" />
        <rect x="75" y="115" rx="5" ry="5" width="350" height="10" />

        <circle cx="60" cy="140" r="8" />
        <rect x="75" y="135" rx="5" ry="5" width="350" height="10" />

        <circle cx="60" cy="160" r="8" />
        <rect x="75" y="155" rx="5" ry="5" width="350" height="10" />

        <circle cx="60" cy="180" r="8" />
        <rect x="75" y="175" rx="5" ry="5" width="350" height="10" />

        <rect x="355" y="195" rx="3" ry="3" width="30" height="5" />
        <rect x="290" y="195" rx="3" ry="3" width="50" height="5" />
        <rect x="400" y="195th" rx="3" ry="3" width="20" height="5" />

      </ContentLoader>
    );
  }
}
