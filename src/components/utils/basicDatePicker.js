import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import { FormHelperText, makeStyles } from "@material-ui/core";
// import { mergeClasses } from '@material-ui/styles';

export default function BasicDatePicker({ dateLabel, theDate }) {
  const [value, setValue] = React.useState(theDate);
  const theLabel = dateLabel;
  const dateProps = {
      display: "flex",
      alignItems: "center", //verital align icon
    //   width: "60px",
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DatePicker
        label={theLabel}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      <DatePicker
        label="Custom input"
        value={value}
        className={dateProps}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box sx={dateProps}>
            <input ref={inputRef} {...inputProps} />
            {InputProps?.endAdornment}
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}
