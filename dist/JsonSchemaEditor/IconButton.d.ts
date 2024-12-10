import * as React from "react";
interface IconButtonProps {
    icon: React.ReactElement;
    size?: "sm" | "lg";
    children?: React.ReactNode;
    isDisabled?: boolean;
    variant?: string;
    className?: string;
    onClick?: () => void;
    colorScheme?: string;
    /** Deprecated */
    fontSize?: string;
    /** Deprecated */
    isRound?: boolean;
}
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
export {};
