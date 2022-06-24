// 최소값, 최대값을 넣으면 그 안에서 무작위 정수를 출력하는 함수.
const returnRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default returnRandomNumber;
