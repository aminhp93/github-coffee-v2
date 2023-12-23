import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { useSettings } from "webpmp-themes";

const ThemeController = () => {
  const { settings, saveSettings } = useSettings();

  return (
    <IconButton
      sx={{
        mr: -3,
      }}
      onClick={() => {
        saveSettings({
          ...settings,
          ["mode"]: settings.mode === "light" ? "dark" : "light",
        });
      }}
    >
      {settings.mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeController;
