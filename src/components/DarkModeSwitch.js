import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { iconColor } from "@styles/colorModeStyles";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
      background="none"
      alignContent="center"
      size="md"
      variant="nav"
    />
  );
};

export default DarkModeSwitch;
