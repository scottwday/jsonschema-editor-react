import * as React from "react";
import { State } from "@hookstate/core";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { FlexProps } from "../utils";
export interface SchemaItemProps extends FlexProps {
    required: string[];
    itemStateProp: State<JSONSchema7>;
    parentStateProp: State<JSONSchema7>;
    name: string;
    isReadOnly: State<boolean>;
    showadvanced: (item: string) => void;
}
export declare const SchemaItem: React.FunctionComponent<SchemaItemProps>;
