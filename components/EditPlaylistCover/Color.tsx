import React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { ChromePicker } from 'react-color';
import { colors } from '../../configs/theme';

interface Props {
  currentColor: string;
  index?: number;
  setCurrentColor: (color: string, index?: number) => void;
  disabled?: boolean;
}

interface AddOrRemoveColorProps {
  addOrRemove: 'add' | 'remove';
  handler: () => void;
}

const AddOrRemoveButtonStyled = styled.button`
  display: block;
  /* Remove all styles */
  background: none;
  font: inherit;
  outline: inherit;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: white solid 2px;
`;

export const AddOrRemoveButton: React.FC<AddOrRemoveColorProps> = ({
  addOrRemove, handler,
}) => (
  <AddOrRemoveButtonStyled
    type="button"
    onClick={handler}
  >
    {
      addOrRemove === 'add' ? '+' : '-'
    }
  </AddOrRemoveButtonStyled>
);

const ColorButton = styled.button<{ currentColor: string }>`
  display: block;
  position: relative;
  /* Remove all styles */
  background: none;
  border: none;
  font: inherit;
  outline: inherit;

  width: 40px;
  height: 40px;
  border-radius: 0;
  background-color: ${(props): string => props.currentColor};
  cursor: pointer;
`;

const DisableColorPicker = styled.span`
  position:absolute;
  top: 0;
  left: 0;
  transform: rotate(45deg);
  transform-origin: 0% 0%;
  height: 1px;
  background-color: red;
  /* Pythagoras bitch */ 
  width:56.57px;
`;

const Component: React.FC<Props> = ({
  currentColor, setCurrentColor, index, disabled,
}) => {
  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);
  return (
    <div style={{
      width: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      marginRight: '30px',
    }}
    >
      <Modal
        // Can't add aria labels because the properties contain "-"
        open={colorPickerVisible}
        onClose={(): void => setColorPickerVisible(false)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: '40px',
        }}
        BackdropProps={{ invisible: true }}
      >
        <ChromePicker
          styles={{
            default: {
              picker: {
                width: '320px',
              },
            },
          }}
          color={currentColor}
          onChangeComplete={(color): void => setCurrentColor(color.hex, index)}
        />
      </Modal>
      <ColorButton
        onClick={(): void => setColorPickerVisible(!colorPickerVisible)}
        type="button"
        currentColor={currentColor}
        disabled={disabled}
      >
        {disabled && <DisableColorPicker />}
      </ColorButton>
      {
        typeof index === 'number' ? (
          <p style={{
            color: colors.white.dark,
            fontSize: '14px',
            textTransform: 'capitalize',
          }}
          >
            {`Color ${index + 1}`}
          </p>
        ) : null
      }
    </div>
  );
};

export default Component;
