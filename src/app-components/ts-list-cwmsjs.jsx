import { useState, useEffect } from "react";
import TsListItem from "./ts-list-item";
import { TimeSeriesApi, Configuration } from "cwmsjs";

const v2_config = new Configuration({
  headers: {
    accept: "application/json;version=2",
  },
});
const ts_api = new TimeSeriesApi(v2_config);

function findMax(values) {
  const sorted = values
    .map((val) => {
      return val[1];
    })
    .filter((val) => {
      return val !== null;
    })
    .sort();
  return sorted[sorted.length - 1];
}

function TsListCWMSjs({ district, tsId }) {
  const [values, setValues] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    ts_api
      .getCwmsDataTimeseries({
        office: district,
        name: tsId,
      })
      .then((data) => {
        setValues(data?.values || []);
        setMaxValue(findMax(data?.values || []));
      });
  }, [district, tsId]);

  return (
    <>
      <h2>{maxValue}</h2>
      <ul>
        {values.map((val) => {
          return (
            <TsListItem
              key={val[0]}
              time={val[0]}
              val={val[1] ? val[1].toFixed(2) : "Missing"}
            />
          );
        })}
      </ul>
    </>
  );
}

export default TsListCWMSjs;
