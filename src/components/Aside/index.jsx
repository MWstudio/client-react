import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { device } from 'styles/variables';
import { Container } from './styles';

const Aside = ({ children }) => {
  const widthOverTabletLandScape = useMediaQuery({
    query: `${device.TabletLandScape}`,
  });

  return (
    <Container widthOverTabletLandScape={widthOverTabletLandScape}>
      {children}
    </Container>
  );
};

export default Aside;
