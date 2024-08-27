/* eslint-disable react/display-name */
import { Children, ReactNode } from 'react';

export const ShowCode = (props: any) => {
  let when = null as any;
  let otherwise = null;
  Children.forEach(props.children, (children) => {
    if (children.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && children.props.isTrue) {
      when = children;
    }
  });
  return when || otherwise;
};

ShowCode.When = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: ReactNode;
}): any => (isTrue ? <>{children}</> : <></>);

ShowCode.Else = ({ render, children }: { render?: any; children: ReactNode }) =>
  render || children;
