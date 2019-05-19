import {
  ReactNode,
  ReactType,
  MouseEventHandler,
  ReactEventHandler,
  SyntheticEvent,
} from 'react';

export interface NavItemProps {
  componentType: ReactNode;
  componentClass: ReactType;
  isActive: boolean;
  isDisabled: boolean;
  isExpanded: boolean;
  isExpandable: boolean;
  isHighlighted: boolean;
  selectedEventKey: string;
  hasSubNav: boolean;
  eventKey: string;
  navitemClassName: string;
  subnavClassName: string;
  navitemStyle: object;
  subnavStyle: object;
  className?: string;
  onClick: (event: MouseEventHandler & SyntheticEvent) => any;
  onSelect: (
    eventKey: string,
    event: ReactEventHandler & SyntheticEvent,
  ) => any;
}
