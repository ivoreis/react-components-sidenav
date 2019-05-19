import React, { FunctionComponent } from 'react';
import { ToggleProps } from './types';
import { Bar, ToggleButton } from './components';

export const Toggle: FunctionComponent<ToggleProps> = props => {
  const { componentClass, children, isExpanded } = props;
  return (
    <ToggleButton as={componentClass} role="button" aria-expanded={isExpanded}>
      <Bar isExpanded={isExpanded} />
      <Bar isExpanded={isExpanded} />
      <Bar isExpanded={isExpanded} />
      {children}
    </ToggleButton>
  );
};

Toggle.defaultProps = {
  componentType: Toggle,
  componentClass: 'button',
  isDisabled: false,
  isExpanded: false,
};
