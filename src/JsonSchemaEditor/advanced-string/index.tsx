import * as React from "react";
import {
  AdvancedItemStateProps,
  JSONSchema7,
} from "../../JsonSchemaEditor.types";
import { none, useHookstate } from "@hookstate/core";
import { StringFormat } from "../utils";
import { Col, Form, Row } from "react-bootstrap";

export const AdvancedString: React.FunctionComponent<AdvancedItemStateProps> = (
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
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Default:{" "}
        </Form.Label>

        <Col sm={9}>
          <Form.Control
            type="text"
            id="default"
            placeholder="Default value"
            value={(itemState.default.value as string) ?? ""}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              itemState.default.set(evt.target.value);
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Min Length:{" "}
        </Form.Label>

        <Col sm={3}>
          <Form.Control
            type="number"
            size="sm"
            defaultValue={Number(itemState.minLength.value)}
            onChange={(e) => {
              itemState.minLength.set(Number(e.target.value));
            }}
          ></Form.Control>
        </Col>

        <Form.Label column sm={3}>
          Max Length:{" "}
        </Form.Label>

        <Col sm={3}>
          <Form.Control
            type="number"
            size="sm"
            defaultValue={Number(itemState.maxLength.value)}
            onChange={(e) => {
              itemState.maxLength.set(Number(e.target.value));
            }}
          ></Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} htmlFor="pattern">
          Pattern:{" "}
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="pattern"
            placeholder="Must be a valid regular expression."
            value={itemState.pattern.value ?? ""}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              itemState.pattern.set(evt.target.value);
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
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
            value={enumValue || ""}
            disabled={!isEnumChecked}
            placeholder="ENUM Values - One Entry Per Line"
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
              const update = changeEnumOtherValue(evt.target.value);
              if (update === null) {
                itemState.enum.set(none);
              } else {
                itemState.enum.set(update as string[]);
              }
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} htmlFor="format">
          Format:{" "}
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            value={itemState.format.value ?? ""}
            size="sm"
            onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
              if (evt.target.value === "") {
                itemState.format.set(none);
              } else {
                itemState.format.set(evt.target.value);
              }
            }}
          >
            {StringFormat.map((item, index) => {
              return (
                <option key={String(index)} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
  );
};
