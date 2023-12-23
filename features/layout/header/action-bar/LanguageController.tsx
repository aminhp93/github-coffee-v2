import React from "react";
import { useState } from "react";
import { styled } from "webpmp-themes";

// import next
import Image from "next/image";

// import component
import NorwayFlag from "../../../../public/flag/norway.svg";
import SwedenFlag from "../../../../public/flag/sweden.svg";
import EnglandFlag from "../../../../public/flag/united-kingdom.svg";
import { Box, Menu, MenuItem, Typography } from "@mui/material";

const MAPPING_FLAG: { [key: string]: string } = {
  en: EnglandFlag,
  no: NorwayFlag,
  sv: SwedenFlag,
};

const MAPPING_COUNTRY_NAME: { [key: string]: string } = {
  no: "Norwegian",
  sv: "Swedish",
  en: "English",
};

type Props = {
  lng: string;
};

const LanguageController = ({ lng }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(lng);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLElement>,
    languageCode: string
  ) => {
    setSelectedLanguage(languageCode);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <BoxFlag
        aria-controls="language-menu"
        id="language-button"
        aria-haspopup="listbox"
        onClick={handleClick}
      >
        <Image
          src={MAPPING_FLAG[selectedLanguage]}
          width={36}
          height={34}
          alt={`${selectedLanguage}-logo`}
        />
      </BoxFlag>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        PaperProps={{
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2.5,
          },
        }}
      >
        {Object.keys(MAPPING_FLAG).map((option) => (
          <MenuItem
            key={option}
            selected={option === selectedLanguage}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            <BoxFlag>
              <Image
                src={MAPPING_FLAG[option]}
                width={36}
                height={34}
                alt={`${option}-logo`}
              />
              <Typography pl={3}>{MAPPING_COUNTRY_NAME[option]}</Typography>
            </BoxFlag>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

const BoxFlag = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
  },
}));

export default LanguageController;
