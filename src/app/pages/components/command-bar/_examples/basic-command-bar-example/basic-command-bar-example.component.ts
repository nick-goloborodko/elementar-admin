import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommandBarPosition, EmrCommandBarModule } from '@elementar/components/command-bar';

@Component({
  selector: 'app-basic-command-bar-example',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule,
    EmrCommandBarModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './basic-command-bar-example.component.html',
  styleUrl: './basic-command-bar-example.component.scss'
})
export class BasicCommandBarExampleComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  open = false;
  positionOptions: CommandBarPosition[] = ['top', 'bottom'];
  position = new FormControl<CommandBarPosition>('bottom');

  ngOnInit() {
    this.position
      .valueChanges
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(() => {
        this.open = false;
      })
    ;
  }
}
