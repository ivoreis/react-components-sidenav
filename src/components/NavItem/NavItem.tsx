import React, {
  FunctionComponent,
  ReactEventHandler,
  SyntheticEvent,
  cloneElement,
} from 'react';
import styled from 'styled-components';
import { match, chainedFunction, findComponent } from '../../utils';
import { NavIcon } from '../NavIcon';
import { NavText } from '../NavText';

import {
  SubNavWrapper,
  NavCategoryWrapper,
  NavIconWrapper,
  NavTextWrapper,
  NavItemWrapper,
} from './components';

import { NavItemProps } from './types';

const noop = () => {};

const BaseComponentClass = styled.div<{
  isSelected: boolean;
  isDisabled: boolean;
  isHighlighted: boolean;
  isExpandable: boolean;
  isExpanded: boolean;
}>``;

export const NavItem: FunctionComponent<NavItemProps> = props => {
  const {
    componentClass: Component,
    isActive,
    isDisabled,
    isExpanded,
    selectedEventKey,
    onClick,
    onSelect,
    hasSubNav,
    children,
  } = props;

  const navIcon = findNavIcon(children) as NavIcon;
  const navText = findNavText(children) as NavText;

  const navIconProps = navIcon ? { ...navIcon.props } : {};
  const navTextProps = navText ? { ...navText.props } : {};

  const handleSelect = (event: ReactEventHandler & SyntheticEvent) => {
    const { isDisabled, onSelect, eventKey } = props;

    if (isDisabled) {
      event.preventDefault();
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  };

  if (hasSubNav) {
    const isNavItemSelected =
      isActive || (!!selectedEventKey && selectedEventKey === props.eventKey);

    return (
      <Component
        role="presentation"
        isDisabled={isDisabled}
        isSelected={isNavItemSelected}
      >
        <SubNavWrapper
          isDisabled={isDisabled}
          role="menuitem"
          tabIndex={-1}
          onClick={chainedFunction(onClick, handleSelect)}
        >
          {navIcon && <NavIconWrapper {...navIconProps} />}
          {navText && <NavTextWrapper {...navTextProps} />}
        </SubNavWrapper>
      </Component>
    );
  }

  const activeNavItems = [];
  const navItems = React.Children.toArray(children)
    .filter(child => React.isValidElement(child) && isNavItem(child))
    .map((child: any) => {
      const isChildActive =
        child.props.active ||
        (!!selectedEventKey && selectedEventKey === child.props.eventKey);

      if (isChildActive) {
        activeNavItems.push(child);
      }

      return cloneElement(child, {
        hasSubNav: true,
        selectedEventKey,
        onSelect: chainedFunction(child.props.onSelect, onSelect),
      });
    });

  const others = React.Children.toArray(children).filter(child =>
    React.isValidElement(child) &&
    (isNavIcon(child) || isNavText(child) || isNavItem(child))
      ? false
      : true,
  );

  const isNavItemSelected =
    isActive ||
    (!!selectedEventKey && selectedEventKey === props.eventKey) ||
    activeNavItems.length > 0;
  const isNavItemExpandable = navItems.length > 0;
  const isNavItemExpanded = isNavItemExpandable && isExpanded;
  const isNavItemHighlighted = isNavItemExpanded || isNavItemSelected;

  return (
    <Component
      role="presentation"
      isSelected={isNavItemSelected}
      isHighlighted={isNavItemHighlighted}
      isExpandable={isNavItemExpandable}
      isExpanded={isNavItemExpanded}
      isDisabled={isDisabled}
    >
      <NavCategoryWrapper
        isDisabled={isDisabled}
        role="menuitem"
        tabIndex={-1}
        onClick={chainedFunction(
          onClick,
          navItems.length === 0 ? handleSelect : noop,
        )}
      >
        {navIcon && <NavIconWrapper {...navIconProps} />}
        {navText && <NavTextWrapper {...navTextProps} />}
        {others}
      </NavCategoryWrapper>

      {navItems.length > 0 && (
        <NavItemWrapper role="menu">
          <Component
            role="heading"
            isHighlighted={isActive}
            isDisabled={isDisabled}
          >
            {navText && navText.props ? navText.props.children : null}
          </Component>
          {navItems}
        </NavItemWrapper>
      )}
    </Component>
  );
};

const findNavIcon = findComponent(NavIcon);
const findNavText = findComponent(NavText);
const isNavItem = match(NavItem);
const isNavIcon = match(NavIcon);
const isNavText = match(NavText);

NavItem.defaultProps = {
  componentType: NavItem,
  componentClass: BaseComponentClass,
  isActive: false,
  isDisabled: false,
  isExpanded: false,
};
