import React, { useMemo, useState } from "react";
import "./layout.css";
import { LuArrowLeftRight } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RadioContent, TravelerClass } from "../data";

function Screen1Layout() {
  const [radioOption, setRadioOption] = useState("");
  const [travelClass, setTravelClass] = useState([...TravelerClass]);


  const handleChange = (e) => {
    setRadioOption(e.target.value);
  };

  const minusHandler = (name, counter) => {
    // const filterData = travelClass.find((item) => item.name === name);

    if (counter === 0) return;

    setTravelClass((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, counter: item.counter - 1 }
          : { ...item }
      )
    );
  };
  const addHandler = (name, counter) => {
    // const filterData = travelClass.find((item) => item.name === name);

    if (counter === 9) return;

    setTravelClass((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, counter: item.counter + 1 }
          : { ...item }
      )
    );
  };

  let totalCounter = useMemo(() => {
    return travelClass.reduce((acc, traveler) => acc + traveler.counter, 0);
  }, [travelClass])



  return (
    <div className="width-40">
      <div className="flex-row align-center justify-between ">
        <div className="headingWrapper flex-col border-bottom-gray width-40">
          <small className="head1">Depart From</small>
          <h2>New Delhi</h2>
          <small className="head2">Del</small>
        </div>
        <div style={{ color: "red" }}>
          <LuArrowLeftRight />
        </div>
        <div className="headingWrapper flex-col border-bottom-gray width-40">
          <small className="head1 text-align-end">Going To</small>
          <h2 className="text-align-end">Mumbai</h2>
          <small className="head2 text-align-end">BOM</small>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Accordion>
          <AccordionSummary
          style={{borderBottom:"1px solid black"}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="flex-col">
              <div className="head1">Traveller(s), Class</div>
              <div style={{ fontWeight: 500, fontSize: "15px" }} className="head1">{`${totalCounter} Traveller, ${radioOption}`}</div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex-row align-center justify-between">
              {travelClass.map(({ name, counter }, ind) => {
                return (
                  <div key={ind.toString()} className="flex-col">
                    <div>{name}</div>
                    <div className="flex-row align-center justify-center margin-top-12">
                      <button
                        className="Plus-minus"
                        onClick={() => minusHandler(name, counter)}
                      >
                        -
                      </button>
                      <label className="counter">{counter}</label>
                      <button
                        className="Plus-minus"
                        onClick={() => addHandler(name, counter)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="margin-top-12">
              {RadioContent.map(({ radioLabel }, index) => {
                return (
                  <div key={index} className="flex-row">
                    <input
                      type="radio"
                      id={radioLabel}
                      name="fav_language"
                      value={radioLabel}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor={radioLabel}>{radioLabel}</label>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Screen1Layout;
