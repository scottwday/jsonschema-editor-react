import * as React from "react";
import { SchemaItem } from "../schema-item";
import {
  JSONSchema7,
  JSONSchema7Definition,
} from "../../JsonSchemaEditor.types";
import { useHookstate, State } from "@hookstate/core";
import { AdvancedSettings } from "../schema-advanced";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
export interface SchemaObjectProps {
  schemaState: State<JSONSchema7>;
  isReadOnly: State<boolean>;
}

export const SchemaObject: React.FunctionComponent<SchemaObjectProps> = (
  props: React.PropsWithChildren<SchemaObjectProps>,
) => {
  const { schemaState, isReadOnly } = props;
  const schema = useHookstate(schemaState);
  const properties = useHookstate(schema.properties);

  const propertiesOrNull:
    | State<{
        [key: string]: JSONSchema7Definition;
      }>
    | undefined = properties.ornull;

  const isReadOnlyState = useHookstate(isReadOnly);

  const onCloseAdvanced = (): void => {
    localState.isAdvancedOpen.set(false);
  };

  const showadvanced = (item: string): void => {
    localState.isAdvancedOpen.set(true);
    localState.item.set(item);
  };

  //const focusRef = React.createRef<HTMLElement>();

  const localState = useHookstate({
    isAdvancedOpen: false,
    item: "",
  });

  if (!propertiesOrNull) {
    return <></>;
  } else {
    return (
      <div className="object-style m-0 px-0 pt-0 pb-2">
        {propertiesOrNull?.keys?.map((name) => {
          return (
            <SchemaItem
              key={String(name)}
              itemStateProp={
                propertiesOrNull.nested(name as string) as State<JSONSchema7>
              }
              parentStateProp={schema}
              name={name as string}
              showadvanced={showadvanced}
              required={schema.required.value as string[]}
              isReadOnly={isReadOnlyState}
            />
          );
        })}

        <Modal show={localState.isAdvancedOpen.get()} onHide={onCloseAdvanced}>
          <Modal.Header>Advanced Schema Settings</Modal.Header>

          <Modal.Body>
            <AdvancedSettings
              itemStateProp={
                propertiesOrNull.nested(
                  localState.item.value as string,
                ) as State<JSONSchema7>
              }
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" className="m-3" onClick={onCloseAdvanced}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
