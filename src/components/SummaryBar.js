import { useEffect, useState, useRef, useContext} from "react";
import { ModelsContext } from "../App";

const SummaryBar = () => {

    // Data state
    const [modelsContext,] = useContext(ModelsContext);
    
    const [summaryBox,setSummaryBox] = useState({
        "width": "100%",
        "float": "left",
        "background-color":"#fff",
        "color": "#000",
        "border-bottom": "1px solid #ccc",
        "padding-top": "10px",
        "padding-bottom": "10px",
        "z-index": "1"
    });

    // Did navigation bar already scroll out of viewport?
    const passedScrollThreshold = useRef(false);

    useEffect(() => {
        // Signal to remove event handler before page re-render.
        const controller = new AbortController();

        document.addEventListener("scroll",(e) => {
            // Navigation bar scrolled out of view, so fix summary bar to top of viewport.
            if (
                (window.scrollY > 45) && 
                (passedScrollThreshold.current === false)
            )
            {
                setSummaryBox((style) => {
                    return {...style,"position":"fixed"}
                });
                passedScrollThreshold.current = true;
                return;
            }

            // Navigation bar scrolled into viewport, so set summary bar to original position.
            if ((window.scrollY < 45) && (passedScrollThreshold.current === true))
            {
                setSummaryBox((style) => {return {...style,"position":"relative"}});
                passedScrollThreshold.current = false;
                return;
            }
        },{"signal":controller.signal});

        return () => {
            controller.abort()
        };
    });

    return (
        <div style={summaryBox}>
            <div className="container-md">
                <table className="table m-0" style={{"color": "#000"}}>
                    <thead>
                        <th>Total Income</th>
                        <th>Total Expenses</th>
                        <th>Surplus</th>
                    </thead>
                    <tbody>
                        <td>
                            <span>
                                {modelsContext["total_income"]}
                            </span>
                        </td>
                        <td>
                            {modelsContext["total_expenses"]}
                        </td>
                        <td>
                            {modelsContext["total_income"] - modelsContext["total_expenses"]}
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default SummaryBar;