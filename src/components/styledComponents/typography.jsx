import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

export const StyledInputText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
