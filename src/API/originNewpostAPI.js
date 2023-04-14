export default async function originNewpostAPI(recipeCreateReq, thumbnailImgFile, stepImgFile, token) {
  console.log(recipeCreateReq);

  const data = new FormData();

  data.append('recipeCreateReq', new Blob([JSON.stringify(recipeCreateReq)], { type: 'application/json' }));
  data.append('file', thumbnailImgFile);

  stepImgFile.forEach((file) => {
    if (file) {
      data.append('file', file);
    }
  });

  for (const value of data) {
    console.log(value);
  }
}
