import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { ShareDataService } from 'src/app/service/share-data.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import Swal from 'sweetalert2';
import {ShoppingCartService} from '../../service/shopping-cart.service';
import {ShoppingCartDTO} from '../../dto/ShoppingCartDTO';
import {DataSharingService} from '../../service/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  submitted = false;
  logined = false;
  message?: string;
  totalItem = 0;
  roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email?: string;
  categories?: Category[];
  searchValue: string;

  cartQuantity?: string;
  items: ShoppingCartDTO[] = [];
  myForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    specificAddress: ['',[Validators.required, Validators.maxLength(255)]],
    wards: ['', [Validators.required, Validators.maxLength(255)]],
    district: ['', [Validators.required, Validators.maxLength(255)]],
    province: ['', [Validators.required, Validators.maxLength(255)]]
  });
  total = 0;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]]
  });

  searchForm = this.formBuilder.group({
    name: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    protected userSystemService: UserSystemService,
    private tokenStorageService: TokenStorageService,
    protected loginService: LoginService,
    private router: Router,
    protected categoryService: CategoryService,
    protected shareDataService: ShareDataService,
    protected cartDataService: CartDataService,
    private dataSharingService: DataSharingService,
    protected cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.items = this.cartService.getItems();
    this.dataSharingService.total.subscribe( value => {
      this.totalItem = value;
    });
    this.dataSharingService.items.subscribe( value => {
      this.items = value;
    });
    this.total = this.cartService.getTotal();
    console.log('this.tokenStorageService.getToken()=', this.tokenStorageService.getToken());
    console.log('this.isLoggedIn', this.isLoggedIn);
    // this.items = this.cartService.getItems();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.body.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.email = user.body.email;

      // this.cartService.getQuantity().subscribe(
      //   (res: HttpResponse<MessageResponse>) => {
      //     this.cartQuantity = res.body?.message || '';
      //   }
      // )

      this.cartDataService.currentData.subscribe(
        res => {
          this.cartQuantity = res || '';
        }
      );
    }

    this.findByCategory();
  }
  onPayment(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/home/shopping-payment']);
    } else {
      this.router.navigate(['/home/login']);
    }
  }
  findByCategory(): void {
    this.categoryService.findByCategory().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  get f() {
    return this.myForm.controls;
  }

  get l() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.userSystemService.create(this.myForm.value).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;

        if (this.message === 'successfully') {
          Swal.fire('Thông báo', 'Đăng ký tài khoản thành công', 'success');
        } else if (this.message === 'emailExisted') {
          Swal.fire('Thông báo', 'Email đã đăng ký', 'error');
        } else if (this.message === 'phoneExisted') {
          Swal.fire('Thông báo', 'Số điện thoại đã đăng ký', 'error');
        } else if (this.message === 'failed') {
          Swal.fire('Thông báo', 'Đăng ký không thành công', 'error');
        }
      }
    )
  }

  onLogin(): void {
    this.logined = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe(
      result => {
        this.tokenStorageService.saveToken(result.body?.token || '');
        this.tokenStorageService.saveUser(result);

        let url = this.router.url;

        window.location.reload();

        this.router.navigate([url]);
      },
      err => {
        Swal.fire('Thông báo', 'Tài khoản đăng nhập không đúng', 'error');
      }
    );
  }

  onLogOut(): void {
    this.tokenStorageService.signOut();

    let url = this.router.url;

    window.location.reload();

    this.router.navigate([url]);
  }

  onPageAdmin(): void {
    this.router.navigate(["/home-admin"]);
  }

  onChangeLink(id:any): void {
    this.shareDataService.changeData(id);
    this.router.navigate(['/home/product-category/', id]);
  }

  onCart(): void {
    if(this.email) {
      this.router.navigate(['/home/product-cart']);
    } else {
      Swal.fire('Thông báo', 'Bạn chưa đăng ký hoặc đăng nhập tài khoản', 'warning');
    }

  }

  search(): void {
    console.log(this.searchForm.value);
    this.router.navigate(['/home/product-list'], { queryParams: { name: this.searchForm.value.name } });

  }
}
