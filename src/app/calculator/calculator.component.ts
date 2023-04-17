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

  calculateStats() {
    this.hp = Math.floor((this.baseHP / 10) * 2 + 20);
    this.attack = Math.floor(this.baseAttack / 10);
    this.specialAttack = Math.floor(this.baseSpecialAttack / 10);
    this.defense = Math.floor(this.baseDefense / 10);
    this.specialDefense = Math.floor(this.baseSpecialDefense / 10);
    this.speed = Math.floor(this.baseSpeed / 10);
  }
}