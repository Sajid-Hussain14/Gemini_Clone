import React, { useContext } from "react"
import './Main.css'
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const App = () => {

    const {onSent, recentPrompts, showResult, loading, resultData, setInput, input} = useContext(Context)

    return (
    <div className="Main"> 
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult
            ?<>
                 <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can we help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Sugget beatiful places in Taiwan.</p>
                    <img src={assets.compass_icon}alt="" />
                </div>
                <div className="card">
                    <p>Briefly describe what is Map Reduce function.</p>
                    <img src={assets.bulb_icon}alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding acticities.</p>
                    <img src={assets.message_icon}alt="" />
                </div>
                <div className="card">
                    <p>Improve my code.</p>
                    <img src={assets.code_icon}alt="" />
                </div>
            </div>
            </>
            :<div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompts}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html: resultData}}></p>
                }               
                </div>
            </div>    
        }


            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here..." />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display incorrect info, please check with a human.
                </p>
            </div>
        </div>
    </div>
  );
};

export default App;