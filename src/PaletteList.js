import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from "@material-ui/styles";
import { Link, withRouter } from 'react-router-dom';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";


class PaletteList extends Component {
  state = {
    isDeleteDialogOpen: false,
    paletteNameToDelete: ''
  }


  toggleDeleteDialog = () => {
    this.setState({ isDeleteDialogOpen: !this.state.isDeleteDialogOpen });
  }


  goToPalette = (id) => {
    this.props.history.push(`/palettes/${id}`);
  }


  openDeleteDialog = (paletteName) => {
    this.toggleDeleteDialog();
    this.setState({ paletteNameToDelete: paletteName });
  }
  
  
  handleDeletePalette = () => {
    this.toggleDeleteDialog();
    this.props.deletePalette(this.state.paletteNameToDelete)  
  }


  render() { 
    const { palettes, classes } = this.props;
    const { isDeleteDialogOpen } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palettes/new">New</Link>
          </nav>
          
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => 
              <CSSTransition key={palette.id} classNames='fade' timeout={500} >
                <MiniPalette 
                  key={palette.paletteName}
                  goToPalette={this.goToPalette} 
                  openDeleteDialog={this.openDeleteDialog}
                  {...palette} 
                />
              </CSSTransition>
              )}
          </TransitionGroup>
        </div>

        <Dialog open={isDeleteDialogOpen}>
          <DialogTitle>Delete this palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDeletePalette}>
              <ListItemAvatar> 
                <Avatar style={{ backgroundColor: blue[100], color: blue[600]}}>
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>

            <ListItem button onClick={this.toggleDeleteDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600]}}>
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
 
export default withRouter(withStyles(styles)(PaletteList));