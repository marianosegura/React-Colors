import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Button, withStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './styles/ColorPickerFormStyles';
import { getForegroundColor } from './colorHelpers';


class ColorPickerForm extends Component {
  state = {
    color: "#0ECCCC",
    colorName: ""
  }

  componentDidMount() {  // we add our unique validator to ValidatorForm 
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
      this.props.colors.every(({ name }) => 
        value.toLowerCase() !== name.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) => 
      this.props.colors.every(({ color }) => 
        this.state.color !== color
      )
    );
  }


  handleColorChange = (color) => {
    this.setState({ color: color.hex });
  }


  handleStateChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  render() { 
    const { isFullPalette, addColor, classes: css } = this.props;
    const { color, colorName } = this.state;
    return (
      <div>
        <ChromePicker 
          className={css.picker}
          color={color} 
          onChangeComplete={this.handleColorChange}
        />

        <ValidatorForm  onSubmit={() => addColor(color, colorName)} instantValidate={false}>
          <TextValidator 
            className={css.colorNameInput}
            placeholder='Color Name'
            value={colorName}
            name="colorName"
            variant="filled"
            margin="normal"
            onChange={this.handleStateChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Color name is required', 'Duplicated color name', 'Duplicated color']}
          />

          <Button 
            className={css.addColor}
            variant="contained" 
            type="submit"
            color="primary" 
            style={{ backgroundColor: color, color: getForegroundColor(color) }}
            disabled={isFullPalette}
          >
            {isFullPalette ? 'Full Palette' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
 
export default withStyles(styles)(ColorPickerForm);