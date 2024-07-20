import React from "react";
import { cva } from "class-variance-authority";

import { Typography } from "~/shared-components/Typography";
import { cn } from "~/utils/classnames";

const labelVariants = cva("pb-2", {
  variants: {},
});

export function Label({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      variant="regular"
      weight="semiBold"
      color="primary"
      uppercase
      className={cn(labelVariants(), className)}
      {...props}
    >
      {children}
    </Typography>
  );
}
