import React, { useState, useEffect } from "react";
import AlanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

const AlanKey = 'b824c0672aa92c2832ef79a4e626e5382e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

  const [ newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    AlanBtn({
      key : AlanKey,
      onCommand : ({ command, articles }) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
        }
      }
    })
  }, [])
 
  return(
    <div>
       <h1>Inkuru AI</h1>
       <NewsCards articles={newsArticles}/>
    </div>
  );
}

export default App