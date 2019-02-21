import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHippo,
  faTrain,
  faCogs
} from "@fortawesome/free-solid-svg-icons";

import "./action.css";
import { NONAME } from "dns";

export default class Action extends React.Component {
  render() {
    const content = get_content(this.props.action);
    return (
      <div
        className={"action " + this.props.action}
        onClick={() => {
          console.log(this.props.action);
          this.props.moves[this.props.action]();
        }}
      >
        {content}
      </div>
    );
  }
}

function get_content(action) {
  if (action === "neutralA1") {
    return (
      <div>
        <div
          style={{
            color: "black",
            fontSize: "1.5vh",
            backgroundColor: "white",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          2
        </div>
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "50%",
            backgroundColor: "yellow",
            padding: "2px"
          }}
        >
          2
        </span>
      </div>
    );
  } else if (action === "neutralA2") {
    return (
      <div>
        <div
          style={{
            paddingTop: "25%",
            color: "black",
            fontSize: "2vh"
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "50%",
            backgroundColor: "grey",
            padding: "2px"
          }}
        >
          0
        </span>
      </div>
    );
  } else if (action === "neutralA3") {
    return (
      <div>
        <div
          style={{
            paddingTop: "25%",
            color: "black",
            fontSize: "2vh"
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "50%",
            backgroundColor: "red",
            padding: "2px"
          }}
        >
          -2
        </span>
      </div>
    );
  } else if (action === "neutralB1") {
    return (
      <div>
        <div
          style={{
            color: "black",
            fontSize: "1.5vh",
            backgroundColor: "green",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          2
        </div>
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "50%",
            backgroundColor: "yellow",
            padding: "2px"
          }}
        >
          2
        </span>
      </div>
    );
  } else if (action === "neutralB2") {
    return (
      <div>
        <div
          style={{
            color: "black",
            fontSize: "2vh",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>

        <FontAwesomeIcon icon={faUser} color={"orange"} />
        <span style={{ color: "black", fontWeight: "bold" }}>:</span>
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "50%",
            backgroundColor: "yellow",
            padding: "2px"
          }}
        >
          2
        </span>
      </div>
    );
  } else if (action === "neutralC2") {
    return (
      <div>
        <div
          style={{
            color: "black",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"purple"} />
          <span style={{ color: "black", fontWeight: "bold" }}>:</span>
          <span
            style={{
              color: "black",
              fontSize: "2vh",
              margin: "5px",
              marginTop: "25%"
            }}
          >
            <FontAwesomeIcon icon={faTrain} />
          </span>
        </div>
      </div>
    );
  } else if (action === "neutralD2") {
    return (
      <div>
        <div
          style={{
            color: "black",
            fontSize: "2.5vh",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          <FontAwesomeIcon icon={faCogs} />
        </div>
      </div>
    );
  } else if (action === "neutralE1") {
    return (
      <div>
        <div
          style={{
            color: "white",
            fontSize: "1.5vh",
            backgroundColor: "black",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          2
        </div>
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "50%",
            backgroundColor: "yellow",
            padding: "2px"
          }}
        >
          2
        </span>
      </div>
    );
  } else if (action === "neutralE2") {
    return (
      <div>
        <div
          style={{
            color: "black",
            fontSize: "2.5vh",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          <FontAwesomeIcon icon={faHippo} />
        </div>
      </div>
    );
  } else if (action === "neutralG1") {
    return (
      <div>
        <div
          style={{
            color: "black",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"purple"} />
          <span style={{ color: "black", fontWeight: "bold" }}>:</span>
          <span
            style={{
              color: "black",
              fontSize: "2vh",
              margin: "5px",
              marginTop: "25%"
            }}
          >
            <FontAwesomeIcon icon={faTrain} />
          </span>
        </div>
      </div>
    );
  } else if (action === "neutralG2") {
    return (
      <div>
        <div
          style={{
            color: "black",
            fontSize: "2.5vh",
            margin: "5px",
            marginTop: "25%"
          }}
        >
          <FontAwesomeIcon icon={faCogs} />
        </div>
      </div>
    );
  } else {
    return "";
  }
}
