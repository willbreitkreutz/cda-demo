import { CatalogApi } from "cwmsjs";
import { useEffect, useState } from "react";
const catalog_api = new CatalogApi();

function TsSelectCWMSJS({ district, filter, onSelect, value }) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    catalog_api
      .getCwmsDataCatalogWithDataset({
        office: district,
        like: filter,
        dataset: "TIMESERIES",
      })
      .then((data) => {
        if (!data?.entries || data?.entries == 0) {
          throw Error(`No catalog timeseries returned`);
        }
        console.log(data?.entries);
        setValues(data?.entries);
        // Object.entries(data?.entries).forEach(([key, value]) => {
        // console.log(value?.name);
        // });
      });
  }, [district, filter]);
  return (
    <select
      value={value}
      onChange={(e) => {
        onSelect(e.target.value);
      }}
    >
      {values.map((data) => {
        return (
          <option key={data?.name} value={data?.name}>
            {data?.name}
          </option>
        );
      })}
    </select>
  );
}

export default TsSelectCWMSJS;
