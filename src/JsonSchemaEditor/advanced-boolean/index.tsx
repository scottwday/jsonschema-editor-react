import * as React from "react";

import { AdvancedItemStateProps } from "../../JsonSchemaEditor.types";
import { useHookstate } from "@hookstate/core";
import { Col, Form, Row } from "react-bootstrap";

export const AdvancedBoolean: React.FunctionComponent<
  AdvancedItemStateProps
> = (props: React.PropsWithChildren<AdvancedItemStateProps>) => {
  const { itemStateProp } = props;

  const item = useHookstate(itemStateProp);

  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} htmlFor="format">
          Default:{" "}
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            value={(item.default.value as string) ?? ""}
            size="sm"
            className="m-2"
            onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
              item.default.set(evt.target.value);
            }}
          >
            <option key="true" value="true">
              true
            </option>
            <option key="false" value="false">
              false
            </option>
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
  );
};
