import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';
import PaletteForm from './PaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';


class App extends Component {
  state = {
    palettes: seedColors
  }


  componentDidMount() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    if (savedPalettes) this.setState({ palettes: savedPalettes });
  }


  findPalette = (id) => { 
    return this.state.palettes.find(p => p.id === id);
  }

  savePalettesToLocalStorage = () => {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }


  savePalette = (palette) => {
    this.setState({ palettes: [...this.state.palettes, palette]},
      this.savePalettesToLocalStorage
    );
  }


  deletePalette = (name) => {
    this.setState(prevState => ({ palettes: prevState.palettes.filter(p => p.paletteName !== name)}),
      this.savePalettesToLocalStorage
    );
  }


  render() {
    const { palettes } = this.state;
    return (
      <div className="App">
        <Route render={({ location }) => (  // location is given by router
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='fade' timeout={500}>
              <Switch location={location}>
                <Route exact path="/" 
                  render={() => 
                    <Page>
                      <PaletteList 
                        palettes={palettes} 
                        deletePalette={this.deletePalette} 
                        />
                    </Page>
                  } 
                />
                
                <Route exact path="/palettes/new" 
                  render={() => 
                    <Page>
                      <PaletteForm 
                        savePalette={this.savePalette} 
                        palettes={palettes}
                      />
                    </Page>
                  } 
                />
    
                <Route exact path="/palettes/:id" 
                  render={(props) => 
                    <Page>
                      <Palette palette={generatePalette(this.findPalette(props.match.params.id))} />
                    </Page>
                  } 
                />
    
                <Route exact path="/palettes/:paletteId/:colorId" 
                  render={(props) => 
                    <Page>
                      <SingleColorPalette 
                        colorId={props.match.params.colorId}
                        palette={generatePalette(this.findPalette(props.match.params.paletteId))} 
                      />
                    </Page>
                  } 
                />

                <Route  // catch all route
                  render={() => 
                    <Page>
                      <PaletteList 
                        palettes={palettes} 
                        deletePalette={this.deletePalette} 
                        />
                    </Page>
                  } 
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div>
    );
  }
}


export default App;