import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, geneNames: readonly string[], theme: Theme) {
  return {
    fontWeight:
      geneNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props: {
  initialData?: { id: string; name: string }[];
  gene?: { id: string; name: string }[];
  onChange: (params: { filter: { ids?: string[] } }) => void;
}) {
  const theme = useTheme();
  const [geneNames, setGeneNames] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof geneNames>) => {
    const {
      target: { value },
    } = event;
    setGeneNames(typeof value === "string" ? value.split(",") : value);
    
    props.onChange({
      filter: {
        ids: props.initialData
          ?.filter((elem) =>
            (value as string[]).find((item) => item === elem.name)
          )
          .map((elem) => elem.id),
      },
    });
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Genes</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={geneNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Gene" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.initialData?.map((gene) => (
            <MenuItem
              key={gene.name}
              value={gene.name}
              style={getStyles(gene.name, geneNames, theme)}
            >
              {gene.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
