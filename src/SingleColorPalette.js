import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  state = {
    colorFormat: 'hex'
  }
  
  
  changeColorFormat = (colorFormat) => {
    this.setState({ colorFormat });
  }


  gatherShades = (palette, colorId) => {
    let shades = [];
    let colors = palette.colors;
    for (let level in colors) {
      shades = shades.concat(
        colors[level].filter(c => c.id === colorId)
      )
    }
    return shades;  // skip level 900, better not
  }
  
  
  _shades = this.gatherShades(this.props.palette, this.props.colorId);
  render() {
    const { colorFormat } = this.state;
    const { classes: css } = this.props;
    const colorBoxes = this._shades.map(color => 
      <ColorBox 
        key={color.name} 
        moreUrl={`/`} 
        colorName={color.name} 
        color={color[colorFormat]} 
        showLink={false}
      />
    );
    return (
      <div className={css.Palette}>
        <NavBar 
          showSlider={false}
          changeColorFormat={this.changeColorFormat}
        />

        <div className={css.colors}>
          {colorBoxes}
          {/* <div className='ColorBox go-back'>
            <Link to={`/palettes/${this.props.palette.id}`} className='back-button'>
              Go Back
            </Link>
          </div> */}
        </div>

        <PaletteFooter palette={this.props.palette} />
      </div>
    );
  }
}
 
export default withStyles(styles)(SingleColorPalette);