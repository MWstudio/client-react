import tier from '../pages/Matching/TierData';

const setRankColor = user => {
  let ironColor = tier.iron.findIndex(v => {
    return v === user.solorank;
  });
  let bronzeColor = tier.bronze.findIndex(v => {
    return v === user.solorank;
  });
  let silverColor = tier.silver.findIndex(v => {
    return v === user.solorank;
  });
  let goldColor = tier.gold.findIndex(v => {
    return v === user.solorank;
  });
  let platinumColor = tier.platinum.findIndex(v => {
    return v === user.solorank;
  });
  let diamondColor = tier.diamond.findIndex(v => {
    return v === user.solorank;
  });
  let masterColor = tier.master.findIndex(v => {
    return v === user.solorank;
  });
  let grandmasterColor = tier.grandmaster.findIndex(v => {
    return v === user.solorank;
  });
  let challengerColor = tier.challenger.findIndex(v => {
    return v === user.solorank;
  });

  let findColor = [
    ironColor,
    bronzeColor,
    silverColor,
    goldColor,
    platinumColor,
    diamondColor,
    masterColor,
    grandmasterColor,
    challengerColor,
  ];
  let pushColor = findColor.findIndex(v => {
    return v >= 0;
  });
  function coloring(pushColor) {
    switch (pushColor) {
      case 0:
        return '#eeeeee'; //아이안
      case 1:
        return '#774937'; //브론즈
      case 2:
        return '#b0bec1'; //실버
      case 3:
        return '#d2b54f'; //골드
      case 4:
        return '#7ead97'; //플레티넘
      case 5:
        return '#9ac5db'; //다이아
      case 6:
        return '#770000'; //마스터
      case 7:
        return '#770000'; //그마
      case 8:
        return '#770000'; //챌린저
      default:
        return '색을 찾지 못했어요';
    }
  }
  return coloring(pushColor);
};

export default setRankColor;
