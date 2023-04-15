import { useState, useContext, useEffect, useReducer } from "react";

// Component imports
import EditableTextField from "../textfields/EditableTextField";
import PriceEditableTextField from "../textfields/PriceEditableTextField";
import { Chart } from "react-google-charts";

// State imports
import { ModelsContext } from "../../App";
import modelEntryReducer from "../../reducers/modelEntryReducer.js";

const Model = (props) => {

    // Data stores
    const [,setModelsContext] = useContext(ModelsContext);
    const [chartData,setChartData] = useState([]);
    const [entries,setEntries] = useReducer(modelEntryReducer,{});

    // Actions
    const createEntry = () => {
        setEntries({"type": "create"});
    };
    
    const editEntry = (key,field,value) => {
        setEntries({
            "type":"edit",
            "key":key,
            "field":field,
            "value":value
        });
    };

    // Update model summaries and chart when model data changes
    useEffect(() => {

        // Update model summary
        setModelsContext((modelTotals) => {
            let modelKey = `total_${props.modelName.toLowerCase()}`;
            modelTotals[modelKey] = Object.values(entries).map((entry) => {
                return parseFloat(entry.amount);
            }).reduce((previous,current) => {
                return previous + current;
            },0);
            return {...modelTotals};
        });

        // Update chart
        let newChartData = [["Description","Amount"]];
        newChartData.push(...Object.values(entries).map((entry) => 
            [entry["desc"],parseFloat(entry["amount"])]
        ));
        console.log(newChartData);
        setChartData(newChartData);
    },[entries]);


    return (
        <div className="card mt-4 float-left w-100">
            <div className="card-header">
                {props.modelName}
            </div>
            <div className="card-body">
                {
                    Object.keys(entries).length > 0 ?
                        <>
                            <div className="card mb-4">
                                <div className="card-header">
                                    Chart data
                                </div>
                                <div className="card-body">
                                <Chart
                                    chartType="PieChart"
                                    data={chartData}
                                    width="100%"
                                    height="400px"
                                />
                                </div>
                            </div>
                        </>
                    :
                    ""
                } 
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                Description
                            </th>
                            <th scope="col">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(entries).map(([key,]) => {
                                return (
                                    <tr>
                                        <td>
                                            <EditableTextField
                                                onChange={(value)=>{editEntry(key,"desc",value)}}
                                                currentValue={entries[key]["desc"]}
                                            />
                                        </td>
                                        <td>
                                            <PriceEditableTextField
                                                onChange={(value)=>{editEntry(key,"amount",value)}}
                                                currentValue={entries[key]["amount"]}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="card-header">
                <button className="btn btn-primary float-right" onClick={createEntry}>Add row</button>
            </div>
        </div>
    )
};

export default Model;