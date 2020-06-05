import styled from 'styled-components';

export const OuterContainer = styled.div<{notClickable?: boolean}>`
  width: 100%;
  display: flex;
  height: 100px;
  justify-content: space-between;
  padding: 10px 0;
  cursor: ${(props): string => (!props.notClickable ? 'pointer' : 'default')};

  &:hover {
    background-color: ${(props): string => (!props.notClickable ? props.theme.colors.gray.lightest : 'inherit')};
  }
`;

export const LeftSection = styled.div`
  height: 100%;
  max-width: 70%;
  display: flex;
`;

export const RightSection = styled.div`
  height: 100%;
  max-width: 30%;
`;

export const ImageSection = styled.div`
  height: 100%;
`;

export const TitleSection = styled.div`
  height: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Img = styled.img`
  height: 100%;
`;

export const Name = styled.p`
  margin: 0 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-left: 10px;
  font-size: 1rem;
  font-family: "Proxima Bold", Georgia, sans-serif;
  color: ${(props): string => props.theme.colors.white.light};
`;

export const NumberOfTracks = styled.p`
  margin: 0 0;
  padding-left: 10px;
  font-size: 0.7rem;
  color: ${(props): string => props.theme.colors.white.evenDarker};
`;