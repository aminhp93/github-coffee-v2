import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Button,
  Badge,
  Box,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import { red } from "@mui/material/colors";
import { styled } from "webpmp-themes";
import { useState } from "react";

const AlarmNotifications = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "alarm-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={9} color="error">
          <NotificationsIcon color="primary" fontSize="medium" />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2.5,
            minWidth: "452px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <AlarmHeader>
          <Typography fontWeight={600}>Alarms</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </AlarmHeader>

        <AlarmContent>
          <Toolbar>
            <FilterBox>
              <Select value="week" size="small">
                <MenuItem value={"day"}>This day</MenuItem>
                <MenuItem value={"week"}>This week</MenuItem>
                <MenuItem value={"month"}>This month</MenuItem>
              </Select>

              <Button variant="outlined" startIcon={<FilterListIcon />}>
                Filter
              </Button>
            </FilterBox>

            <Box>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <RestartAltIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Toolbar>

          <Typography
            fontWeight={600}
            paddingY={5}
            fontSize={14}
            variant="subtitle2"
          >
            TODAY
          </Typography>

          <AlarmNewest>
            <CardHeaderCustomized
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="TagnameX.State=Alarm"
              subheader="Testrigg Bodø Testrigg Bodø Testrigg BodøTestrigg BodøTestrigg Bodø"
            />

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <KeyboardArrowRightIcon />
              <FiberManualRecordIcon sx={{ color: red[500] }} />
              <Box>
                <Typography variant="subtitle2">Triggered</Typography>
                <Typography>DD-MM-YYYY @ hh:mm:ss</Typography>
              </Box>
              <Chip label="AlarmValue 1" variant="outlined" />
            </CardContent>

            <CardActions sx={{ px: 4, justifyContent: "space-between" }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<EditAttributesIcon />}
                sx={{ "&.MuiButton-contained": { px: 2 } }}
              >
                ACK
              </Button>

              <Button
                size="small"
                variant="text"
                endIcon={<KeyboardArrowRightIcon />}
                sx={{ "&.MuiButton-contained": { px: 2 } }}
              >
                2 Alarms
              </Button>
            </CardActions>
          </AlarmNewest>
        </AlarmContent>

        <AlarmAction>
          <Button>View all</Button>
          <Box>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <ClearAllIcon />
            </IconButton>
          </Box>
        </AlarmAction>
      </Popover>
    </div>
  );
};

const AlarmHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AlarmContent = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(4)}`,
}));

const Toolbar = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));

const FilterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 10,
  "& .MuiButtonBase-root": {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    textTransform: "capitalize",
  },
}));

const AlarmAction = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: `${theme.spacing(3)} ${theme.spacing(4)}`,

  "& .MuiButton-textSizeMedium": {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const AlarmNewest = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

const CardHeaderCustomized = styled(CardHeader)(() => ({
  "& .MuiCardHeader-title": {
    fontWeight: 700,
  },

  "& .MuiCardHeader-subheader": {
    maxWidth: 300,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "& .MuiCardHeader-action": {
    marginTop: 0,
  },
}));

export default AlarmNotifications;
