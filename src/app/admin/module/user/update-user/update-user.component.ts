import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/model/role';
import { UserSystem } from 'src/app/model/user-system';
import { RoleService } from 'src/app/service/role.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userSystem: UserSystem | null = null;

  submitted = false;
  message?: string;

  showAdminBoard = false;
  showModeratorBoard = false;

  roles: string[] = [];
  listCheckRole: Role[] = [];
  role: Role | null = null;

  myForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    specificAddress: ['',[Validators.required, Validators.maxLength(255)]],
    wards: ['', [Validators.required, Validators.maxLength(255)]],
    district: ['', [Validators.required, Validators.maxLength(255)]],
    province: ['', [Validators.required, Validators.maxLength(255)]]
  });

  constructor(
    private formBuilder: FormBuilder, 
    protected userSystemService: UserSystemService,
    protected roleService: RoleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params.id);
  }

  get f() {
    return this.myForm.controls;
  }

  findById(id: any): void {
    this.userSystemService.findById(id).subscribe(
      (res: HttpResponse<UserSystem>) => {
        this.userSystem = res.body;
        
        if(this.userSystem) {
          this.updateForm(this.userSystem);

          this.userSystem.roles?.forEach((value) => {
            this.roles.push(value.name || '');
            this.listCheckRole.push(value);
          });

          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showModeratorBoard = this.roles.includes('ROLE_USER');
        }
      }
    );
  }

  updateForm(userSystem: UserSystem): void {
    this.myForm.patchValue({
      id: userSystem.id,
      email: userSystem.email,
      fullName: userSystem.fullName,
      gender: userSystem.gender,
      dateOfBirth: userSystem.dateOfBirth,
      phone: userSystem.phone,
      specificAddress: userSystem.specificAddress,
      wards: userSystem.wards,
      district: userSystem.district,
      province: userSystem.province
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    
    const formData: FormData = new FormData();

    formData.append('userSystem', JSON.stringify(this.myForm.value));
    formData.append('role', JSON.stringify(this.listCheckRole));

    if(this.listCheckRole.length > 0) {
      this.userSystemService.update(formData).subscribe(
        response => {
          this.message = response.body?.message;
  
          if(this.message === 'successfully') {
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success');
          } else if(this.message === 'emailExisted') {
            Swal.fire('Thông báo', 'Email đã tồn tại', 'error');
          } else if(this.message === 'phoneExisted') {
            Swal.fire('Thông báo', 'Số điện thoại đã tồn tại', 'error');
          } else if(this.message === 'failed') {
            Swal.fire('Thông báo', 'Cập nhật không thành công', 'error');
          }
        }
      )
    } else {
      Swal.fire('Thông báo', 'Bạn chưa chọn quyền nào cho người dùng', 'error');
    }
  }

  handleCheckBoxA(checked: boolean, value: string): void {
    this.getValue(checked, value);
  }

  handleCheckBoxU(checked: boolean, value: string): void {
    this.getValue(checked, value);
  }

  getValue(checked: boolean, value: string): void {
    if(checked) {
      this.roleService.findByName({name: value}).subscribe(
        (res: HttpResponse<Role>) => {
          this.role = res.body;

          if(this.role) {
            this.listCheckRole.push(this.role);
          }
        }
      );      
    } else {
      this.listCheckRole?.forEach((item, index) => {
        if (item.name === value) {
          this.listCheckRole.splice(index, 1);
        }
      });
    }
  }

  onBack(): void {
    window.history.back();
  }

}
