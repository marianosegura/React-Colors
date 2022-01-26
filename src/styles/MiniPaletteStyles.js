const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "6px",
    padding: "0 0.5rem",
    paddingTop: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer"
  },
  colors: {
    marginBottom: "-12px",
    backgroundColor: "grey",
    width: "100%",
    height: "140px"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    fontSize: "0.9rem",
    position: "relative"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  },
  miniColorBox: {
    display: "inline-block",
    height: "25%",
    width: "20%",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4px"
  },
  deleteIcon: {
    borderRadius: "3px",
    width: "20px",
    height: "20px",
    color: "white",
    backgroundColor: "#eb3d30",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "7px",
    zIndex: 10,
    marginRight: "2px",
    marginTop: "2px",
    transition: "all 0.1s ease-in-out !important",
    opacity: 0,
    "&:hover": {
      opacity: 1
    }
  }
}

export default styles;