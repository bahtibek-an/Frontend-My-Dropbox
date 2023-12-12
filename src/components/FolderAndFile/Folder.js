import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Folder = ({ folder }) => (
  <Card
    as={Link}
    to={{ pathname: `/folder/${folder.id}`, state: { folder } }}
    variant="success"
    className="card-body text-muted text-decoration-none">
    <FontAwesomeIcon icon={faFolder} className="text-success w-50 h-50" />
    <h6 className="mt-3">{folder.name}</h6>
  </Card>
);

export default Folder;