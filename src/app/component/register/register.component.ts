import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {HttpResponse} from '@angular/common/http';
import {MessageResponse} from '../../response/message-response';
import {UserSystemService} from '../../service/user-system.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  message?: string;
  myForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    specificAddress: ['', [Validators.required, Validators.maxLength(255)]],
    wards: ['', [Validators.required, Validators.maxLength(255)]],
    district: ['', [Validators.required, Validators.maxLength(255)]],
    province: ['', [Validators.required, Validators.maxLength(255)]]
  });

  constructor(private formBuilder: FormBuilder,
              protected userSystemService: UserSystemService,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.submitted = true;
    console.log(this.myForm.invalid);
    if (this.myForm.invalid) {
      return;
    }

    this.userSystemService.create(this.myForm.value).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;

        if (this.message === 'successfully') {
          Swal.fire('Thông báo', 'Đăng ký tài khoản thành công', 'success');
          this.router.navigate(['/home/main']);
        } else if (this.message === 'emailExisted') {
          Swal.fire('Thông báo', 'Email đã đăng ký', 'error');
        } else if (this.message === 'phoneExisted') {
          Swal.fire('Thông báo', 'Số điện thoại đã đăng ký', 'error');
        } else if (this.message === 'failed') {
          Swal.fire('Thông báo', 'Đăng ký không thành công', 'error');
        }
      }
    );
  }
  get f() {
    return this.myForm.controls;
  }
}
