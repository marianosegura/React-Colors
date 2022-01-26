import sizes from './sizes';
import bg from "./bg.svg";

const styles = {
  "@global": {  // global like regular css classes, no prefixes
    ".fade-exit": { opacity: 1 },  // for react transition group
    ".fade-exit-active": { 
      opacity: 0,
      transition: "opacity 500ms ease-out"
    }
  },

  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: "15px",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#1C6DD0",
    backgroundImage: `url(${bg})`,
    overflow: "scroll"  // scroll contents with the same background
  },
  heading: {
    fontSize: "1.5rem"
  },
  container: {
    width: "65%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xs")]: { width: "60%" },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      border: "2px solid white",
      color: "white",
      backgroundColor: "transparent",
      padding: "5px",
      fontWeight: "500",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "white",
        color: "blue"
      }
    }
  },
  palettes: {
    width: "100%",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "1.5rem",
    [sizes.down("md")]: { gridTemplateColumns: "repeat(2, 50%)" },
    [sizes.down("xs")]: { gridTemplateColumns: "repeat(1, 100%)" },
  }
}

export default styles;
