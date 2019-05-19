import React, { cloneElement, FunctionComponent } from 'react';
import styled from 'styled-components';
import { Nav, Toggle, NavItem, NavIcon, NavText, NavProps } from '../../';
import { match, chainedFunction } from '../../utils';
import { SideNavProps, StaticComponents } from './types';
import { ToggleProps } from '../Toggle';

const BaseComponentClass = styled.nav<{
  isDisabled: boolean;
  isExpanded: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1006;
  min-width: 64px;
  background: #db3d44;
  -webkit-transition: min-width 0.15s;
  -moz-transition: min-width 0.15s;
  -o-transition: min-width 0.15s;
  -ms-transition: min-width 0.15s;
  transition: min-width 0.15s;

  ${p =>
    p.isExpanded &&
    `
  min-width: 240px;`}
`;

export const SideNav: FunctionComponent<SideNavProps> &
  StaticComponents = props => {
  const isToggle = match(Toggle);
  const isNav = match(Nav);
  const {
    componentClass: Component,
    isDisabled,
    isExpanded,
    onToggle,
    onSelect,
    className,
    children,
  } = props;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    toggleExpanded();
  };

  const toggleExpanded = () => onToggle && onToggle(!isExpanded);

  const renderToggle = (child: Toggle, props: ToggleProps) => {
    // let ref = c => {
    //   this.child.toggle = c;
    // };

    // if (typeof child.ref === 'string') {
    //     warning(
    //         false,
    //         'String refs are not supported on `<SideNav.Toggle>` component. ' +
    //         'To apply a ref to the component use the callback signature:\n\n ' +
    //         'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
    //     );
    // } else {
    //     ref = chainedFunction(child.ref, ref);
    // }
    return cloneElement(child, {
      ...props,
      ref: (node: any) => {
        // Keep your own reference
        // @ts-ignore
        this._input = node;
        // Call the original ref, if any
        const { ref } = child;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref !== null) {
          ref.current = node;
        }
      },
      onClick: chainedFunction(child.props.onClick, handleClick),
    });
  };

  const renderNav = (child: Nav, { onSelect, ...props }: NavProps) =>
    cloneElement(child, {
      ...props,
      onSelect: chainedFunction(child.props.onSelect, onSelect),
    });

  return (
    <Component
      isDisabled={isDisabled}
      isExpanded={isExpanded}
      className={className}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (isToggle(child)) {
          return renderToggle(child as Toggle, {
            ...(child as Toggle).props,
            isDisabled,
            isExpanded,
          });
        }

        if (isNav(child)) {
          return renderNav(child as Nav, {
            ...(child as Nav).props,
            onSelect,
            isExpanded,
          });
        }

        return child;
      })}
    </Component>
  );
};

SideNav.defaultProps = {
  componentType: SideNav,
  componentClass: BaseComponentClass,
};

SideNav.Toggle = Toggle;
SideNav.Nav = Nav;
SideNav.NavItem = NavItem;
SideNav.NavIcon = NavIcon;
SideNav.NavText = NavText;
