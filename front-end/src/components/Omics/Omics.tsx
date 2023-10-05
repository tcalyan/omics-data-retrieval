// src/MainComponent.tsx
import React from "react";

export interface I_Omics {
  id: string;
  gene: string;
  exper_rep1: number;
  exper_rep2: number;
  control_rep1: number;
  control_rep2: number;
}

export type I_GeneOmicStatisc = {
  exper_rep_median: number | null;
  exper_rep_mean: number | null;
  exper_rep_variance: number | null;
  control_rep_median: number | null;
  control_rep_mean: number | null;
  control_rem_variance: number | null;
};

const OmicsComponent: React.FC<{ data: I_Omics[] }> = (props: {
  data: I_Omics[];
}) => {
  return (
    <div>
      <h1>Main Component</h1>
      <ul>
        {props.data?.map((item, index) => (
          <li key={index}>{item.gene}</li>
        ))}
      </ul>
    </div>
  );
};

export default OmicsComponent;
