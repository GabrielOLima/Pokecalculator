import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoveGeneratorComponent } from './move-generator/move-generator.component';

const routes: Routes = [
  {path: 'move-generator-component', component: MoveGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
