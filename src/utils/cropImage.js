const createImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image(); //image 객체 생성: <img src="이미지파일" alt=""/> 태그에 의해 생성되는 객체
    image.src = url;
    resolve(image);
  });
};

const getCroppedImage = async (imageSrc, pixelCrop, rotation) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(file);
      //resolve(URL.createObjectURL(file)); // url string을 return
    }, 'image/jpeg');
  });
};

export default getCroppedImage;

// https://codesandbox.io/s/q8q1mnr01w?file=/src/cropImage.js:2158-2286
