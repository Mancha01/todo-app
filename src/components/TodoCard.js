import { Box, Checkbox, Paper, Typography } from "@mui/material";
import React from "react";

import { FcCalendar } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const TodoCard = ({ title, description, date, link, del, check }) => {
  return (
    <Paper
      sx={{
        maxWidth: "80vw",
        display: "flex",
        flexDirection: "row",
        padding: "20px",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: "10px",
      }}
      elevation={2}
    >
      <Box>{check}</Box>
      <Box>
        <Typography variant="h5"> {title}</Typography>
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
          width: "100px",
        }}
      >
        <NavLink to={link}>
          <CiEdit size={30} style={{ cursor: "pointer" }} />
        </NavLink>
        <FcFullTrash size={25} style={{ cursor: "pointer" }} onClick={del} />
      </Box>
    </Paper>
  );
};

export default TodoCard;
