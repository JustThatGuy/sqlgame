import '../css/App.css';

import { useState } from "react"
import TabMenu from '../components/TabMenu';
import Table from '../components/Table';
import BasicTable from '../components/BasicTable';
import data from "../data/data.json"
import DatabaseDiagram from '../components/DatabaseDiagram';
import { questInfo } from "../components/QuestInfo"
import { backenduri } from '..';

function App() {
  const [queryResult, setQueryResult] = useState (data)
    // parse query to backend
    const execQuery = async () => {
        const query = document.getElementById("SQLQueryField").value;
        if (query) {
            const res = await fetch(`${backenduri}/query`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    query: query
                })
            });
            if (!res.ok) {
              document.getElementById("ResultArea").innerText = await res.text();
            }
            var result = await res.json();
            setQueryResult(result);
            //document.getElementById("ResultArea").innerText = setQueryResult(result);


        } else {
            document.getElementById("ResultArea").innerText = "You should enter a query in the SQL Query field...";
        }
    };



    // Build the screen
    return (
        <div className="Screen">
            <div className="TabCell">
                <TabMenu />
            </div>

            <div className="OperationsCell">
                <div className="LevelLayout">
                    <div className="Form" id="SQLForm" aria-label="SQL Form">
                        <div className="QueryHeader">
                            <label className="FieldLabel">SQL Query</label>
                            <button id="Execute" className="ExecuteButton" onClick={execQuery}>Execute ►</button>
                        </div>
                        <textarea id="SQLQueryField"></textarea>
                    </div>

                    <div className="ResultDisplay">
                        <label className="DisplayLabel">Result</label>
                        <div className="Result" id="ResultArea">
                            <BasicTable jsonData={queryResult}/>
                        </div>
                    </div>
                </div>

                {questInfo[0]}
            </div>

            <DatabaseDiagram />
        </div>
    );
};

export default App;