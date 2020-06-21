import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule  } from 'angular-feather';
import { Camera, Heart, Github,Smile } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Smile
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
