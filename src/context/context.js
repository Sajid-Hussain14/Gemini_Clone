import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData , setResultData] = useState("");

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response= await run(prompt);
            setRecentPrompts(prompt)
        }
        else {
            // Add a delay of 1 second before making the request
            await delay(1000);  // 1000 milliseconds = 1 second
            setPrevPrompts(prev=> [...prev, input])
            setRecentPrompts(input)
            response = await run(input)
        }
        // setRecentPrompts(input)
        // setPrevPrompts(prev=> [...prev, input])
        // const response = await run(input)
        let responseArray = response.split("**");
        let newResponse ="";
        for (let i=0; i<responseArray.length; i++) 
        {
            if(i===0 || i%2!==1)
            {
                newResponse+=responseArray[i];
            }
            else
            {
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split(" ");
        for (let i =0; i<newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false)
        setInput("")
    }

    // onSent("what is reast js?")

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompts,
        recentPrompts,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat 
    }

    // Call onSent only after component is mounted
    useEffect(() => {
        setShowResult(false);
    }, []);  // Empty dependency array ensures it runs once on mount

    return ( 
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
     )
}

export default ContextProvider
