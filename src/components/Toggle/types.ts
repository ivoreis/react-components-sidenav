import { ReactNode, ReactType } from 'react';

export interface ToggleProps {
  componentType: ReactNode;
  componentClass: ReactType;
  isDisabled: boolean;
  isHighlighted: boolean;
  isExpandable: boolean;
  isExpanded: boolean;
}
