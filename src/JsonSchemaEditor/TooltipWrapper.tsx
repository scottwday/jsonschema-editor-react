import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface TooltipWrapperProps {
  hasArrow?: boolean;
  label: string;
  children: React.ReactElement;
  placement?: "top" | "right" | "bottom" | "left";
}

/**
 * Wrap children with a tooltip
 */
export function TooltipWrapper(props: TooltipWrapperProps) {
  return (
    <OverlayTrigger
      placement={props.placement}
      overlay={<Tooltip>{props.label}</Tooltip>}
    >
      <div>{props.children}</div>
    </OverlayTrigger>
  );
}
