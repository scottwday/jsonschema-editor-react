import * as React from "react";

import {
  AdvancedItemStateProps,
  JSONSchema7,
} from "../../JsonSchemaEditor.types";
import { none, useHookstate } from "@hookstate/core";
import { Col, Form, Row } from "react-bootstrap";

export const AdvancedNumber: React.FunctionComponent<AdvancedItemStateProps> = (
  props: React.PropsWithChildren<AdvancedItemStateProps>,
) => {
  const { itemStateProp } = props;

  const changeEnumOtherValue = (value: string): string[] | null => {
    const array = value.split("\n");
    if (array.length === 0 || (array.length === 1 && !array[0])) {
      return null;
    }

    return array;
  };

  const itemState = useHookstate(itemStateProp);
  const isEnumChecked = (itemState.value as JSONSchema7).enum !== undefined;
  const enumData = (itemState.value as JSONSchema7).enum
    ? (itemState.enum.value as string[])
    : [];
  const enumValue = enumData?.join("\n");

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Default:{" "}
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            size="sm"
            defaultValue={Number(itemState.default.value)}
            placeholder="Default value"
            onChange={(e) => {
              itemState.default.set(Number(e.target.value));
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Min Value:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="number"
            size="sm"
            defaultValue={Number(itemState.minimum.value)}
            onChange={(e) => {
              itemState.minimum.set(Number(e.target.value));
            }}
          />
        </Col>
        <Form.Label column sm={3}>
          Max Value:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="number"
            size="sm"
            defaultValue={Number(itemState.maximum.value)}
            onChange={(e) => {
              itemState.maximum.set(Number(e.target.value));
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Enum:
        </Form.Label>
        <Col sm={1}>
          <Form.Check
            checked={isEnumChecked}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              if (!evt.target.checked) {
                itemState.enum.set(none);
              } else {
                itemState.enum.set(Array<string>());
              }
            }}
          />
        </Col>
        <Col sm={9}>
          <Form.Control
            as="textarea"
            value={enumValue}
            disabled={!isEnumChecked}
            placeholder="ENUM Values - One Entry Per Line"
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
              const re = /^[0-9\n]+$/;
              if (evt.target.value === "" || re.test(evt.target.value)) {
                const update = changeEnumOtherValue(evt.target.value);
                if (update === null) {
                  itemState.enum.set(none);
                } else {
                  itemState.enum.set(update as string[]);
                }
              }
            }}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};
