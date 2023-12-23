// import next
import Image from "next/image";

// import material
import MenuIcon from "@mui/icons-material/Menu";

// import styles
import { Toolbar } from "../styles";

// import component
import { IconButton } from "@mui/material";
import PiscadaLogo from "../../../public/piscada-logo.svg";

type Props = {
  open: boolean;
  toggleDrawer: () => void;
};

const ToolbarDrawer = ({ open, toggleDrawer }: Props) => {
  return (
    <Toolbar>
      <IconButton color="inherit" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      {open && (
        <Image src={PiscadaLogo} width={108} height={32} alt="piscada-logo" />
      )}
    </Toolbar>
  );
};

export default ToolbarDrawer;
