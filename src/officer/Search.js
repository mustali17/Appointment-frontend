import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Scrollbar from "react-scrollbars-custom";
// import { ListGroup, ListGroupItem } from "reactstrap";

import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import Trie from "./Trie.js";
import specialization from "./specialization";
import { Link } from "react-router-dom";

const Search = () => {
  const [text, setText] = useState();
  const [suggestions, setSuggestions] = useState([]);

  const memoized_trie = useMemo(() => {
    const trie = new Trie();

    // Insert
    for (let i = 0; i < specialization.length; i++) {
      trie.insert(specialization[i]);
    }

    return trie;
  }, []);

  function onTextChanged(e) {
    let value = e.target.value;
    setText(value);
    fetchofficer();
    value = value.toLowerCase();
    if (value !== "") setSuggestions(memoized_trie.find(value));
    else setSuggestions([]);
  }

  function suggestionSelected(value) {
    setText(value);
    setSuggestions([]);
  }

  function renderSuggestions() {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <InputGroup>
        <ul className="list-group dropdown-menu pt-0 pb-0">
          {suggestions.map((item) => (
            <li
              className="list-group-item list-group-item-action"
              onClick={() => suggestionSelected(item)}
              key={item}
            >
              {item} 
            </li>
          ))}
        </ul>
      </InputGroup>
    );
  }

  const [officer, setofficer] = useState([]);

  const fetchofficer = async () => {
    const { data } = await Axios.get(
      `https://appointmentbackend.onrender.com/officers/`
    );
    setofficer(data);
    console.log(data);
  };

  const UpdateDisplay = (text) => {
    setofficer((officer) => {
      return officer.filter(
        (officer) => officer.specialization.toLowerCase() === text.toLowerCase()
      );
    });
    console.log(officer);
  };

  useEffect(() => {
    fetchofficer();
  }, []);

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Input
              value={text}
              type="text"
              placeholder="Search Your Officer"
              onChange={onTextChanged}
              className="mb-1"
            />
            <div style={{ height: 10 }} className="">
              <InputGroupAddon addonType="append">
                <Button
                  className="h-10 d-inline-block"
                  color="primary"
                  onClick={() => UpdateDisplay(text)}
                >
                  Search
                </Button>
              </InputGroupAddon>
            </div>
          </InputGroup>
          {renderSuggestions()}
        </Col>
      </Row>

      {/* <ListGroup> */}
      <Scrollbar
        noScrollX
        style={{ position: "", height: "64vh", width: "144vh" }}
        className="col-12 col-md-12"
      >
        <div className="row">
          {officer.map((off) => (
            // <ListGroupItem key={off.id} className="mb-3">
            <div className="col-sm-6 mb-2" key={off._id}>
              <div className="card">
                <div className="card-body">
                  <div className="text-info">
                    <h6>
                      Officer Name:
                      <span className="text-uppercase"> {off.name}</span>
                    </h6>
                  </div>
                  <div>Department : {off.specialization}</div>
                  <div>Designation : {off.designation}</div>
                  <div>Phone Number : {off.phoneNumber}</div>
                  <br/>
                  <div className="row mb-0 pb-0">
                    
                    <div
                      className=" col align-self-end col-md-2 offset-md-3 inline"
                      style={{ textAlign: "center" }}
                    ><Link to={{ pathname: "/citizen/selectdate", officer: { officer: off } }}>
                      <button className="btn btn-sm btn-primary"
                     
                      >  Book</button> </Link>
                    </div>
                  </div>

                  {/* </ListGroupItem> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Scrollbar>
      {/* </ListGroup> */}
    </div>
  );
};

export default Search;
