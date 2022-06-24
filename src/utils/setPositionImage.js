import bot from 'assets/images/Game/LoL/Position/bot.png';
import jug from 'assets/images/Game/LoL/Position/jug.png';
import mid from 'assets/images/Game/LoL/Position/mid.png';
import sup from 'assets/images/Game/LoL/Position/sup.png';
import top from 'assets/images/Game/LoL/Position/top.png';

function setPositionImage(position) {
  switch (position) {
    case 'bot':
      return bot;
    case 'jug':
      return jug;
    case 'mid':
      return mid;
    case 'sup':
      return sup;
    case 'top':
      return top;
    default:
      return;
  }
}

export default setPositionImage;
