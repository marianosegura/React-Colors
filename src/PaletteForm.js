import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router";
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/PaletteFormStyles';
import seedColors from './seedColors';

class PaletteForm extends Component {
  state = {
    open: true,
    colors: seedColors[0].colors
  };
  
  
  static defaultProps = {
    maxColors: 20
  }


  handleDrawerOpen = () => {
    this.setState({ open: true });
  }


  handleDrawerClose = () => {
    this.setState({ open: false });
  }
  

  handleStateChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  
  addColor = (color, name) => {
    const newColor = { color, name };
    this.setState({ colors: [...this.state.colors, newColor]});
  }


  deleteColor = (colorName) => {
    this.setState({ colors: this.state.colors.filter(c => c.name !== colorName)});
  }
  
  
  savePalette = (paletteName, emoji) => {
    const { colors } = this.state;
    const palette = { 
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji,
      paletteName,
      colors
    };
    this.props.savePalette(palette);
    this.props.history.push("/");
  }


  updateColorsIndex = ({ oldIndex, newIndex }) => {  // for drag re-ordering
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }))
  }


  clearColors = () => {
    this.setState({ colors: [] });
  }


  addRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let randomColor;
    let isDuplicateColor = true;
    while(isDuplicateColor) {
      const randIndex = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[randIndex];
      const name = randomColor.name;  // js linting doesn't like we using the variable randomColor (declared out of the loop scope) in the below arrow function
      isDuplicateColor = this.state.colors.some(c => c.name === name);
    } 
    this.setState({ colors: [...this.state.colors, randomColor]});
  }


  render() {
    const { classes: css, palettes } = this.props;
    const { open, colors } = this.state;
    const isFullPalette = colors.length >= this.props.maxColors;
    return (
      <div className={css.root}>
        <PaletteFormNav 
          open={open}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
          savePalette={this.savePalette}
        />
        
        <Drawer
          className={css.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: css.drawerPaper,
          }}
        >
          <div className={css.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <div className={css.container}>
            <Divider />
            <Typography variant='h4' gutterBottom>Design Palette</Typography>
            <div className={css.buttons}>
              <Button 
                variant="contained" 
                color="secondary"
                onClick={this.clearColors}
                className={css.button}
              >
                Clear
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={this.addRandomColor}
                disabled={isFullPalette}
                className={css.button}
              >
                Random Color
              </Button>
            </div>

            <ColorPickerForm 
              isFullPalette={isFullPalette}
              handleStateChange={this.handleStateChange}
              addColor={this.addColor}
              colors={colors}
            />
          </div>
        </Drawer>

        <main
          className={classNames(css.content, {
            [css.contentShift]: open,
          })}
        >
          <div className={css.drawerHeader} />
          <DraggableColorList 
            colors={colors} 
            deleteColor={this.deleteColor}
            axis='xy'  // enabled 2D drag
            onSortEnd={this.updateColorsIndex}  // how to re-order colors
            distance={20}  // to prevent conflict when clicking the delete icon
          />
        </main>
      </div>
    );
  }
}

 
export default withRouter(withStyles(styles, { withTheme: true })(PaletteForm));