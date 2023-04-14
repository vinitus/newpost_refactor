import React, { useState } from 'react';
import ArticleCreatePage from './Pages/ArticleCreatePage';
import OriginalArticleCreatePage from './Pages/OriginalArticleCreatePage';

function App() {
  const [whatShow, setWhatShow] = useState('리팩토링 코드');

  const whatShowClickHandler = (e) => {
    setWhatShow(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row justify-center my-10">
        <input
          type="button"
          value="이전의 코드"
          onClick={whatShowClickHandler}
          className={`mx-100 bg-#2F80ED hover:bg-#2F80ED/80  rounded-full text-prettywhite font-semibold px-50 py-5 text-xl ${
            whatShow === '이전의 코드' && 'border-4 border-blue-950'
          }`}
        />
        <input
          type="button"
          value="리팩토링 코드"
          onClick={whatShowClickHandler}
          className={`mx-100 bg-#2F80ED hover:bg-#2F80ED/80  rounded-full text-prettywhite font-semibold px-50 py-5 text-xl ${
            whatShow === '리팩토링 코드' && 'border-4 border-blue-950'
          }`}
        />
      </div>
      {whatShow === '리팩토링 코드' ? <ArticleCreatePage /> : <OriginalArticleCreatePage />}
    </div>
  );
}

export default App;
