import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';


class PaletteFormNav extends Component {
  state = {
    isMetaFormShowing: false
  }


  setShowMetaForm = (isMetaFormShowing) => {
    this.setState({ isMetaFormShowing })
  }


  render() { 
    const { classes: css, open, handleDrawerOpen, savePalette, palettes } = this.props;
    const { isMetaFormShowing } = this.state;
    return (
      <div className={css.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color='default'
          className={classNames(css.appBar, {
            [css.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(css.menuButton, open && css.hide)}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Colors
            </Typography>
          </Toolbar>

          <div className={css.navButtons}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => this.setShowMetaForm(true)}
              className={css.button}
            >
              Save
            </Button>

            <Link to='/'>
              <Button 
                variant="contained" 
                color="secondary"
                className={css.button}
              >
                Back
              </Button>
            </Link>

          </div>

        </AppBar>

        {isMetaFormShowing && 
          <PaletteMetaForm 
            savePalette={savePalette} 
            palettes={palettes}
            hide={() => this.setShowMetaForm(false)}
          />
        }
      </div>
    );
  }
}
 
export default withStyles(styles, { withTheme: true })(PaletteFormNav);