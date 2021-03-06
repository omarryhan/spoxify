import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.all};
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const Title = styled.h2`
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-top: 30px;
  margin-bottom: 5px;
  margin-top: 0;
  color: ${(props): string => props.theme.colors.white.light};
  font-size: 24px;
`;

export const TrackStripeContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

export const TrackStripeSection = styled.div`
  width: 85%;
  height: 100%;
`;

export const RemoveButtonSection = styled.div`
  width: 15%;
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const RemoveButton = styled.button`
  /* Remove all styles */
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  display: block;
  padding: 0 0;
  padding-right: 3px;
  
  margin-bottom: 5px; /* Keep this equal to TrackStripe's margin bottom (15px)*/

  cursor: pointer;
  width: 100%;
  height: 100%;
  
  text-align: right;

  & > svg {
    width: 24px;
    fill: red;
  }
`;
