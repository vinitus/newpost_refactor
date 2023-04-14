export default async function newpostAPI(recipeCreateReq, stepImgFile) {
  console.log(recipeCreateReq);

  const data = new FormData();

  data.append('recipeCreateReq', new Blob([JSON.stringify(recipeCreateReq)], { type: 'application/json' }));

  stepImgFile.forEach((file) => {
    if (file) {
      data.append('file', file);
    }
  });

  for (const value of data) {
    console.log(value);
  }
}
