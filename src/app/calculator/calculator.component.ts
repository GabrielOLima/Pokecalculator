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
  [key: string]: any;
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


  //Soft Skills
  selectedNature = '';
  pokemonNatures = [
    'Adamant',
    'Bashful',
    'Bold',
    'Brave',
    'Calm',
    'Careful',
    'Docile',
    'Gentle',
    'Hardy',
    'Hasty',
    'Impish',
    'Jolly',
    'Lax',
    'Lonely',
    'Mild',
    'Modest',
    'Naive',
    'Naughty',
    'Quiet',
    'Quirky',
    'Rash',
    'Relaxed',
    'Sassy',
    'Serious',
    'Timid'
  ];
  coolValue: number = 0;
  toughValue: number = 0;
  beautifulValue: number = 0;
  smartValue : number = 0;
  cuteValue: number = 0;

  increment(property: string) {
    this[property]++;
  }
  
  decrement(property: string) {
    this[property]--;
  }

  calculateSoftStat(attack: number, defense: number, speed: number, specialAttack: number, specialDefense: number) {
    const stats = [
      this.attack,
      this.defense,
      this.speed,
      this.specialAttack,
      this.specialDefense
    ];
    stats.sort((a, b) => b - a);

    if (attack === stats[0] || attack  === stats[1] || attack  === stats[2]) {
      this.coolValue = 6;
    } else {
      this.coolValue = 0;
    }
    
    if (defense === stats[0] || defense === stats[1] || defense === stats[2]) {
      this.toughValue = 6;
    } else {
      this.toughValue = 0;
    }
    
    if (specialAttack === stats[0] || specialAttack === stats[1] || specialAttack === stats[2]) {
      this.beautifulValue = 6;
    } else {
      this.beautifulValue = 0;
    }
    
    if (specialDefense === stats[0] || specialDefense === stats[1] || specialDefense === stats[2]) {
      this.smartValue = 6;
    } else {
      this.smartValue = 0;
    }
    
    if (speed === stats[0] || speed === stats[1] || speed === stats[2]) {
      this.cuteValue = 6;
    } else {
      this.cuteValue = 0;
    }
    this.calculateNature(this.selectedNature)
    console.log(`The three highest stats are: ${stats[0]}, ${stats[1]}, ${stats[2]}`);
  }

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

  calculateNature(nature: string){
    switch(nature) {
      case 'Hardy':
        this.coolValue -= 2
        this.coolValue += 4
        break;
      case 'Docile':
        this.toughValue -= 2
        this.toughValue += 4
        break;
      case 'Bashful':
        this.beautifulValue -= 2
        this.beautifulValue += 4
        break;
      case 'Quirky':
        this.smartValue -= 2
        this.smartValue += 4
        break;
      case 'Serious':
        this.cuteValue -= 2
        this.cuteValue += 4
        break;
      case 'Bold':
        this.coolValue -= 2
        this.toughValue += 4
        break;
      case 'Modest':
        this.coolValue -= 2
        this.beautifulValue += 4
        break;
      case 'Calm':
        this.coolValue -= 2
        this.smartValue += 4
        break;
      case 'Timid':
        this.coolValue -= 2
        this.cuteValue += 4
        break;
      case 'Lonely':
        this.toughValue -= 2
        this.coolValue += 4
        break;
      case 'Lonely':
        this.toughValue -= 2
        this.coolValue += 4
        break;
      case 'Mild':
        this.toughValue -= 2
        this.beautifulValue += 4
        break;
      case 'Gentle':
        this.toughValue -= 2
        this.smartValue += 4
        break;
      case 'Hasty':
        this.toughValue -= 2
        this.cuteValue += 4
        break;
      case 'Adamant':
        this.beautifulValue -= 2
        this.coolValue += 4
        break;
      case 'Impish':
        this.beautifulValue -= 2
        this.toughValue += 4
        break;
      case 'Careful':
        this.beautifulValue -= 2
        this.smartValue += 4
        break;
      case 'Jolly':
        this.beautifulValue -= 2
        this.cuteValue += 4
        break;
      case 'Naughty':
        this.smartValue -= 2
        this.coolValue += 4
        break;
      case 'Lax':
        this.smartValue -= 2
        this.toughValue += 4
        break;
      case 'Rash':
        this.smartValue -= 2
        this.beautifulValue += 4
        break;
      case 'Naive':
        this.smartValue -= 2
        this.cuteValue += 4
        break;
      case 'Brave':
        this.cuteValue -= 2
        this.coolValue += 4
        break; 
      case 'Relaxed':
        this.cuteValue -= 2
        this.toughValue += 4
        break;
      case 'Quiet':
        this.cuteValue -= 2
        this.beautifulValue += 4
        break;
      case 'Sassy':
        this.cuteValue -= 2
        this.smartValue += 4
        break;   
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
    this.calculateSoftStat(this.attack, this.defense, this.speed, this.specialAttack, this.specialDefense);
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

  removeMove(index: number) {
    this.storedMoves.splice(index, 1);
  }

  save() {
    const data = [
      this.name,
      this.baseHP,
      this.hp,
      this.level,
      this.baseAttack,
      this.baseSpecialAttack,
      this.baseDefense,
      this.baseSpecialDefense,
      this.baseSpeed,
      this.selectedProperty,
      this.selectedModifier,
      this.selectedValue,
      this.coolValue,
      this.toughValue,
      this.beautifulValue,
      this.smartValue,
      this.cuteValue,
      this.selectedNature,
      this.attack,
      this.specialAttack,
      this.defense,
      this.specialDefense,
      this.speed,
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
        const [
          name,
          baseHP,
          hp,
          level,
          baseAttack,
          baseSpecialAttack,
          baseDefense,
          baseSpecialDefense,
          baseSpeed,
          selectedProperty,
          selectedModifier,
          selectedValue,
          coolValue,
          toughValue,
          beautifulValue,
          smartValue,
          cuteValue,
          selectedNature,
          attack,
          specialAttack,
          defense,
          specialDefense,
          speed,
          storedMoves
        ] = data[0] as string[];
        this.name = name;
        this.baseHP = parseInt(baseHP);
        this.hp = parseInt(hp);
        this.level = parseInt(level);
        this.baseAttack = parseInt(baseAttack);
        this.baseSpecialAttack = parseInt(baseSpecialAttack);
        this.baseDefense = parseInt(baseDefense);
        this.baseSpecialDefense = parseInt(baseSpecialDefense);
        this.baseSpeed = parseInt(baseSpeed);
        this.selectedProperty = selectedProperty;
        this.selectedModifier = selectedModifier;
        this.selectedValue = parseInt(selectedValue);
        this.coolValue = parseInt(coolValue);
        this.toughValue = parseInt(toughValue);
        this.beautifulValue = parseInt(beautifulValue);
        this.smartValue = parseInt(smartValue);
        this.cuteValue = parseInt(cuteValue);
        this.selectedNature = selectedNature;
        this.attack = parseInt(attack);
        this.specialAttack = parseInt(specialAttack);
        this.defense = parseInt(defense);
        this.specialDefense = parseInt(specialDefense);
        this.speed = parseInt(speed);
        this.storedMoves = JSON.parse(storedMoves); // Parse stored moves data back into an array
      }
    };
    reader.readAsText(file);
  }  
}
  
