import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MultipleSelectChip from "./Select";

export default function LeftBar(props: {
  initialData?: { id: string; name: string }[];
  gene?: { id: string; name: string }[];
  onChange: (params: { filter: { ids?: string[] } }) => void;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <MultipleSelectChip
          initialData={props.initialData}
          gene={props.gene}
          onChange={props.onChange}
        ></MultipleSelectChip>
      </CardContent>
    </Card>
  );
}
