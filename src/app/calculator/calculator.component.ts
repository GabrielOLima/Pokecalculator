import { Component } from '@angular/core';

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

  hp: number = 0;
  attack: number = 0;
  specialAttack: number = 0;
  defense: number = 0;
  specialDefense: number = 0;
  speed: number = 0;
  level: number = 0;
  selectedValue : number = 0;
  damageValue: number = 0;
  effectiveness = ['Normal', 'Not Effective', 'Double Not Effective', 'Super Effective', 'Double']
  properties = ['hp', 'attack', 'specialAttack', 'defense', 'specialDefense', 'speed'];
  modifiers = ['No Modifier', 'Autocrit', 'Exploit Status', 'Disable'];
  selectedEffectiveness = '';
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
    return Math.floor((input / 10) * multiplier);
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
        this.modifierTooltip = "This move will do no damage, but a target will lose the use of one of the last Prepared Moves if hit. This overwrites the prior effect of any other Disabling of the target's Moves."
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
        this.selectedValue = this.specialDefense;
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
  
}