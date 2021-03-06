import styled from "styled-components";
import {
  bgButtonAdmin,
  bgHoverButtonAdmin,
} from "../../../utilsStyles/utilsColors";

export const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor || "#16bcdc"};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ radius }) => radius || "4px"};
  color: ${({ color }) => color || "#fff"};
  font-family: ${({ fontFamily }) => fontFamily || " sans-serif"};
  font-size: ${({ fontSize }) => fontSize || "1.3rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "bold"};
  padding: ${({ padding }) => padding || "5px"};
  text-transform: ${({ textTransform }) => textTransform || "uppercase"};
  width: ${({ width }) => width || "10rem"};
  height: ${({ height }) => height || "auto"};
  margin: ${({ margin }) => margin || "auto"};
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor || "#0695B1"};
    color: ${({ hoverColor }) => hoverColor || "#fff"};
    border: ${({ hoverBorder }) => hoverBorder || "none"};
  }
  cursor: pointer;
  transition: all 0.3s ease;
  line-height: 1;
`;

export const ButtonAdmin = styled(Button)`
  background-color: ${bgButtonAdmin};
  &:hover {
    background-color: ${bgHoverButtonAdmin};
  }
  width: ${({ width }) => width || "150px"};
  margin: ${({ margin }) => margin || "0 "};
  font-size: inherit;
  font-family: Rubik;
  border-radius: 0;
  padding: 8px;
`;
