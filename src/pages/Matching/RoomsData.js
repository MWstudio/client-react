import users from './UsersData';

var room0 = {
  id: 0,
  title: '방제목0',
  userlist: [users[1], users[0]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};
var room1 = {
  id: 1,
  title: '방제목1',
  userlist: [users[0], users[1], users[2], users[3]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};
var room2 = {
  id: 2,
  title: '방제목2',
  userlist: [users[1], users[3], users[4]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};
var room3 = {
  id: 3,
  title: '방제목3',
  userlist: [users[0], users[1], users[2], users[3], users[4]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};
var room4 = {
  id: 4,
  title: '방제목4',
  userlist: [users[1], users[4], users[2]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};
var room5 = {
  id: 5,
  title: '방제목5',
  userlist: [users[4], users[2], users[0], users[3]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};
var room6 = {
  id: 6,
  title: '방제목6',
  userlist: [users[0], users[1], users[2], users[3], users[4]],
  game: '리그 오브 레전드',
  detail1: '개인/2인 랭크',
  capacity: 5,
  mic: '상관없음',
};

var roomsdata = [room0, room1, room2, room3, room4, room5, room6];

export default roomsdata;
