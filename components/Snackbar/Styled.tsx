import styled from 'styled-components';
import MaterialButton from '@material-ui/core/Button';
import MaterialSnackbar from '@material-ui/core/Snackbar';

export const Button = styled(MaterialButton)`
  font-size: 16px;
  text-transform: capitalize;
`;

export const Snackbar = styled(MaterialSnackbar)`
  & > div {
    background-color: ${(props): string => props.theme.colors.gray.lightest};
  }

  & > div > div {
    font-size: 16px;
  }

  & > div > div > button > span > svg {
    font-size: 20px;
  }
`;
