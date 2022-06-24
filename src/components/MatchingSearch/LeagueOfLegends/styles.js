import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@material-ui/core';
import styled from 'styled-components';

export const RoomSearchAccordion = styled(Accordion)`
  width: 100%;
  .Title {
    flex: 1;
  }
  .Introduction {
    flex: 2;
    color: gray;
  }
`;

export const RoomSearchAccordionSummary = styled(AccordionSummary)``;

export const RoomSearchAccordionDetails = styled(AccordionDetails)`
  width: 100%;
  .Room-Search-Form {
    width: 100%;
  }
  .map,
  .queue {
    display: flex;
    align-items: center;
    legend {
      width: 20%;
      margin: 0;
    }
    // 각 form group
    .MuiFormGroup-root {
      flex-direction: row;
    }
    // 각 label의 크기
    .MuiFormControlLabel-root {
      width: 10rem;
    }
  }
`;

export const RoomSearchAccordionActions = styled(AccordionActions)``;
