import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import { MenuItem, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import { withStyles } from "@material-ui/styles";
import styles from './styles/NavBarStyles';


class NavBar extends Component {
  state = {
    colorFormat: 'hex',
    isSnackbarOpen: false
  }


  handleChangeColorFormat = (event) => {
    const colorFormat = event.target.value;
    this.props.changeColorFormat(colorFormat);
    this.setState({ colorFormat, isSnackbarOpen: true });
  }
  
  closeSnackbar = () => {
    this.setState({ isSnackbarOpen: false });
  }


  render() { 
    const { level, changeLevel, showSlider = true, classes: css } = this.props;
    const { colorFormat, isSnackbarOpen } = this.state;
    return (
      <div className={css.NavBar}>
        <div className={css.logo}>
          <Link to="/">React Color Picker</Link>
        </div>

        {showSlider &&
          <div className={css.sliderContainer}>
            <span>Level: {level}</span>
              <div className={css.slider}>
                <Slider 
                  defaultValue={level} 
                  min={100} 
                  max={800} step={100} 
                  onAfterChange={changeLevel}
                />
              </div>
          </div>
        }

        <div className={css.selectContainer}>
          <Select value={colorFormat} onChange={this.handleChangeColorFormat}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255,255,255,1)</MenuItem>
          </Select>
        </div>

        <Snackbar 
          anchorOrigin={{ vertical: "bottom", horizontal: "left"}} 
          open={isSnackbarOpen}
          autoHideDuration={600}
          message={<span id='message-id'>Format Changed To {colorFormat.toUpperCase()}</span>}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={this.closeSnackbar}  // called when clicking elsewhere
          action={[
            <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
 
export default withStyles(styles)(NavBar);
