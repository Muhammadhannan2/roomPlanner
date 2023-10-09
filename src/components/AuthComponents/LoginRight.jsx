import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TradeAccountData = [
  { title: "Apply for a cash or credit account for your business." },
  { title: "Create a maX login and connect it to an existing trade account." },
];

const PersonalAccountData = [
  { title: "Save your moodboards and 3D plans." },
  { title: "Access and action your in-store quotes." },
  { title: "See your past purchases." },
];

function MainHeading({ children, sx }) {
  return (
    <Typography
      sx={{ fontSize: "16px", fontWeight: "700", color: "#FFF", my: 1, ...sx }}
    >
      {children}
    </Typography>
  );
}

function CheckComponent({ children, StackSX }) {
  return (
    <Stack flexDirection="row" sx={{...StackSX}}>
      <CheckCircleIcon sx={{ color: "#FFF" }} />
      <MainText sx={{ mb: 1, ml: 1 }}>{children}</MainText>
    </Stack>
  );
}

function MainText({ children, sx }) {
  return (
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: "300",
        color: "#FFF",
        mb: 4,
        lineHeight: 1.3,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function LoginRight() {
  return (
    <Box
      sx={{
        mx: 5,
        my: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "400",
          color: "#FFF",
          lineHeight: 1.3,
        }}
      >
        Not signed up?
      </Typography>

      <MainText>Applying for online access is easy.</MainText>

      <MainHeading>Trade Account</MainHeading>

      <MainText sx={{ mb: 1.5 }}>
        maX - Your online business management system
      </MainText>
      {TradeAccountData?.map((item) => (
        <CheckComponent>{item.title}</CheckComponent>
      ))}
      <Link
        href="#"
        sx={{
          fontWeight: "600",
          color: "#FFF",
          textDecoration: "underline",
        }}
      >
        Apply now
      </Link>

      <MainHeading sx={{mt: 4}}>Personal Account</MainHeading>

      <MainText sx={{ mb: 1.5 }}>For non-trade customers</MainText>
      {PersonalAccountData?.map((item) => (
        <CheckComponent StackSX={{my: 2}}>{item.title}</CheckComponent>
      ))}
      <Link
        href="#"
        sx={{
          marginTop: 2,
          fontWeight: "600",
          color: "#FFF",
          textDecoration: "underline",
        }}
      >
        Register now
      </Link>
    </Box>
  );
}

export default LoginRight;
