import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Para las habilidades y no tener que importar otra libreria para las tortas
import { MatSliderModule } from '@angular/material/slider';  // idem que MatProgresssBarModule

/*
export const MY_FORMATS = {
    parse: {
      dateInput: 'LL', 
    },
    display: {
      dateInput: 'DDDD MMMM YYYY', // this is the format showing on the input element
      monthYearLabel: 'DDDD MMMM YYYY', // this is showing on the calendar 
    },
  };

*/

@NgModule({
    imports: [
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        MatProgressBarModule,
        MatSliderModule
    ],
    exports: [
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        MatProgressBarModule,
        MatSliderModule
    ],
    /*
    providers: [
                {
                provide: MAT_DATE_FORMATS,
                useValue: MY_FORMATS
            },
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
        , {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUTC: true }
        }

    ]*/
})
export class MaterialModule { };
