import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Typography, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import EnImg from "../../assets/en.png";
import CnImg from "../../assets/cn.png";

const flagMap: Record<string, string> = {
  en: EnImg,
  zn: CnImg,
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentLang = i18n.language || "en";

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== currentLang) {
      i18n.changeLanguage(storedLang);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    handleClose();
  };

  return (
    <>
      <Paper
        onClick={handleClick}
        sx={{
          minWidth: 60,
          // px: 0,
          // py: 2,
          py: "4px !important",
          px: "0 !important",
          justifyContent: "center",
          textTransform: "uppercase",
          border: "none",
          bgcolor: "background.paper",
          boxShadow: "none",
          cursor: "pointer",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography variant="caption">{currentLang}</Typography>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {["en", "zn"].map((lang) => (
          <MenuItem key={lang} onClick={() => changeLanguage(lang)}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src={flagMap[lang]} alt={lang} width={16} />
              <Typography
                color={currentLang === lang ? "primary" : "text.primary"}
              >
                {lang === "en" ? "English" : "中文"}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
