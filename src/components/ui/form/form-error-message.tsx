import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export type FormErrorMessageProps = {
  className?: string;
};

export const FormErrorMessage: FC<PropsWithChildren<FormErrorMessageProps>> = ({
  children,
  className,
}) => {
  return (
    <p
      className={classNames(
        "font-serif text-sm text-left block text-red-600",
        className
      )}
    >
      {children}
    </p>
  );
};
