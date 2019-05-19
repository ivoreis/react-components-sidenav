import styled from 'styled-components';

export const Bar = styled.span<{ isExpanded: boolean }>`
  display: block;
  width: 20px;
  height: 2px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 1px;
  transition: all 0.15s;
  opacity: 0.7;

  & + & {
    margin-top: 4px;
  }

  ${p =>
    p.isExpanded &&
    `
      width: 25px;
      &:nth-child(1) {
        transform: rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        margin-top: -8px;
        transform: rotate(-45deg);
      }
  `}
`;

export const ToggleButton = styled.button`
  position: relative;
  float: left;
  width: 64px;
  height: 64px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  background-image: none;
  border: 0;
  border-radius: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
