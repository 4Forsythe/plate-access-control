import React from 'react';
import { Button, type ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  timeout?: number;
  confirmText?: string;
}

export const ConfirmButton: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  timeout = 5,
  confirmText = 'Подтвердить',
  onClick,
  ...rest
}) => {
  const [timer, setTimer] = React.useState(timeout);
  const [isConfirming, setIsConfirming] = React.useState(false);

  React.useEffect(() => {
    if (!isConfirming) return;

    if (timer === 0) {
      setIsConfirming(false);
      setTimer(timeout);
      return;
    }

    const interval = setInterval(() => setTimer((time) => time - 1), 1000);

    return () => clearInterval(interval);
  }, [timer, isConfirming]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      onClick?.(event);
      setIsConfirming(false);
      setTimer(timeout);
    }
  };

  return (
    <Button
      variant={isConfirming ? 'contained' : 'outlined'}
      onClick={handleClick}
      {...rest}
    >
      {isConfirming ? `${confirmText} ${timer}` : children}
    </Button>
  );
};
