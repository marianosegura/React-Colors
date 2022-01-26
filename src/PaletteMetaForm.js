import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


class PaletteMetaForm extends Component {
  state = {
    stage: 'name',  // name or emoji
    paletteName: ''
  };


  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
      this.props.palettes.every(({paletteName}) => 
        paletteName !== this.state.paletteName
      )
    );
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    this.setState({ open: false });
  };


  handleStateChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  setStage = (stage) => {
    this.setState({ stage });
  }
  
  
  hideForm = () => {
    this.setState({ stage: 'name' });
    this.props.hide();
  }


  render() {
    const { savePalette } = this.props;
    const { paletteName, stage } = this.state;
    return (
      <div>
        <Dialog
          open={stage === 'emoji'}
          onClose={this.hideForm}
        >
          <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker title='' onClick={({ native }) => savePalette(paletteName, native)} />  
        </Dialog>

        <Dialog
          open={stage === 'name'}
          onClose={this.hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm  onSubmit={() => this.setStage('emoji')}>
            <DialogContent>
              <DialogContentText>Plase enter a unique name for your color palette</DialogContentText>
              <TextValidator 
                value={paletteName}
                name="paletteName"
                placeholder="Palette Name"
                onChange={this.handleStateChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Palette name is required', 'Duplicated palette name']}
                fullWidth
                margin='normal'
                />
              <DialogActions>
                <Button onClick={this.hideForm} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary" type='submit'>
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}


export default PaletteMetaForm;
