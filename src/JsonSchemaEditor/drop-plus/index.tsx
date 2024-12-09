import * as React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DataType, FlexProps, getDefaultSchema } from "../utils";
import { State, useHookstate } from "@hookstate/core";
import {
  JSONSchema7,
  JSONSchema7Definition,
} from "../../JsonSchemaEditor.types";
import { random } from "../utils";
import { Button, OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { IconButton } from "../IconButton";

export interface DropPlusProps extends FlexProps {
  itemStateProp: State<JSONSchema7>;
  parentStateProp: State<JSONSchema7>;
  isDisabled: boolean;
}

export const DropPlus: React.FunctionComponent<DropPlusProps> = (
  props: React.PropsWithChildren<DropPlusProps>,
) => {
  const show = useHookstate(false);
  const itemState = useHookstate(props.itemStateProp);
  const parentState = useHookstate(props.parentStateProp);
  const parentStateOrNull: State<JSONSchema7> | undefined = parentState.ornull;
  const propertiesOrNull:
    | State<{
        [key: string]: JSONSchema7Definition;
      }>
    | undefined = parentStateOrNull.properties.ornull;

  const itemPropertiesOrNull:
    | State<{
        [key: string]: JSONSchema7Definition;
      }>
    | undefined = itemState.properties.ornull;

  if (props.isDisabled) {
    return <div />;
  }

  if (!parentStateOrNull) {
    return <></>;
  }

  const render = (props: any) => (
    <Popover {...props}>
      <Stack>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            show.set(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            show.set(false);
            const fieldName = `field_${random()}`;
            propertiesOrNull
              ?.nested(fieldName)
              .set(getDefaultSchema(DataType.string) as JSONSchema7);
          }}
        >
          Sibling
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            show.set(false);
            if (itemState.properties) {
              const fieldName = `field_${random()}`;
              itemPropertiesOrNull
                ?.nested(fieldName)
                .set(getDefaultSchema(DataType.string) as JSONSchema7);
            }
          }}
        >
          Child
        </Button>
      </Stack>
    </Popover>
  );

  return (
    <OverlayTrigger placement="left" overlay={render} show={show.get()}>
      <div>
        <IconButton
          isRound
          size="sm"
          variant="link"
          colorScheme="green"
          fontSize="16px"
          icon={<IoIosAddCircleOutline />}
          aria-label="Add Child Node"
          onClick={() => {
            show.set(!show.get());
          }}
        />
      </div>
    </OverlayTrigger>
  );
};
