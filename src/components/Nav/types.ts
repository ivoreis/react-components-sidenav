import { ReactNode, ReactType, ReactEventHandler, SyntheticEvent } from 'react';

export interface NavProps {
  componentType: ReactNode;
  componentClass: ReactType;
  defaultSelectedEventKey: string;
  selectedEventKey: string;
  isDisabled: boolean;
  isHighlighted: boolean;
  isExpandable: boolean;
  isExpanded: boolean;
  className?: string;
  children?: any[];
  onSelect: (
    eventKey: string,
    event: ReactEventHandler & SyntheticEvent,
  ) => any;
}
