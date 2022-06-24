import React from 'react';
import { Button } from '@material-ui/core';

const EmailCheck = ({ activeStep, handleBack, handleNext }) => {
  return (
    <>
      <div>기입한 이메일로 링크 발송</div>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleNext}>
        {activeStep === 2 ? 'Finish' : 'Next'}
      </Button>
    </>
  );
};

export default EmailCheck;
