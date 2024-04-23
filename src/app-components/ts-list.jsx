import { useState, useEffect } from "react";
import TsListItem from "./ts-list-item";


function TsList({ district, tsId }) {
  const [values, setValues] = useState([]);

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
    })
  }, [district, tsId])

  return (
    <ul>
      {values.map((val) => {
        return <TsListItem key={val[0]} time={val[0]} val={val[1]} />;
      })}
    </ul>
  );
}

export default TsList;
