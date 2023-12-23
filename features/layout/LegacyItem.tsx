import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem as MuiListItem,
} from "@mui/material";
import { LegacyItem } from "./utils";
import { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import SourceIcon from "@mui/icons-material/Source";
import SettingsIcon from "@mui/icons-material/Settings";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import Link from "next/link";

type Props = {
  item: LegacyItem;
  open: boolean;
};

export const ICON_MAPPING: { [key: string]: React.ReactNode } = {
  home: <HomeIcon />,
  alarmStatistics: <BarChartIcon />,
  settings: <SettingsIcon />,
  tagManager: <SourceIcon />,
  views: <DashboardIcon />,
  tool: <AppsIcon />,
  calendar: <EventIcon />,
  applicationBuilder: <SettingsIcon />,
  tagExplorer: <FilePresentIcon />,
};

const LegacyItem = ({ item, open }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    if (!open) {
      setOpenMenu(false);
    }
  }, [open]);
  const renderExpandIcon = () => {
    if (!item.subItem) return <></>;

    return openMenu ? (
      <ExpandLess color="secondary" />
    ) : (
      <ExpandMore color="secondary" />
    );
  };

  const handleClick = () => {
    if (!open) return;
    setOpenMenu(!openMenu);
  };

  return (
    <MuiListItem key={item.property} disablePadding sx={{ display: "block" }}>
      <Link
        href={item.href}
        onClick={(e) => {
          if (item.subItem || !item.href) e.preventDefault();
        }}
        style={{ textDecoration: "none" }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
          }}
          onClick={item.subItem && handleClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "0",
              ml: open ? 1 : "0",
              justifyContent: "center",
            }}
          >
            {ICON_MAPPING[item.property]}
          </ListItemIcon>
          {open && (
            <>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
              {renderExpandIcon()}
            </>
          )}
        </ListItemButton>
      </Link>
      {item.subItem && (
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 6 }}>
            {item.subItem.map((item) => (
              <LegacyItem key={item.property} item={item} open={open} />
            ))}
          </List>
        </Collapse>
      )}
    </MuiListItem>
  );
};

export default LegacyItem;
