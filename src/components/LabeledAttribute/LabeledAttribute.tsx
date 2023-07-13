import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { LabeledArea, getOpaqueColor, Label, Attribute, Box, Columns, noop } from "../../constants";
import { nanoid } from "nanoid";
import { Accordion } from "../Accordion/Accordion";

export interface LabeledAttributesProps {
    children?: any;
    depth?: number;
    maxDepth?: number;
    expand?: boolean;
    layout?: any;
    capitalizeLabel?: boolean;
    precision?: number;
    id?: string;
    useAccordion?: number;
    fontSize?: number;
    ignoreKeys?: string[];
}

export const LabeledAttributesContainer = styled.div<any>`
    display: flex;
    overflow: hidden;
    border-radius: 4px;
    flex-direction: ${(props) => props.direction || 'column'};
    width: 100%;
    height: auto;
    border-radius: 4px;
    gap: 4px;
    background: ${(props) => props.theme.controlsBackground};
    border: ${props => props.border ? `1px solid ${getOpaqueColor(props.theme.controlsColor)}` : `1px solid transparent`};
    font-size: ${(props) => Math.max(1 - props.depth * 0.05, 0.3)}rem;
`;

const LabeledAttributes = (props: LabeledAttributesProps) => {
  const {children, depth = 0, maxDepth = 10, expand=false, layout="row", capitalizeLabel=false, precision = 2, id, useAccordion=2, ignoreKeys=['theme'] } = props;
  const defaultExpandedKeys = expand ? Object.keys(children) : [];
    const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);
    
  const toggleExpanded = useCallback((key: string) => {
      setExpandedKeys(prevExpandedKeys => 
          prevExpandedKeys.includes(key) ? prevExpandedKeys.filter(eKey => eKey !== key) : [...prevExpandedKeys, key]
      );
  }, []);

  const removeUndefined = useCallback((obj: any) => {
    return Object.keys(obj).reduce((result: any, key: any) => {
      if(obj[key] !== undefined && !ignoreKeys.includes(key)){
        result[key] = obj[key];
      }
      return result;
    }, {});
  }, [ignoreKeys]);

  const renderArray = useCallback((array: any[]) => {
    return "[" + array.join(", ") + "]"
  }, []);

  const formatValue = useCallback((value: any) => {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number') {
      return value.toFixed(precision);
    } else if (typeof value === 'boolean') {
      return value.toString();
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return renderArray(value);
      } else {
        return value;
      }
    } else if (value) {
      return value.toString();
    }
  }, [precision, renderArray]);

    const getLabeledAttribute = useCallback((key: any, value: any, depth: number, attributeLayout: any = 'row') => {
      return (
        <LabeledArea key={`labeled-area-${id}-${key}-${depth}`} 
          width={attributeLayout === "row" ? "100%" : "100%"}           //
          height={attributeLayout === "row" ? "auto" : "auto"}          //
          direction={attributeLayout}                                   
          justifyContent={attributeLayout === "row" ? "start": "start"} // 
          alignItems={attributeLayout === "row" ? 'center' : 'start'} // centers label: value pair row-wise
          textAlign={"center"} 
          overflowX={"hidden"}
        >
          <Label alignItems={"center"} capitalize={capitalizeLabel}>{key}:</Label>
          <Attribute>{formatValue(value)}</Attribute>
        </LabeledArea>
      );
    }, [capitalizeLabel, formatValue, id]);

    const renderAttributes = useCallback((key: any, value: any, depth: number) => {
        const isExpanded = expandedKeys.includes(key);
        const isArray = Array.isArray(value);
        const isComplexObject = typeof value === "object" && !isArray && value !== null;

        if (isComplexObject) {
          const labeledObj = (
            <LabeledAttributes depth={depth + 1} maxDepth={maxDepth} capitalizeLabel={capitalizeLabel} layout={layout} id={`${id}-${key}-${depth + 1}`}>
            {value}
          </LabeledAttributes>
          );
          if (Object.keys(value).length > useAccordion) {
            return (
              <Accordion  margin={'0 4px 0 0'} iconSize={`${Math.max(16 - depth*2, 6)}px`} fontSize={`${Math.max(1 - depth * 0.07, 0.3) - 0.037}rem`} justifyContent="flex-start" alignItems="center" padding={'0 2px 0 2px'} key={`accordion-${key}-${depth}`} title={key} expanded={isExpanded} onClick={() => toggleExpanded(key)}>
                {labeledObj}
              </Accordion>
            );
          } else {
            return getLabeledAttribute(key, labeledObj, depth, "column");
          }
        } else {
          return getLabeledAttribute(key, value, depth);
        }
    }, [capitalizeLabel, expandedKeys, getLabeledAttribute, id, layout, maxDepth, toggleExpanded, useAccordion]);

    const renderedAttributes = Object.entries(removeUndefined(children)).map(([key, value]) => renderAttributes(key, value, depth));
    return (
      <LabeledAttributesContainer border={depth === 0} direction={layout} width={layout === "row" ? "100%" : "100%"}>
          {renderedAttributes}
      </LabeledAttributesContainer>
  );
};

export default React.memo(LabeledAttributes);
