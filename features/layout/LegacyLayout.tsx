// import react
import { ReactNode, useState } from "react";

// import material
import {
  Box,
  CssBaseline,
  Divider,
  InputAdornment,
  List,
  TextField,
  styled,
} from "@mui/material";

// import styles
import { AppBar, AppBarToolbar, Drawer, DrawerHeader } from "./styles";

import BasicBreadcrumbs from "./header/Breadcrumbs";
import LegacyItem from "./LegacyItem";
import ToolbarDrawerHeader from "./header/ToolbarDrawer";
import { MOCK_LEGACY_ITEM } from "./utils";
import Notification from "./header/action-bar/AlarmNotifications";
import User from "./header/action-bar/User";
import LanguageController from "./header/action-bar/LanguageController";
import ThemeController from "./header/action-bar/ThemeController";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  children?: ReactNode;
};

const LegacyLayout = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const toggleDrawer = () => {
    setOpen((pre) => !pre);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <AppBarToolbar>
          <BasicBreadcrumbs />
          <TopBarActions>
            <LanguageController lng="no" />
            <ThemeController />
            <Notification />
            <User />
          </TopBarActions>
        </AppBarToolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <ToolbarDrawerHeader open={open} toggleDrawer={toggleDrawer} />
        </DrawerHeader>
        <Divider />
        {open && (
          <SearchBox
            value={searchText}
            onChange={handleChangeSearchText}
            autoComplete="off"
            InputProps={{
              placeholder: "Search",
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        )}

        <List>
          {MOCK_LEGACY_ITEM.map((item) => (
            <LegacyItem key={item.property} open={open} item={item} />
          ))}
        </List>

        <List
          sx={{
            marginTop: "auto",
            boxShadow: `0px -8px 24px -4px rgba(145, 158, 171, 0.12)`,
          }}
        >
          <LegacyItem
            open={open}
            item={{
              name: "Application Builder",
              property: "applicationBuilder",
              href: "",
            }}
          />

          <LegacyItem
            open={open}
            item={{
              name: "Tag Explorer",
              property: "tagExplorer",
              href: "",
            }}
          />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

const TopBarActions = styled(Box)(() => ({
  display: "flex",
  gap: 20,
  justifyContent: "space-between",
  alignItems: "center",
}));

const SearchBox = styled(TextField)(({ theme }) => ({
  margin: `${theme.spacing(2)} ${theme.spacing(5)}`,
}));

export default LegacyLayout;
