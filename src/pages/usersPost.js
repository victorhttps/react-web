import {
  Grid,
  Paper,
  Divider,
  Typography,
  Modal,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const UserPosts = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [specific, setSpecific] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadPosts = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setData(response.data);
      setLoad(false);
    });
  };
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div>
      <Modal
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: 500
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ backgroundColor: "white" }}>
          <Typography style={{textAlign: "center"}}>{specific.title}</Typography>
          <Divider />
          <div>{specific.body}</div>
        </div>
      </Modal>
      <Grid style={{ backgroundColor: "gray" }} container spacing={4}>
        {data.map((item) => (
          <Grid item xs={4}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Typography style={{ fontSize: 19, fontWeight: 900 }}>
                  {item.title}{" "}
                </Typography>
                <Divider />
                <Typography style={{ fontSize: 20 }}>{item.body}</Typography>
                <Divider />
              </CardContent>
              <Button
                onClick={() => {
                  setSpecific(item);
                  handleOpen();
                }}
                variant="contained"
              >
                Dados da API
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default UserPosts;
