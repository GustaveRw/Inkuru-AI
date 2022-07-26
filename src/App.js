import React, { useState, useEffect } from "react";
import AlanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordsToNumbers from "words-to-numbers";

const AlanKey = 'b824c0672aa92c2832ef79a4e626e5382e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

  const [ newsArticles, setNewsArticles] = useState([]);
  const [ activeArticle, setArtiveArticle ] = useState(-1);
  const classes = useStyles();
  useEffect(() => {
    AlanBtn({
      key : AlanKey,
      onCommand : ({ command, articles, number }) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setArtiveArticle(-1);
        } else if(command === 'highlight') {
          setArtiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy : true }) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber > 20) {
            AlanBtn().playText('Please Try that again');
          } else if (article) {
            window.open(article.url, '_blank');
            AlanBtn().playText('Opening...');
          }
        }
      }
    })
  }, [])
 
  return(
    <div>
       <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.AlanLogo} alt="alan logo"/>
       </div>
       <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App