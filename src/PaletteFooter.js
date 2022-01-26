import React from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteFooterStyles';


function PaletteFooter(props) {
  const { paletteName, emoji } = props.palette;
  const { classes: css } = props;
  return (  
    <footer className={css.PaletteFooter}>
        {paletteName}
        <span className={css.emoji}>{emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
