import { ButtonProps } from '@material-ui/core';

interface IButton extends ButtonProps {
  text: string | undefined | null | React.ReactNode;
  cssStyles?: React.CSSProperties;
}

export default IButton;
