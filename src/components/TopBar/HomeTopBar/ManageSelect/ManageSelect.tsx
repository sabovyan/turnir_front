import React from "react";
import { makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Colors from "src/styles/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },

  select: {
    minWidth: 100,
    fontSize: "1.5rem",
    color: Colors.backdropColor,
    border: "none",
    background: "transparent",

    "& > .MuiSelect-select:focus": {
      background: "white",
    },

    "&:before": {
      display: "none",
    },

    "&:after": {
      display: "none",
    },
  },
});

interface Props {}

type ManageState = "tournaments" | "players";

const ManageSelect = (props: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState<ManageState>("tournaments");

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    if (typeof e.target.value === "string") {
      const value = e.target.value as ManageState;

      setState(value);
      if (value === "players") {
        history.push("players");
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" noWrap color="textSecondary">
        Manage
      </Typography>
      <Select
        className={classes.select}
        value={state}
        onChange={handleSelectChange}
      >
        <MenuItem aria-label="Select" value="Select" disabled />
        <MenuItem value={"tournaments"}>{t("Tournaments")}</MenuItem>
        <MenuItem value={"players"}>{t("Players")}</MenuItem>
      </Select>
    </div>
  );
};

export default ManageSelect;
