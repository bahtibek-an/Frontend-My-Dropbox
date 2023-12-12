const React = require("react");
const { faFile } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

function File(props) {
  const { file } = props;
  return (
    React.createElement("div", null,
      React.createElement("a", {
        href: file.url,
        className: "ms-1 text-decoration-none text-muted"
      },
        React.createElement(FontAwesomeIcon, {
          icon: faFile,
          className: "me-2 text-success"
        }),
        file.name
      )
    )
  );
}

module.exports = File;