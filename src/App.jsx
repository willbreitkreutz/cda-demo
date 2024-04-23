import { useState } from 'react';
import TsListCWMSjs from './app-components/ts-list-cwmsjs'
import TsSelectCWMSJS from './app-components/ts-select-cwmjs'

const DISTRICT = "SAM"

function App() {
  const [tsid, setTsid] = useState("Allatoona.Elev.Inst.15Minutes.0.Raw-USGS");
  return (
    <>
      <TsSelectCWMSJS
        district={DISTRICT}
        value={tsid}
        filter={"*.Elev.Inst.15Minutes.0.Raw-USGS"}
        onSelect={setTsid}
      />
      <TsListCWMSjs
        district={DISTRICT}
        tsId={tsid}
      />
    </>
  );
}

export default App
