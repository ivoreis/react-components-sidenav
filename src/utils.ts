import React, { ReactNode, FunctionComponent } from 'react';

export const chainedFunction = (...funcs: any[]) => {
  return funcs
    .filter(func => typeof func === 'function')
    .reduce((accumulator, func) => {
      if (accumulator === null) {
        return func;
      }
      return (...args: any) =>
        // @ts-ignore
        accumulator.apply(this, args) && func.apply(this, args);
    }, null);
};

export const findComponent = <T>(component: FunctionComponent<T>) => (
  children: ReactNode,
) => {
  const matchComponent = match(component);

  return React.Children.toArray(children).reduce((found, next) => {
    if (found === null && next !== null && matchComponent(next)) {
      return next;
    }
    return found;
  }, null);
};

export const match = <T>(Component: FunctionComponent<T>) => (c: any) => {
  // React Component
  if (c.type === Component) {
    return true;
  }

  // Matching componentType for SideNav, Nav, NavItem, NavIcon, NavText
  if (c.props && c.props.componentType === Component) {
    return true;
  }

  return false;
};
