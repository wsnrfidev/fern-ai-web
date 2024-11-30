import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")


    function delayPara(index, nextWord) {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const onSent = async (prompt) => {
        console.log("onSent called. Prompt received:", prompt);
    
        
        if (!prompt && !input) {
            console.error("Prompt and input are both empty. Aborting.");
            return; 
        }
    
        setResultData(""); 
        setLoading(true);
        setShowResult(true);
    
        try {
            let response;
            if (prompt !== undefined) {
                console.log("Using provided prompt:", prompt);
                response = await runChat(prompt);
                setRecentPrompt(prompt);
            } else {
                console.log("Using input:", input);
                setPrevPrompts((prev) => [...prev, input]);
                setRecentPrompt(input);
                response = await runChat(input);
            }
    
            console.log("runChat response received:", response);
    
            // Format respons
            let responseArray = response.split('**');
            let newArray = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newArray += responseArray[i];
                } else {
                    newArray += "<b>" + responseArray[i] + "</b>";
                }
            }
    
            console.log("Formatted response:", newArray);
    
            responseArray = newArray.split('*').join("</br>").split(" ");
            for (let i = 0; i < responseArray.length; i++) {
                const nextWord = responseArray[i];
                delayPara(i, nextWord + " ");
            }
        } catch (error) {
            console.error("Error in onSent:", error);
        } finally {
            setLoading(false);
            setInput(""); 
        }
    };
    

    const newChat = async () => {
        setLoading(false);
        setShowResult(false);
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider