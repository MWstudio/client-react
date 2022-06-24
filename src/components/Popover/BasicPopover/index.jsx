import React from 'react';
import { Button } from '@material-ui/core';
import setPositionImage from 'utils/setPositionImage';
import setRankImage from 'utils/setRankImage';
import {
  RowFlexDiv,
  ColumnFlexDiv,
  UserPopover,
  SiteProfile,
  GameProfile,
  GamProfileHeader,
  GameNickname,
  GameRank,
  GameRecent,
} from './styles';

const BasicPopover = props => {
  let userPop = props.userPop;
  return (
    <UserPopover
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <SiteProfile>
        <ColumnFlexDiv className="header">
          <RowFlexDiv className="nicknames">
            <div className="items1">
              <img
                src="https://icon-library.com/images/discord-icon-png/discord-icon-png-28.jpg"
                alt="임시 이미지"
              />
            </div>
            <ColumnFlexDiv className="items2">
              <h4>{userPop.nickname} </h4>
              <div className="mannerlv">
                <div className="currentlv"></div>
              </div>
            </ColumnFlexDiv>
            <div className="items3">
              <div>
                <Button color="primary" variant="contained">
                  팔로우
                </Button>
              </div>
              <div>
                <img
                  src="https://s3.amazonaws.com/pics.freeicons.io/uploads/icons/png/15378291991558965373-512.png"
                  alt="DM"
                />
              </div>
              <div>
                <img
                  src="https://static.thenounproject.com/png/585197-200.png"
                  alt="More"
                />
              </div>
            </div>
          </RowFlexDiv>
          <RowFlexDiv className="currentFollow">
            <div>
              <strong>{userPop.following}</strong> 팔로잉
            </div>
            <div>
              <strong>{userPop.follower}</strong> 팔로워
            </div>
          </RowFlexDiv>
        </ColumnFlexDiv>
        <RowFlexDiv className="personality">
          <div>INFP</div>
          <div>이명박</div>
        </RowFlexDiv>
        <div>{userPop.description}</div>
      </SiteProfile>
      <GameProfile>
        <GamProfileHeader>
          <img
            src={
              'http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/' +
              userPop.icon +
              '.png'
            }
            alt={userPop.mostPosition}
          />
          <GameNickname>
            <div className="Server">KR</div>
            <div className="Nickname">{userPop.gamecharacter}</div>
            <div className="Lv">Lv.{userPop.Lv}</div>
          </GameNickname>
        </GamProfileHeader>
        <GameRank>
          <div className="rank">
            <div className="header">솔로랭크</div>
            <div className="rankImage">
              <img
                src={setRankImage(userPop.solorank)}
                alt={userPop.solorank}
              />
            </div>
            <div>{userPop.solorank}</div>
          </div>
          <div className="rank">
            <div className="header">자유랭크 </div>
            <div className="rankImage">
              <img
                src={setRankImage(userPop.teamrank)}
                alt={userPop.teamrank}
              />
            </div>
            <div>{userPop.teamrank}</div>
          </div>
        </GameRank>
        <GameRecent>
          <div className="header"> 최근 전적 </div>
          <RowFlexDiv className="summary">
            <ColumnFlexDiv>
              <div className="big">승률68%</div>
              <div>13승7패</div>
            </ColumnFlexDiv>
            <ColumnFlexDiv>
              <div className="big">2,28</div>
              <div>7.4/7.5/9.7</div>
            </ColumnFlexDiv>
          </RowFlexDiv>
          <RowFlexDiv className="mostChamps">
            {userPop.mostChampions &&
              userPop.mostChampions.map(champion => {
                return (
                  <RowFlexDiv className="champ">
                    <img
                      src={
                        'http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png'
                      }
                      alt="이미지"
                    />{' '}
                    <div>
                      <div>{champion.point}</div>
                      <div className="winRate">
                        {champion.win}승{champion.lose}패 ({champion.winrate}%)
                      </div>
                    </div>
                  </RowFlexDiv>
                );
              })}
            {/* <RowFlexDiv className="champ">
              <img
                src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png"
                alt="이미지"
              />{' '}
              <div>
                <div>2.37</div>
                <div className="winRate">12승7패 (63%)</div>
              </div>
            </RowFlexDiv>
            <RowFlexDiv className="champ">
              <img
                src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Blitzcrank.png"
                alt="이미지"
              />{' '}
              <div>
                <div>1.60</div>
                <div className="winRate">0승1패 (0%)</div>
              </div>
            </RowFlexDiv>
            <RowFlexDiv className="champ">
              <img
                src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Blitzcrank.png"
                alt="이미지"
              />{' '}
              <div>
                <div>1.60</div>
                <div className="winRate">0승1패 (0%)</div>
              </div>
            </RowFlexDiv> */}
          </RowFlexDiv>
          <ColumnFlexDiv className="detail">
            <RowFlexDiv className="mother lose">
              <div>
                <img
                  src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png"
                  alt="이미지"
                />
              </div>
              <div>3.50</div>
              <div>19/8/9</div>
              <div>2일 전</div>
            </RowFlexDiv>
            <RowFlexDiv className="mother win">
              <div>
                <img
                  src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png"
                  alt="이미지"
                />
              </div>
              <div>2.80</div>
              <div>4/5/10</div>
              <div>2일 전</div>
            </RowFlexDiv>
            <RowFlexDiv className="mother win">
              <div>
                <img
                  src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png"
                  alt="이미지"
                />
              </div>
              <div>4.86</div>
              <div>19/7/5</div>
              <div>2일 전</div>
            </RowFlexDiv>
            <RowFlexDiv className="mother win">
              <div>
                <img
                  src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png"
                  alt="이미지"
                />
              </div>
              <div>4.75</div>
              <div>11/4/8</div>
              <div>2일 전</div>
            </RowFlexDiv>
            <RowFlexDiv className="mother win">
              <div>
                <img
                  src="http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/Heimerdinger.png"
                  alt="이미지"
                />
              </div>
              <div>4.50</div>
              <div>8/4/10</div>
              <div>24일 전</div>
            </RowFlexDiv>
          </ColumnFlexDiv>
        </GameRecent>
      </GameProfile>
    </UserPopover>
  );
};

export default BasicPopover;
