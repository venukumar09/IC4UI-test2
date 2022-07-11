import { Component, OnInit,ViewChild } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router'
import {LoginService} from 'src/app/shared/services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
   autocomplete:String="off";
   public router: Router;
   public form: FormGroup;
   public userid: AbstractControl;
   public password: AbstractControl;
 
   UserDetails: any;
   requestedData: any;
   screenoperationsData: any
   foucsedInput: any;
   signinForm: FormGroup;
   org_id: any;

  constructor(private storage: LocalStorageService,router: Router,private service:LoginService, private loader : NgxSpinnerService) {
    this.router = router;
    this.UserDetails = [];
    this.screenoperationsData = [];
   }
  
  ngOnInit() {
    // this.storage.store('token','asdfasdfasd')
    if(this.storage.retrieve('token')){
      this.router.navigate(['home'])
    }
    this.signinForm = new FormGroup({
      userid: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      // rememberMe: new FormControl(false)
    })
  }

  ngAfterViewInit() {
    document.getElementById('preloader').style['display'] = 'none';
  }

  signin() {
    const signinData = this.signinForm.value;
    
    const data = { username: signinData.userid, password: signinData.password, apn_id: "MDR" };
     this.loader.show();
    console.log(data)
    this.service.loginpost(this.service.getloginuserdetails_ep, data).subscribe((res) => {
      if (res != "User Invalid") {
        this.UserDetails = res.login_details;
        this.screenoperationsData = res.screen_operations;
        console.log(res)
        // localStorage.setItem('userid',res.login_details.usr_id)
        // console.log(localStorage.getItem('userid'))
        // localStorage.setItem('userorgid',res.login_details.usr_org_id)
        this.userid = this.UserDetails[0].usr_id;
        this.saveLoginUserData(this.UserDetails[0], res.token, res.loginuser_lobs, res.loginuser_apns, res.loginuser_preferences,res.validate);
        // console.log(res)
        this.router.navigate(['home']);
         this.loader.hide();
        this.org_id = this.UserDetails[0].org_id;
         this.getUrls();
      }
      else {
        this.loader.hide();
        alert("Your login information is incorrect. Please try again.")
        // this.toast.showerror('Your login information is incorrect. Please try again.');
      }
    }, err => {
      if (err.status == 401) {
        this.loader.hide();

        // this.toast.showerror('Your login information is incorrect. Please try again.');
        alert('Your login information is incorrect. Please try again.')
      } else {
        this.loader.hide();
        // this.toast.showerror('Internal Server Error. Please try again.');
        alert('Internal Server Error. Please try again.')
      }
    });
  }

  public saveLoginUserData(data, token, lobs, apns, preferences,validate) {
    this.storage.store('roleId', data.usr_role_grp_id);
    this.storage.store('userName', data.usr_nm);
    this.storage.store('userId', data.usr_id);
    this.storage.store('token', token);
    this.storage.store('orgId', data.usr_org_id);
    this.storage.store("orgName", data.usr_org_nm);
    this.storage.store('lobs', lobs);
    this.storage.store('apns', apns);
    this.storage.store('preferences', preferences);
    this.storage.store('val', validate);

    if (this.screenoperationsData.length > 0)
      this.storage.store('ScreenPermissions', this.screenoperationsData);
    else
      this.storage.store('ScreenPermissions', "");
  }

  getUrls() {
    // this.service.urls = [];
    this.service.get(`${this.service.getUrls_ep}?org_id=${this.org_id}`).subscribe(res => {
      res.airflow  = res.airflow + '?user=' + this.userid;
      this.storage.store('urls', res);
    }, err => {
      //this.toast.showerror('Got Error!!! Please re-login into application. If problem persists contact admin.');
    });

  }  
 }
