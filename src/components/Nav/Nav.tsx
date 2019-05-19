import React, {
  cloneElement,
  FunctionComponent,
  useState,
  ReactElement,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import { NavItem } from '../../';
import { match, chainedFunction } from '../../utils';
import { NavProps } from './types';
import { NavItemProps } from '../NavItem';

const noop = () => {};
const BaseComponentClass = styled.div<{
  isExpandable: boolean;
}>`
  float: left;
  padding: 0;
  margin: 0;
  clear: both;
  list-style: none;
  width: 100%;
`;

export const Nav: FunctionComponent<NavProps> = props => {
  const {
    componentClass: Component,
    onSelect,
    isExpanded,
    className,
    children,
  } = props;

  const isNavItem = match(NavItem);
  const [expandedEventKey, setExpandedEventKey] = useState('');
  const [selectedEventKey, setSelectedEventKey] = useState(
    props.selectedEventKey,
  );
  const [defaultSelectedEventKey] = useState(props.defaultSelectedEventKey);
  const currentSelectedEventKey = defaultSelectedEventKey
    ? defaultSelectedEventKey
    : selectedEventKey;

  const handleClickOnExpanded = (eventKey: string) =>
    isExpanded &&
    setExpandedEventKey(expandedEventKey !== eventKey ? eventKey : '');

  const renderNavItem = (
    child: ReactElement<NavItemProps>,
    { onSelect, ...props }: Partial<NavItemProps>,
  ) => {
    const { eventKey } = { ...child.props };

    return cloneElement(child, {
      ...props,
      onClick: chainedFunction(child.props.onClick, () => {
        handleClickOnExpanded(eventKey);
      }),
      onSelect: chainedFunction(
        defaultSelectedEventKey
          ? (selectedEventKey: string) => setSelectedEventKey(selectedEventKey)
          : noop,
        child.props.onSelect,
        onSelect,
      ),
    });
  };

  return (
    <Component role="menu" isExpanded={isExpanded} className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && isNavItem(child)) {
          const typedChild = child as ReactElement<NavItemProps>;
          return renderNavItem(typedChild, {
            onSelect,
            selectedEventKey: currentSelectedEventKey,
            isExpanded:
              !!typedChild.props.isExpanded ||
              (isExpanded &&
                !!expandedEventKey &&
                expandedEventKey === typedChild.props.eventKey),
          });
        }
        return child;
      })}
    </Component>
  );
};

Nav.defaultProps = {
  componentClass: BaseComponentClass,
  componentType: Nav,
};
