import * as React from "react";
import { useHookstate, State } from "@hookstate/core";
import { JSONSchema7, JSONSchema7TypeName } from "../../JsonSchemaEditor.types";
import { FiSettings } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  SchemaTypes,
  getDefaultSchema,
  DataType,
  handleTypeChange,
  random,
  FlexProps,
  ITEM_COL_CLASSNAME,
} from "../utils";

import { SchemaObject } from "../schema-object";
import { AdvancedSettings } from "../schema-advanced";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, Row } from "react-bootstrap";
import { TooltipWrapper } from "../TooltipWrapper";
import { IconButton } from "../IconButton";

export interface SchemaArrayProps extends FlexProps {
  schemaState: State<JSONSchema7>;
  isReadOnly: State<boolean>;
}

export const SchemaArray: React.FunctionComponent<SchemaArrayProps> = (
  props: React.PropsWithChildren<SchemaArrayProps>,
) => {
  const { schemaState, isReadOnly } = props;
  const state = useHookstate(schemaState.items as JSONSchema7);
  const isReadOnlyState = useHookstate(isReadOnly);

  const onCloseAdvanced = (): void => {
    localState.isAdvancedOpen.set(false);
  };

  const showadvanced = (): void => {
    localState.isAdvancedOpen.set(true);
  };

  const localState = useHookstate({
    isAdvancedOpen: false,
  });

  return (
    <>
      <Form>
        <Row className="m-0 p-0" style={{ height: "100%" }}>
          {/* Vertical line on left margin */}
          <div className={"m-0 p-0 col-auto"}>
            <div className={"vr ms-1 pb-4"} style={{ height: "100%" }} />
          </div>

          <Col className={"p-0 my-0 ms-2"}>
            <Form className="schema-item">
              <Row className="align-items-center">
                <Col xs={"auto"} className={ITEM_COL_CLASSNAME}>
                  <Form.Control
                    type="text"
                    key="Items"
                    disabled
                    value="Items"
                    size="sm"
                  />
                </Col>
                <Col xs={"auto"} className={ITEM_COL_CLASSNAME}>
                  <Form.Check disabled />
                </Col>
                <Col xs={"auto"} className={ITEM_COL_CLASSNAME}>
                  <Form.Select
                    disabled={isReadOnlyState.value}
                    value={state.type.value as JSONSchema7TypeName}
                    size="sm"
                    onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
                      const newSchema = handleTypeChange(
                        evt.target.value as JSONSchema7TypeName,
                        false,
                      );
                      state.set(newSchema as JSONSchema7);
                    }}
                  >
                    {SchemaTypes.map((item, index) => {
                      return (
                        <option key={String(index)} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col xs={"auto"} className={ITEM_COL_CLASSNAME}>
                  <Form.Control
                    value={state.title.value}
                    disabled={isReadOnlyState.value}
                    size="sm"
                    placeholder="Add Title"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                      state.title.set(evt.target.value);
                    }}
                  />
                </Col>
                <Col className={ITEM_COL_CLASSNAME}>
                  <Form.Control
                    value={state.description.value}
                    disabled={isReadOnlyState.value}
                    size="sm"
                    placeholder="Add Description"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                      state.description.set(evt.target.value);
                    }}
                  />
                </Col>

                {state.type.value !== "object" && (
                  <Col xs={"auto"} className={ITEM_COL_CLASSNAME}>
                    <TooltipWrapper
                      aria-label="Advanced Settings"
                      placement="top"
                      label="Advanced Settings"
                    >
                      <IconButton
                        isDisabled={isReadOnlyState.value}
                        size="sm"
                        variant="link"
                        colorScheme="blue"
                        icon={<FiSettings />}
                        aria-label="Advanced Settings"
                        onClick={() => {
                          showadvanced();
                        }}
                      />
                    </TooltipWrapper>
                  </Col>
                )}

                {state.type.value === "object" && (
                  <Col xs={"auto"} className={ITEM_COL_CLASSNAME}>
                    <TooltipWrapper
                      hasArrow
                      aria-label="Add Child Node"
                      label="Add Child Node"
                      placement="top"
                    >
                      <IconButton
                        isRound
                        isDisabled={isReadOnlyState.value}
                        size="sm"
                        variant="link"
                        colorScheme="green"
                        fontSize="16px"
                        icon={<IoIosAddCircleOutline />}
                        aria-label="Add Child Node"
                        onClick={() => {
                          const fieldName = `field_${random()}`;
                          (
                            state.properties as State<{
                              [key: string]: JSONSchema7;
                            }>
                          )[fieldName].set(getDefaultSchema(DataType.string));
                        }}
                      />
                    </TooltipWrapper>
                  </Col>
                )}
              </Row>
            </Form>
          </Col>
        </Row>
      </Form>
      {state.type?.value === "object" && (
        <SchemaObject isReadOnly={isReadOnlyState} schemaState={state} />
      )}
      {state.type?.value === "array" && (
        <SchemaArray isReadOnly={isReadOnlyState} schemaState={state} />
      )}

      <Modal show={localState.isAdvancedOpen.get()} onHide={onCloseAdvanced}>
        <Modal />
        <Modal.Header>Advanced Array Schema Settings</Modal.Header>

        <Modal.Body>
          <AdvancedSettings itemStateProp={state} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" className="m-2" onClick={onCloseAdvanced}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
