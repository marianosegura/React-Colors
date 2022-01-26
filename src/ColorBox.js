import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";


class ColorBox extends Component {
  state = {
    copied: false
  }


  changeCopyState = () => {
    this.setState({ copied: true}, () => {
      setTimeout(() => this.setState({ copied: false}), 700)
    });
  }


  render() {
    const { colorName, color: background, moreUrl, showLink, classes: css } = this.props; 
    const { copied } = this.state;
    return (  // text= is what is coppied
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={css.ColorBox} style={{background}}>

          <div className={`${css.copyOverlay} ${copied && css.showOverlay}`} style={{background}} />
          <div className={`${css.copyMessage} ${copied && css.showMessage}`}>
            <h1>copied!</h1>
            <p>{background}</p>
          </div>

          <div>
            <div className={css.boxContent}>
              <span className={css.colorName}>{colorName}</span>
            </div>
            <button className={css.copyButton}>Copy</button>
          </div>
          
          {showLink &&
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>  {/* don't trigger parent CopyToClipboard onClick */}
              <span className={`see-more ${css.seeMore}`}>More</span>
            </Link>
          }
        </div>
      </CopyToClipboard>
    );
  }
}
 
export default withStyles(styles)(ColorBox);