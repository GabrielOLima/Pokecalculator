import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
interface Move {
  name: string;
  pokemonType: string;
  modifier: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  baseHP = 0;
  baseAttack = 0;
  baseSpecialAttack = 0;
  baseDefense = 0;
  baseSpecialDefense = 0;
  baseSpeed = 0;
  name : string = ''
  newMoveName: string = '';
  newMoveType: string = '';
  newMoveModifier: string = '';

  hp: number = 0;
  attack: number = 0;
  specialAttack: number = 0;
  defense: number = 0;
  specialDefense: number = 0;
  speed: number = 0;
  level: number = 0;
  selectedValue : number = 0;
  damageValue: number = 0;
  storedMoves: Move[] = [];
  properties = ['hp', 'attack', 'specialAttack', 'defense', 'specialDefense', 'speed'];
  modifiers = ['No Modifier', 'Autocrit', 'Exploit Status', 'Disable'];
  selectedProperty = '';
  selectedModifier = 'No Modifier';
  modifierTooltip = '';

  calculateStat(input: number, property: string): number {
    let multiplier: number;
    switch (property) {
      case 'hp':
        multiplier = 2;
        break;
      case 'attack':
      case 'specialAttack':
      case 'defense':
      case 'specialDefense':
      case 'speed':
        multiplier = 1;
        break;
      default:
        multiplier = 0;
        break;
    }
    if(this.baseAttack + this.baseDefense + this.baseHP + this.baseSpeed + this.specialAttack + this.specialDefense > 600){
      console.log('This was rounded down')
      return Math.floor((input / 10) * multiplier);
    } else {
      console.log('This was rounded up')
      return Math.ceil((input / 10) * multiplier); 
    } 
  }

  calculateModifier(modifier: string) {
    switch(modifier) {
      case 'Autocrit':
        this.calculateStats;
        this.selectedValue -= 3
        this.modifierTooltip = 'This attack is a guaranteed crit'
        break;
      case 'Exploit Status':
        this.calculateStats;
        this.selectedValue += 2
        this.modifierTooltip = "This bonus only applies if the target is suffering from [specific Stable Status]"
        break;
      case 'Disable':
        this.calculateStats;
        this.damageValue = 0
        this.modifierTooltip = "Deals no damage, but the target loses the use of the last Prepared Move they used. This overwrites the prior effect of any other Disabling of the target's Moves."
        break;
      case 'No Modifier':
      default:
        this.calculateStats;
        this.modifierTooltip = "No modifiers applied. Select one if you desire to calculate a Hidden or Technical Move's potential"
        break;
    }
  }

  // calculateEffectiveness(effectiveness: string) {
  //   switch(effectiveness) {
  //     case 'Normal':
  //       this.calculateStats;
  //       break;
  //     case 'Not Effective':
  //       this.calculateStats;
  //       this.damageValue -= 2
  //       if(this.damageValue < 0){
  //         this.damageValue = 0
  //       }
  //       break;
  //     case 'Double Not Effective':
  //       this.calculateStats;
  //       this.damageValue -= 3;
  //       if(this.damageValue < 0){
  //         this.damageValue = 0
  //       }
  //       break;
  //     case 'No Modifier':
  //     default:
  //       this.calculateStats;
  //       break;
  //   }
  // }

  onSelectStat(stat: string,): void {
    switch (stat) {
      case 'hp':
        this.selectedValue = this.hp;
        this.damageValue = this.selectedValue;
        this.selectedModifier = 'No Modifier'
        this.calculateModifier(this.selectedModifier)
        break;
      case 'attack':
        this.selectedValue = this.attack;
        this.damageValue = this.selectedValue;
        this.calculateModifier(this.selectedModifier)
        break;
      case 'specialAttack':
        this.selectedValue = this.specialAttack;
        this.damageValue = this.selectedValue;
        this.calculateModifier(this.selectedModifier)
        break;
      case 'defense':
        this.selectedValue = this.defense;
        this.damageValue = this.selectedValue;
        this.selectedModifier = 'No Modifier'
        this.calculateModifier(this.selectedModifier)
        break;
      case 'specialDefense':
        this.selectedValue = this.specialDefense;
        this.damageValue = this.selectedValue;
        this.selectedModifier = 'No Modifier'
        this.calculateModifier(this.selectedModifier)
        break;
      case 'speed':
        this.selectedValue = this.speed;
        this.damageValue = this.selectedValue;
        this.selectedModifier = 'No Modifier'
        this.calculateModifier(this.selectedModifier)
        break;
      default:
        this.selectedValue = 0;
        this.damageValue = this.selectedValue;
        this.selectedModifier = 'No Modifier'
        this.calculateModifier(this.selectedModifier)
        break;
    }
  }
  
  calculateStats() {
    this.hp = this.calculateStat(this.baseHP, 'hp') + 20;
    this.attack = this.calculateStat(this.baseAttack, 'attack');
    this.specialAttack = this.calculateStat(this.baseSpecialAttack, 'attack');
    this.defense = this.calculateStat(this.baseDefense, 'attack');
    this.specialDefense = this.calculateStat(this.baseSpecialDefense, 'attack');
    this.speed = this.calculateStat(this.baseSpeed, 'attack');
    this.level = Math.floor(((this.hp - 20) / 2) + this.attack + this.specialAttack + this.defense + this.specialDefense + this.speed);
  }

  addMove() {
    const newMove: Move = {
      name: this.newMoveName,
      pokemonType: this.newMoveType,
      modifier: this.newMoveModifier
    };

    this.storedMoves.push(newMove);

    // Reset form inputs after adding move
    this.newMoveName = '';
    this.newMoveType = '';
    this.newMoveModifier = '';
  }

  save() {
  const data = [
    this.name,
    this.baseHP,
    this.baseAttack,
    this.baseSpecialAttack,
    this.baseDefense,
    this.baseSpecialDefense,
    this.baseSpeed,
    this.selectedProperty,
    this.selectedModifier,
    this.selectedValue,
    JSON.stringify(this.storedMoves), // Store stringified array
  ];
  const csv = Papa.unparse([data]);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'pokemon-stats.csv');
  }

  loadFromCSV() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.hidden = true;
    fileInput.addEventListener('change', (event) => {
      this.load(event);
    });
    fileInput.click();
  }

  load(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result !== null) {
        const text = reader.result.toString();
        const { data } = Papa.parse(text);
        const [name, baseHP, baseAttack, baseSpecialAttack, baseDefense, baseSpecialDefense, baseSpeed, selectedProperty, selectedModifier, selectedValue, storedMoves] = data[0] as string[];
        this.name = name;
        this.baseHP = parseInt(baseHP);
        this.baseAttack = parseInt(baseAttack);
        this.baseSpecialAttack = parseInt(baseSpecialAttack);
        this.baseDefense = parseInt(baseDefense);
        this.baseSpecialDefense = parseInt(baseSpecialDefense);
        this.baseSpeed = parseInt(baseSpeed);
        this.selectedProperty = selectedProperty;
        this.selectedModifier = selectedModifier;
        this.selectedValue = parseInt(selectedValue);
        this.storedMoves = JSON.parse(storedMoves); // Parse stored moves data back into an array
      }
    };
    reader.readAsText(file);
  }
}
  
