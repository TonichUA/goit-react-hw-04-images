import React from 'react';
import { ButtonLoad } from './ButtonStyleds';

const Button = ({ onLoadMore, show }) => {
  return show ? (
    <ButtonLoad className="Button" onClick={onLoadMore}>
      Load more
    </ButtonLoad>
  ) : null;
};

export { Button };
