import * as React from "react";
interface TooltipWrapperProps {
    hasArrow?: boolean;
    label: string;
    children: React.ReactElement;
    placement?: "top" | "right" | "bottom" | "left";
}
/**
 * Wrap children with a tooltip
 */
export declare function TooltipWrapper(props: TooltipWrapperProps): React.JSX.Element;
export {};
