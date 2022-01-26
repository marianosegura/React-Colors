import React, { Component } from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";


class Palette extends Component {
  state = {
    level: 500,
    colorFormat: 'hex'
  }


  changeLevel = (level) => {
    this.setState({ level });
  }


  changeColorFormat = (colorFormat) => {
    this.setState({ colorFormat });
  }


  render() { 
    const { id: paletteId, colors } = this.props.palette;
    const { level, colorFormat } = this.state;
    const { classes: css } = this.props;
    const colorBoxes = colors[level].map(color => 
      <ColorBox 
        key={color.name} 
        moreUrl={`/palettes/${paletteId}/${color.id}`} 
        showLink
        colorName={color.name} 
        color={color[colorFormat]} 
      />
    );

    return <div className={css.Palette}>
      <NavBar 
        level={level} 
        changeLevel={this.changeLevel} 
        changeColorFormat={this.changeColorFormat}
      />

      <div className={css.colors}>{colorBoxes}</div>
      <PaletteFooter palette={this.props.palette} />
    </div>
  }
}
 
export default withStyles(styles)(Palette);