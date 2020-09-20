import React from "react";
import { width, WidthProps } from "styled-system";
import { css, styled, Theme } from "./theme";

export type ButtonStyleProps = {
  size: "medium";
  variant: "primary";
  theme: Theme;
} & WidthProps<Theme, number | string>;

const sizeStyles = ({ size }: ButtonStyleProps) => {
  switch (size) {
    case "medium":
      return css`
        height: 48px;
      `;
    default:
      return "";
  }
};

const variantStyles = ({ variant }: ButtonStyleProps) => {
  switch (variant) {
    case "primary":
      return css`
        background: ${(p) => p.theme.colors.primary};
        color: ${(p) => p.theme.colors.onPrimary};
      `;
    default:
      return "";
  }
};

const ButtonStyles = styled("button")<ButtonStyleProps>`
  min-width: 108px;
  cursor: pointer;
  ${width}
  ${sizeStyles}
  ${variantStyles}
`;

type ButtonProps = React.FC<
  Omit<ButtonStyleProps, "theme"> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export const Button: ButtonProps = ({ children, ...rest }) => (
  <ButtonStyles {...rest}>{children}</ButtonStyles>
);
Button.defaultProps = {
  type: "button",
};
