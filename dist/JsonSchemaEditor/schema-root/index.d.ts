import * as React from "react";
import { State } from "@hookstate/core";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { FlexProps } from "../utils";
export interface SchemaArrayProps extends FlexProps {
    schemaState: State<JSONSchema7>;
    onSchemaChange?: (results: string) => void;
    isReadOnly: State<boolean>;
}
export declare const SchemaRoot: React.FunctionComponent<SchemaArrayProps>;
