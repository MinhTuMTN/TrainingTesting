import React from "react";

interface BoxProps {
  children: React.ReactNode;
  display?: React.CSSProperties["display"];
  flexDirection?: "column" | "column-reverse" | "row" | "row-reverse";
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  margin?: string;
  width?: string;
  flex?: number;
  styles?: React.CSSProperties;
}

function Box(props: BoxProps) {
  return (
    <div
      style={{
        display: props.display || "flex",
        flexDirection: props.flexDirection || "row",
        justifyContent: props.justifyContent || "center",
        alignItems: props.alignItems || "center",
        padding: props.padding || "0",
        margin: props.margin || "0",
        width: props.width || "auto",
        flex: props.flex || 1,
        ...props.styles,
      }}
    >
      {props.children}
    </div>
  );
}

export default Box;
