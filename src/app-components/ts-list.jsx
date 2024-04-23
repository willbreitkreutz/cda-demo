import { useState, useEffect } from "react";
import TsListItem from "./ts-list-item";

function findMax(values){
    const sorted = values.map((val) => {
        return val[1]
    }).filter((val) => { return val !== null}).sort();
    return sorted[sorted.length-1]
}

function TsList({ district, tsId }) {
  const [values, setValues] = useState([]);
  const [maxValue, setMaxValue] = useState(0)

  useEffect(() => {
    const url = `https://cwms-data.usace.army.mil/cwms-data/timeseries?name=${tsId}&office=${district}`
    fetch(url, {
        headers: {
            "accept": "application/json;version=2"
        }
    }).then((response) => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error()
        }
    }).then((data) => {
        setValues(data?.values || [])
        setMaxValue(findMax(data?.values || []))
    })
  }, [district, tsId])

  return (
    <>
    <h2>{maxValue}</h2>
    <ul>
      {values.map((val) => {
        return <TsListItem key={val[0]} time={val[0]} val={val[1]} />;
      })}
    </ul>
    </>
  );
}

export default TsList;
