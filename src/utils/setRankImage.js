import tier from '../pages/Matching/TierData';
import Iron from 'assets/images/Game/LoL/Rank/Iron.png';
import Bronze from 'assets/images/Game/LoL/Rank/Bronze.png';
import Silver from 'assets/images/Game/LoL/Rank/Silver.png';
import Gold from 'assets/images/Game/LoL/Rank/Gold.png';
import Platinum from 'assets/images/Game/LoL/Rank/Platinum.png';
import Diamond from 'assets/images/Game/LoL/Rank/Diamond.png';
import Master from 'assets/images/Game/LoL/Rank/Master.png';
import Grandmaster from 'assets/images/Game/LoL/Rank/Grandmaster.png';
import Challenger from 'assets/images/Game/LoL/Rank/Challenger.png';
import Default from 'assets/images/character.png';

const setRankImage = rank => {
  let ironImage = tier.iron.findIndex(v => {
    return v === rank;
  });
  let bronzeImage = tier.bronze.findIndex(v => {
    return v === rank;
  });
  let silverImage = tier.silver.findIndex(v => {
    return v === rank;
  });
  let goldImage = tier.gold.findIndex(v => {
    return v === rank;
  });
  let platinumImage = tier.platinum.findIndex(v => {
    return v === rank;
  });
  let diamondImage = tier.diamond.findIndex(v => {
    return v === rank;
  });
  let masterImage = tier.master.findIndex(v => {
    return v === rank;
  });
  let grandmasterImage = tier.grandmaster.findIndex(v => {
    return v === rank;
  });
  let challengerImage = tier.challenger.findIndex(v => {
    return v === rank;
  });

  let findImage = [
    ironImage,
    bronzeImage,
    silverImage,
    goldImage,
    platinumImage,
    diamondImage,
    masterImage,
    grandmasterImage,
    challengerImage,
  ];
  let pushImage = findImage.findIndex(v => {
    return v >= 0;
  });
  function adressing(pushImage) {
    switch (pushImage) {
      case 0:
        return Iron; //아이안
      case 1:
        return Bronze; //브론즈
      case 2:
        return Silver; //실버
      case 3:
        return Gold; //골드
      case 4:
        return Platinum; //플레티넘
      case 5:
        return Diamond; //다이아
      case 6:
        return Master; //마스터
      case 7:
        return Grandmaster; //그마
      case 8:
        return Challenger; //챌린저
      default:
        return Default;
    }
  }
  return adressing(pushImage);
};

export default setRankImage;
