import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCertificate,
  faStar,
  faMoneyBill,
  faUser,
  faHome,
  faTrain,
  faShuttleVan,
  faAngleRight,
  faAngleLeft,
  faClipboardCheck,
  faCogs,
  faCampground,
  faHippo,
  faHandPaper
} from "@fortawesome/free-solid-svg-icons";

import "./symbols.css";

export class Separator extends React.Component {
  render() {
    return <div className="separator">:</div>;
  }
}

export class Or extends React.Component {
  render() {
    return <div className="or">or</div>;
  }
}

export class Money extends React.Component {
  render() {
    return (
      <div className="money">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} className="coin" />
          <span
            className={
              "fa-layers-text fa-inverse " +
              (this.props.$ > 0 ? "" : "negative")
            }
          >
            {this.props.$}
          </span>
        </span>
      </div>
    );
  }
}

export class Points extends React.Component {
  render() {
    return (
      <div className="points">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faStar} />
          <span className="fa-layers-text fa-inverse">{this.props.vp}</span>
        </span>
      </div>
    );
  }
}

export class Card extends React.Component {
  render() {
    let value = 0;
    switch (this.props.cow) {
      case "Jersey":
        value = 1;
        break;
      case "Guernsey":
        value = 2;
        break;
      case "DutchBelt":
        value = 2;
        break;
      case "BlackAngus":
        value = 2;
        break;
      case "Holstein":
        value = 3;
        break;
      case "BrownSwiss":
        value = 3;
        break;
      case "Aryshire":
        value = 3;
        break;
      case "WestHighland":
        value = "";
        break;
      case "TexasLonghorn":
        value = "";
        break;
    }

    return (
      <div className="symbol-card">
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon
            icon={faMoneyBill}
            rotation={90}
            transform={"shrink-3"}
            className={this.props.cow}
          />
          <FontAwesomeIcon icon={faCircle} className="background" />
          <span className={"fa-layers-text fa-inverse " + this.props.cow}>
            {value}
          </span>
        </span>
      </div>
    );
  }
}

export class Worker extends React.Component {
  render() {
    return (
      <div className="worker">
        <FontAwesomeIcon
          icon={faUser}
          className="background"
          className={this.props.type}
        />
      </div>
    );
  }
}

export class Building extends React.Component {
  render() {
    return (
      <div className="building">
        <FontAwesomeIcon icon={faHome} />
      </div>
    );
  }
}

export class Train extends React.Component {
  render() {
    const train = (
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={faShuttleVan} />
        <FontAwesomeIcon icon={faCircle} className="background" />
        <span className={"fa-layers-text fa-inverse "}>
          {this.props.spaces}
        </span>
      </span>
    );

    if (this.props.spaces > 0) {
      return (
        <div className="train">
          {train}
          <FontAwesomeIcon icon={faAngleRight} className="train-forward" />
        </div>
      );
    } else {
      return (
        <div className="train">
          <FontAwesomeIcon icon={faAngleLeft} className="train-backwards" />
          {train}
        </div>
      );
    }
  }
}

export class Certificate extends React.Component {
  render() {
    return (
      <div className="certificate">
        <div className=" fa-layers fa-fw">
          <FontAwesomeIcon icon={faCertificate} />
          <span className={"fa-layers-text fa-inverse "}>
            {this.props.spaces}
          </span>
        </div>
      </div>
    );
  }
}

export class Objective extends React.Component {
  render() {
    return (
      <div className="objective">
        <FontAwesomeIcon icon={faClipboardCheck} />
      </div>
    );
  }
}

export class Auxillary extends React.Component {
  render() {
    return (
      <div className="auxillary">
        <FontAwesomeIcon icon={faCogs} />
      </div>
    );
  }
}

export class Teepee extends React.Component {
  render() {
    return (
      <div className="symbol-teepee">
        <FontAwesomeIcon icon={faCampground} />
      </div>
    );
  }
}

export class Cow extends React.Component {
  render() {
    return <FontAwesomeIcon icon={faHippo} className="cow" />;
  }
}

export class Hazard extends React.Component {
  render() {
    return <FontAwesomeIcon icon={faHandPaper} className="symbol-hazard" />;
  }
}

export class Pair extends React.Component {
  render() {
    return (
      <div className="pair">
        <svg width="0" height="0">
          <radialGradient id="rg" r="150%" cx="30%" cy="107%">
            <stop stopColor="#fdf497" offset="0" />
            <stop stopColor="#fdf497" offset="0.05" />
            <stop stopColor="#fd5949" offset="0.45" />
            <stop stopColor="#d6249f" offset="0.6" />
            <stop stopColor="#285AEB" offset="0.9" />
          </radialGradient>
        </svg>
        <FontAwesomeIcon
          icon={faMoneyBill}
          rotation={90}
          transform={"shrink-3"}
          className="pair-card"
        />
        <span>=</span>
        <FontAwesomeIcon
          icon={faMoneyBill}
          rotation={90}
          transform={"shrink-3"}
          className="pair-card"
        />
      </div>
    );
  }
}