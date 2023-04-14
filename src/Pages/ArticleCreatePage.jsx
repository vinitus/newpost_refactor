/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { createRef, useRef, useState } from 'react';
import ArticleImgBlock from '../Components/ArticleImgBlock';
import newpostAPI from '../api/newpostAPI';

const ArticleCreatePage = () => {
  const handleConfirm = () => {
    const jsonData = {
      content: content.toString(),
      ingredients: ingredients.toString(),
      quantity: quantity.toString(),
      recipe_steps: stepContent,
      time: cookingTime.toString(),
      title,
      stepNums,
    };

    console.log(stepImgFile);

    newpostAPI(jsonData, stepImgFile)
      .then(() => {
        console.log('hi');
      })
      .catch(() => {
        console.log('error');
      });
  };

  /* global window */
  const newpostBtnClickHandler = (e) => {
    e.preventDefault();
    if (!title) {
      window.alert('제목이 없습니다!');
      return;
    }
    if (!content) {
      window.alert('내용이 없습니다!');
      return;
    }
    if (!ingredients) {
      window.alert('재료가 없습니다!');
      return;
    }
    if (!quantity) {
      window.alert('몇인분인지 알려주세요!');
      return;
    }
    handleConfirm();
  };

  const subTitle = 'font-semibold mb-24';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const cookingTimeRefArr = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [cookingTime, setCookingTime] = useState(0);
  const [ingredients, setIngredient] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [orderArr, setOrderArr] = useState([1]);
  const [stepContentRef, setStepContentRef] = useState([useRef(null), useRef(null)]);
  const [stepImgFileRef, setStepImgFileRef] = useState([useRef(null), useRef(null)]);
  const [stepContent, setStepContent] = useState(['']);
  const [stepImgFile, setStepImgFile] = useState([null, null]);
  const [stepNums, setStepNums] = useState([]);

  console.log(stepImgFile);

  // 단게별 글자수
  const [stepContentLetterCount, setStepContentLetterCount] = useState(Array(orderArr.length).fill(0));

  // 요리 단계 추가 버튼
  const addStepBtnHandler = () => {
    const lastIdx = orderArr.length + 1;
    setStepContentRef((prev) => {
      const newRefs = [...prev];
      newRefs.push(createRef(null));
      return newRefs;
    });
    setStepImgFileRef((prev) => {
      const newRefs = [...prev];
      newRefs.push(createRef(null));
      return newRefs;
    });
    setStepContent((prev) => {
      return [...prev, null];
    });
    setStepImgFile((prev) => {
      return [...prev, null];
    });
    setOrderArr((prev) => {
      return [...prev, lastIdx];
    });
  };

  // 요리시간 버튼 핸들러
  const cookingTimeBtnHandler = (e) => {
    if (e.target.localName === 'div') {
      return;
    }
    const idx = Number(e.target.id.split('time')[1]);
    cookingTimeRefArr.forEach((ref) => {
      ref.current.classList.add('border-#7F807F');
      ref.current.classList.remove('border-#2F80ED');
      ref.current.classList.remove('text-#2F80ED');
    });

    cookingTimeRefArr[idx].current.classList.add('border-#2F80ED');
    cookingTimeRefArr[idx].current.classList.add('text-#2F80ED');
    cookingTimeRefArr[idx].current.classList.remove('border-#7F807F');

    setCookingTime(idx);
  };

  // 양 변경
  const quantityHandler = (type) => {
    if (type === '-') {
      if (quantity > 1) {
        setQuantity((prev) => {
          return prev - 1;
        });
      }
    } else {
      setQuantity((prev) => {
        return prev + 1;
      });
    }
  };

  // 이미지, 텍스트 입력 핸들링
  const stepChangeHandler = (e) => {
    const { type, id } = e.target;
    const idx = Number(id.split('-')[2]) - 1;

    if (type === 'text') {
      const newStepContent = [...stepContent];
      newStepContent[idx] = e.target.value;
      setStepContent(newStepContent);
      const newStepContentLetterCount = [...stepContentLetterCount];
      newStepContentLetterCount[idx] = e.target.value.length;
      setStepContentLetterCount(newStepContentLetterCount);
    }
  };

  // 제목 글자수 관리 & title
  const handleTitleChange = (e) => {
    e.stopPropagation();
    setTitle(e.target.value);
  };

  // 내용 글자수 관리 & content
  const handleContentChange = (e) => {
    e.stopPropagation();
    setContent(e.target.value);
  };

  // 재료 글자수 관리 & ingredient
  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  return (
    <div className="flex flex-col mt-60">
      <div className="fixed z-10 flex items-center w-full justify-evenly h-100 px-auto grey-underbar bg-white/80">
        <div className="ml-48 text-center text-xl">자신의 레시피에 대해 자유롭게 이야기 해주세요!</div>
        <button
          type="button"
          className="bg-#2F80ED hover:bg-#2F80ED/80  rounded-full text-prettywhite font-semibold w-250 h-50  px-50 py-5 text-xl"
          onClick={(e) => {
            newpostBtnClickHandler(e);
          }}
        >
          글 등록하기
        </button>
      </div>
      <div className="w-1200 mx-auto border-x border-solid border-#7F807F px-203 pt-141">
        <div className="w-792 h-354">
          <ArticleImgBlock
            setRef={stepImgFileRef[0]}
            division="step-content-0"
            text="대표 이미지 업로드"
            width="full"
            height="354"
            fileSet={setStepImgFile}
          />
        </div>
        <div className="flex flex-col w-full text-xl">
          <div className="flex items-center w-full grey-underbar">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="레시피의 이름이 무엇인가요?"
              className="inline-block w-full py-26 px-38"
              onChange={handleTitleChange}
              maxLength={30}
            />
            <div className="inline pr-30">{title.length}/30</div>
          </div>
          <div className="flex flex-col items-center w-full grey-underbar">
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="5"
              className="w-full resize-none py-26 px-38"
              placeholder="레시피에 대한 간단한 설명을 붙여주세요"
              onChange={handleContentChange}
              maxLength={255}
            />
            <div className="w-full p-30 text-end">{content.length}/255</div>
          </div>
          {/* 이 요소의 하위 항목에 버튼이 존재하고 키보드 작동이 가능합니다. */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div className="px-40 mt-24 pb-31 grey-underbar" onClick={cookingTimeBtnHandler}>
            <div className={subTitle}>예상 소요 시간</div>
            <button
              type="button"
              className="border p-10 mr-20 border-#2F80ED text-#2F80ED"
              id="time0"
              ref={cookingTimeRefArr[0]}
            >
              15분 컷
            </button>
            <button type="button" className="border border-#7F807F p-10 mr-20" id="time1" ref={cookingTimeRefArr[1]}>
              30분 컷
            </button>
            <button type="button" className="border border-#7F807F p-10 mr-20" id="time2" ref={cookingTimeRefArr[2]}>
              45분 컷
            </button>
            <button type="button" className="border border-#7F807F p-10" id="time3" ref={cookingTimeRefArr[3]}>
              45분 이상
            </button>
          </div>
          <div className="px-40 mt-26 pb-31 grey-underbar">
            <div className={subTitle}>기준량</div>
            <div className="flex flex-row items-center mx-27-center">
              <button
                type="button"
                className="w-45 h-45 text-2xl leading-none bg-#ECECEC"
                onClick={() => {
                  quantityHandler('-');
                }}
              >
                -
              </button>
              <div className="mx-20 text-xl">{quantity}</div>
              <button
                type="button"
                className="w-45 h-45 text-2xl leading-none bg-#ECECEC"
                onClick={() => {
                  quantityHandler('+');
                }}
              >
                +
              </button>
              <div className="mx-20 text-xl">인분</div>
            </div>
          </div>
          <div className="w-full px-40 mt-26 pb-31 grey-underbar">
            <div className={subTitle}>재료</div>
            <div className="flex flex-col w-full">
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                className="w-full resize-none py-26"
                placeholder="재료를 입력해주세요"
                onChange={handleIngredientChange}
                maxLength={255}
              />
              <div className="inline text-end">{/* {ingredients.length}/255 */}</div>
            </div>
          </div>
          <div
            className="w-full px-40 mt-26 pb-31"
            // onChange={stepChangeHandler}
          >
            <div className={subTitle}>만드는 방법</div>
            {orderArr.map((value) => (
              <div className="flex flex-row" key={`div-${value}`}>
                <div className="bg-#AEAFAE w-70 h-70 rounded-50 text-prettywhite flex items-center justify-center mr-24 text-30">
                  {value}
                </div>
                <div className="text-md">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      id={`step-content-${value}`}
                      ref={stepContentRef[value]}
                      className="w-full p-3 h-70"
                      placeholder="만드는 방법을 입력하세요."
                      maxLength={50}
                      onChange={(e) => {
                        stepChangeHandler(e, value - 1);
                      }}
                    />
                    <div className="inline">{/* {stepContentLetterCount[value - 1]}/50 */}</div>
                  </div>
                  <div className="w-624 h-303">
                    <ArticleImgBlock
                      setRef={stepImgFileRef[value]}
                      division={`step-img-${value}`}
                      text="이미지 업로드(선택)"
                      width="624"
                      height="303"
                      fileSet={setStepImgFile}
                      setStepNums={setStepNums}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-full w-200 h-60 bg-#FFD1D1 hover:bg-#FF6B6C mt-40 text-lg"
                id="addStep"
                onClick={addStepBtnHandler}
              >
                <strong>+</strong> 단계 추가
              </button>
            </div>
            <button
              type="button"
              className="bg-#2F80ED hover:bg-#2F80ED/80 my-60 rounded text-prettywhite font-semibold w-full h-90 justify-center text-xl"
              onClick={(e) => {
                newpostBtnClickHandler(e);
              }}
            >
              글 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCreatePage;
