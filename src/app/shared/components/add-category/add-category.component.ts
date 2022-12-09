import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryRequest } from '../../models/category-request.model';
import { Category } from '../../models/category.model';
import { ApiClientService } from '../../services/api-client.service';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  isLoading: boolean = false;

  formData = new FormGroup({
    nameControl: new FormControl(''),
    descriptionControl: new FormControl(''),
  });

  constructor(private apiClient: ApiClientService, public dialogRef: MatDialogRef<AddCategoryComponent>, private snackBar: MatSnackBar) {}

  onSubmit() {
    if(!this.formData.invalid
      && this.formData.controls.nameControl.value
      && this.formData.controls.descriptionControl.value) {

      const _name = this.formData.controls.nameControl.value;
      const _description = this.formData.controls.descriptionControl.value;
      let obj: Category = {
        name: _name,
        description: _description
      };
      this.apiClient.addCategory(obj).subscribe({
        next: (res: CategoryRequest) => {
          this.dialogRef.close();
          this.snackBar.open("Successful", "", {
            duration: 1000,
            panelClass: ['green-snackbar'],
          });
        }, error: (err: any) => {
          alert('Error adding category, see console for detials.');
          console.log(err);
        }
      })
      
    } else {
      alert("Form is invalid");
    }
  }
}
