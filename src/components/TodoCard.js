import { Box, Paper, Typography } from "@mui/material";
import React from "react";

import { FcCalendar } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const TodoCard = ({ title, description, date, link, del, check }) => {
  return (
    <Paper
      sx={{
        minWidth: {
          xs: "92vw",
          sm: "92vw",
          md: "80vw",
          lg: "80vw",
          xl: "80vw",
        },
        display: "flex",
        flexDirection: "row",
        padding: {
          sm: "3px",
          md: "10px",
          lg: "20px",
          xl: "20px",
        },
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        minHeight: {
          xs: "150px",
          sm: "150px",
          md: "100px",
          lg: "100px",
          xl: "100px",
        },
      }}
      elevation={2}
    >
      <Box>{check}</Box>
      <Box
        sx={{
          position: "absolute",
          alignSelf: "center",
          marginLeft: {
            xs: "10%",
            sm: "10%",
            md: "20%",
            lg: "20%",
            xl: "20%",
          },
          maxWidth: "70%",
        }}
      >
        <Typography> {title}</Typography>
        <Typography sx={{ opacity: "50%" }}>{description}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <FcCalendar />
          <Typography sx={{ marginLeft: "10px" }}>{date}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "50px",
        }}
      >
        <NavLink to={link}>
          <CiEdit size={18} style={{ cursor: "pointer" }} />
        </NavLink>
        <FcFullTrash size={18} style={{ cursor: "pointer" }} onClick={del} />
      </Box>
    </Paper>
  );
};

export default TodoCard;
