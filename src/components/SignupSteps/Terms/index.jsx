import React, { useState } from 'react';
import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const Terms = ({ activeStep, handleBack, handleNext }) => {
  const [termsCheck, setTermsCheck] = useState({
    checkA: false,
    checkB: false,
    checkC: false,
  });

  const handleCheck = e => {
    setTermsCheck({ ...termsCheck, [e.target.name]: e.target.checked });
  };

  const handleAllCheck = e => {
    setTermsCheck({
      checkA: !termsCheck.checkA,
      checkB: !termsCheck.checkB,
      checkC: !termsCheck.checkC,
    });
  };

  // termsCheck가 다 true이면 true
  const allChecked = Object.values(termsCheck).every(item => item === true);

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={allChecked}
              onChange={handleAllCheck}
              name="all"
            />
          }
          label="All"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsCheck.checkA}
              onChange={handleCheck}
              name="checkA"
            />
          }
          label="First"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsCheck.checkB}
              onChange={handleCheck}
              name="checkB"
            />
          }
          label="Second"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsCheck.checkC}
              onChange={handleCheck}
              name="checkC"
            />
          }
          label="Third"
        ></FormControlLabel>
      </FormGroup>
      <div>다음의 약관을 모두 동의하여라.</div>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button disabled={!allChecked} onClick={handleNext}>
        {activeStep === 2 ? 'Finish' : 'Next'}
      </Button>
    </>
  );
};

export default Terms;
