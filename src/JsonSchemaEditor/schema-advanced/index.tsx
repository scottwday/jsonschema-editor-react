import * as React from "react";
import { AdvancedString } from "../advanced-string";
import { AdvancedNumber } from "../advanced-number";
import { AdvancedBoolean } from "../advanced-boolean";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { State, useHookstate } from "@hookstate/core";
import { Form } from "react-bootstrap";

export interface AdvancedSettingsProps {
  itemStateProp: State<JSONSchema7>;
}

export const AdvancedSettings: React.FunctionComponent<
  AdvancedSettingsProps
> = (props: React.PropsWithChildren<AdvancedSettingsProps>) => {
  const itemState = useHookstate(props.itemStateProp);

  const getAdvancedView = (
    item: State<JSONSchema7>,
  ): JSX.Element | undefined => {
    switch (itemState.type.value) {
      case "string":
        return <AdvancedString itemStateProp={item} />;
      case "number":
      case "integer":
        return <AdvancedNumber itemStateProp={item} />;
      case "boolean":
        return <AdvancedBoolean itemStateProp={item} />;
      default:
        return <div>No settings to show</div>;
    }
  };

  return <Form>{getAdvancedView(itemState)}</Form>;
};
