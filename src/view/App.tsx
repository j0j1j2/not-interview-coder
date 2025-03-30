import { useEffect, useState, useRef } from "react";

const App = () => {
    const [openAiApiKey, setOpenAiApiKey] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    
    useEffect(() => {
        window.store.getOpenAiApiKey().then(setOpenAiApiKey);
    }, []);

    function handleCapture() {
        console.log("handleCapture");
        window.capture.captureFocused();
    }
    return (
        <div className="w-full h-full min-h-screen">
            <div>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleCapture}>Capture</button>
                {!openAiApiKey &&
                    <div className="flex nic-block justify-between items-center">
                        <h1 className="text-md font-bold">🦔 Please set your OpenAI API Key</h1>
                        <div className="flex items-center gap-2 ml-4 input-container">
                            <input 
                                type="password" 
                                placeholder="OpenAI API Key" 
                                className="border-2 bg-white rounded-md p-2 w-64" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                    </div> 
                }
            </div>
        </div>
    );
}

export default App;