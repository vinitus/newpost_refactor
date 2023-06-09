export default async function newpostAPI(recipeCreateReq, stepImgFile) {
  console.log(recipeCreateReq);

  const data = new FormData();
  const stemNums = [];

  stepImgFile.forEach((file, fileIdx) => {
    if (file) {
      data.append('file', file);
      if (fileIdx != 0) {
        stemNums.push(fileIdx);
      }
    }
  });

  recipeCreateReq.stemNums = stemNums;

  data.append('recipeCreateReq', new Blob([JSON.stringify(recipeCreateReq)], { type: 'application/json' }));

  for (const value of data) {
    console.log(value);
  }
}
