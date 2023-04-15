import { createContext, useState} from "react";

// Component imports
import Header from './components/Header.js';
import Model from './components/containers/Model';
import SummaryBar from './components/SummaryBar';

export let ModelsContext = createContext();

function App() {

  // Model summaries
  const [modelsContext,setModelsContext] = useState({
      "total_income": 0,
      "total_expenses": 0,
      "cashflow": 0
  });

  return (
    <>
      <div className="App">
          <Header/>
          <ModelsContext.Provider value={[modelsContext,setModelsContext]}>
              <SummaryBar/>
              <div className="container-md">
                  <Model modelName="Income"/>
                  <Model modelName="Expenses"/>
              </div>
          </ModelsContext.Provider>
      </div>
    </>
  );
}

export default App;
