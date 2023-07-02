import React, { useState } from "react";
import styled from "styled-components";
import { LabeledArea, Label, Attribute } from "../../constants";

export interface LabeledAttributesProps {
    children?: any;
    depth?: number;
    maxDepth?: number;
    expand?: boolean;
    layout?: any;
    capitalizeLabel?: boolean;
    precision?: number;
}

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  height: auto;
  gap: 2px;
  padding-left: ${(props) => props.depth * 5}px;
`;


export const DropdownButton = styled.div<any>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: bold;
  color: #E4E6EB;
  cursor: pointer;

  &:hover {
    color: white;
    text-decoration: underline;
  }

  &::before {
    content: "${(props) => (props.isExpanded ? '▲' : '▼')}";
    transform: scale(0.9);
  }
`;

export const LabeledAttributesContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 4px;
`;

const LabeledAttributes = (props: LabeledAttributesProps) => {
    const { children, depth = 0, maxDepth = 10, expand=true, layout="row", capitalizeLabel=false, precision = 2 } = props;
    const defaultExpandedKeys = expand ? Object.keys(children) : [];
    const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);

    const formatValue = (value: any) => {
      if (typeof value === 'string') {
        return value;
      } else if (typeof value === 'number') {
        return value.toFixed(precision);
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          return renderArray(value);
        } else {
          return value;
        }
      }
  };

    const generateKey = (key: any, depth: number) => `${key}_${depth}`;

    const toggleExpanded = (key: string) => {
        setExpandedKeys(prevExpandedKeys => 
            prevExpandedKeys.includes(key) ? prevExpandedKeys.filter(eKey => eKey !== key) : [...prevExpandedKeys, key]
        );
    };


    const renderArray = (array: any[]) => {
      return "[" + array.join(", ") + "]"
    };

    const getLabeledAttribute = (key: any, value: any, depth: number) => (
      <LabeledArea key={generateKey(key, depth)} className={generateKey(key, depth)} direction={depth === 0 ? "column" : layout}>
          <Label capitalizeLabel={capitalizeLabel}>{key}: </Label>
          <Attribute>{formatValue(value)}</Attribute>
      </LabeledArea>
  );

    const renderAttributes = (key: any, value: any, depth: number) => {
        const isExpanded = expandedKeys.includes(key);
        const isArray = Array.isArray(value);
        const isComplexObject = typeof value === "object" && !isArray && value !== null;

        if (depth >= maxDepth) {
            return getLabeledAttribute(key, value, depth);
        }

        return (
            <Container key={key} depth={depth < 5 ? depth : 5}>
                {isComplexObject ? (
                    <DropdownButton isExpanded={isExpanded} onClick={() => toggleExpanded(key)}>
                        {key}:
                    </DropdownButton>
                ) : (
                    getLabeledAttribute(key, value, depth)
                )}
                {isExpanded && isComplexObject && Object.entries(value).map(([nestedKey, nestedValue]) => renderAttributes(nestedKey, nestedValue, depth + 1))}
            </Container>
        );
    };

    const renderedAttributes = Object.entries(children).map(([key, value]) => renderAttributes(key, value, depth));

    return (
      <LabeledAttributesContainer>
          {renderedAttributes}
      </LabeledAttributesContainer>
  );
};

export default LabeledAttributes;
