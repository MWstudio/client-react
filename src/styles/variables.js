import styled from 'styled-components';

// Colors
export const primaryColor = '#ff5a5e';
export const primaryDarkColor = '#b61827';
export const primaryLightColor = '#ff867c';
export const blackColor = '#424242';
export const whiteColor = '#f5f5f5';

// Z-Indexes
export const Zindex = {
  headerZindex: 10,
  footerZindex: 5,
  dropdownMenuZindex: 6,
  modalSpace: 100,
};

// Media Query

export const size = {
  MobileLandScape: '480px',
  TabletPortrait: '768px',
  TabletLandScape: '992px',
  LapTops: '1280px',
};

export const device = {
  MobileLandScape: `(min-width : ${size.MobileLandScape})`,
  TabletPortrait: `(min-width : ${size.TabletPortrait})`,
  TabletLandScape: `(min-width : ${size.TabletLandScape})`,
  LapTops: `(min-width : ${size.LapTops})`,
};
