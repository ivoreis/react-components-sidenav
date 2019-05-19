import { ReactNode, ReactType, ReactEventHandler, SyntheticEvent } from 'react';
import { Toggle, Nav, NavIcon, NavItem, NavText } from '../../';

export interface StaticComponents {
  Toggle: Toggle;
  Nav: Nav;
  NavItem: NavItem;
  NavIcon: NavIcon;
  NavText: NavText;
}

export interface SideNavProps {
  componentType: ReactNode;
  componentClass: ReactType;
  isSelected: boolean;
  isDisabled: boolean;
  isHighlighted: boolean;
  isExpandable: boolean;
  isExpanded: boolean;
  className?: string;
  onToggle: (expanded: boolean) => any;
  onSelect: (
    eventKey: string,
    event: ReactEventHandler & SyntheticEvent,
  ) => any;
}
