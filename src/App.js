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
                  <div className="alert alert-info float-left w-100 mt-4">
                      <h2>
                          Welcome to Cashflow!
                      </h2>
                      <p>
                          Cashflow is a simple tool which allows you to keep track of finances.
                      </p>
                      <h4>Features</h4>
                      <ul>
                          <li>Separate data models for income and expenses</li>
                          <li>Charts to visualize contribution of sources</li>
                          <li>Automatic surplus calculation</li>
                      </ul>
                      <h4>Source code</h4>
                      <p>
                          You can view the source code for this app by visiting:
                          <br/>
                          <br/>
                          <a href="https://github.com/ryanlanc20/Cashflow" target="_blank" rel="noopener noreferrer">https://github.com/ryanlanc20/Cashflow</a>
                      </p>
                  </div>
                  <div className="alert alert-warning float-left w-100 mt-4">
                      Note: This is just a demo. Your data will not be saved,
                      and it will no longer be available after leaving this page.
                  </div>
                  <Model modelName="Income"/>
                  <Model modelName="Expenses"/>
              </div>
          </ModelsContext.Provider>
      </div>
    </>
  );
}

export default App;
