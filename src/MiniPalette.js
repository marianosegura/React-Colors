import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/styles";
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from "@material-ui/icons/Delete";


class MiniPalette extends PureComponent {
  handleDeletePalette = (event) => {
    event.stopPropagation();
    this.props.openDeleteDialog(this.props.paletteName);
  }


  render() {
    const { classes, paletteName, emoji, goToPalette, id } = this.props;
    const miniColorBoxes = this.props.colors.map(c => 
      <div 
      key={c.name} 
      className={classes.miniColorBox} 
      style={{ backgroundColor: c.color }} 
      />
      );
      return ( 
    <div className={classes.root} onClick={() => goToPalette(id)}>
      <DeleteIcon 
        className={classes.deleteIcon} 
        onClick={this.handleDeletePalette}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
   );
  }
}

export default withStyles(styles)(MiniPalette);  // pass the styles to the HOC