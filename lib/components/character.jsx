import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import Classes from '../classes';
import Gear from '../gear';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      characterClass: '',
      mainWeapon: '',
      subWeapon: '',
      Helmet: '',
      Armor: '',
      Glove: '',
      Shoe: '',
    };
  }

  handleClassChange = (value) => {
    this.setState({ characterClass: value });
  }

  classSelector = () => {
    const characterClasses = Classes.map(c => (
      <MenuItem value={c}>{ c.name }</MenuItem>
    ))

    return (
      <FormControl>
        <InputLabel id="character-class-selector-label">Class</InputLabel>
        <Select 
          id="character-class-selector"
          labelId="character-class-selector-label"
          value={this.state.characterClass}
          onChange={(e) => this.handleClassChange(e.target.value)}
        >
          { characterClasses }
        </Select>
      </FormControl>
    )
  }

  handleGearChange = (item, value) => {
    this.setState({ [item]: value });
  }

  displayGear = (item) => {
    const display = this.state[item];

    if (display === '') return (<br />);

    console.log(display, item)

    return (
      <div style={{ color: display.color }}>
        {display.jin ? 'JIN' : display.ultimate ? 'Ultimate' : ''} {display.variation} {display.type ? display.type : item }
        <br />
      </div>
    )
  }

  gearSelector = (item) => {
    if (item === 'mainWeapon' || item === 'subWeapon'){
      const { characterClass } = this.state;
      const comparison = characterClass[item];

      const usableWeapons = Gear[item].filter(i => i.type === comparison);
      const weaponSelection = usableWeapons.map(weapon => (
        <MenuItem value={weapon}>{weapon.jin ? 'JIN ' : weapon.ultimate ? 'Ultimate ' : ''}{weapon.variation} {weapon.type}</MenuItem>
      ));
  
      return (
        <FormControl>
          <InputLabel id="weapon-selector-label">{ item === 'mainWeapon' ? 'Main Weapon' : 'Sub Weapon' }</InputLabel>
          <Select
            id="weapon-selector"
            labelId="weapon-selector-label"
            value={this.state[item]}
            onChange={(e) => this.handleGearChange(item, e.target.value)}
          >
            { weaponSelection }
          </Select>
        </FormControl>
      );
    } 

    const gears = Gear[item].map(gear => (
      <MenuItem value={gear}>{gear.jin ? 'JIN ' : gear.ultimate ? 'Ultimate ' : ''}{gear.variation} {item}</MenuItem>
    ))

    return (
      <FormControl>
        <InputLabel id="gear-selector-label">{ item }</InputLabel>
        <Select
          id="gear-selector-label"
          labelId="gear-selector"
          value={this.state[item]}
          onChange={(e) => this.handleGearChange(item, e.target.value)}
        >
          { gears }
        </Select>
      </FormControl>
    )
  }

  render = () => {
    const { name, characterClass } = this.state;

    if (characterClass === '') return this.classSelector();

    return (
      <div>
        { name }
        <br />
        { characterClass.name }
        <br />
        { this.displayGear('mainWeapon') }
        { this.gearSelector('mainWeapon')}
        <br />
        { this.displayGear('subWeapon') }
        { this.gearSelector('subWeapon')}
        <br />
        { this.displayGear('Helmet') }
        { this.gearSelector('Helmet')}
        <br />
        { this.displayGear('Armor') }
        { this.gearSelector('Armor')}
        <br />
        { this.displayGear('Glove') }
        { this.gearSelector('Glove')}
        <br />
        { this.displayGear('Shoe') }
        { this.gearSelector('Shoe')}
      </div>
    )
  }
}

export default Character;
