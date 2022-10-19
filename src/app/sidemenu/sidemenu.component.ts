import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getDatabase, get, child, set, ref, onValue, update, remove} from "firebase/database";


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private route:Router ,
    private logService:LoginService,
    private auth: AuthService,
    ) { }

  userType:any;
  userName:any;
  user:any=[];

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType')
    this.userName = localStorage.getItem('token')
    this.invokeStripe();
    
  }

  moveToDashboard(){
    if(this.userType=='trainee'){
      this.route.navigate(['/dashboard'])
    }
    if(this.userType=='admin'){
      this.route.navigate(['/admin'])
    }
    if(this.userType=='instructor'){
      this.route.navigate(['/instructor'])
    }
  }

  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:
        'pk_test_51LrwlGHRCYk0ZxOUfoFhm4MUvTclK8XUGQTF34f5C9r8PKZR2DKgvtQuHyQAYe1UA0CwJzvxZMnvwRI9A0jBKZBE00xwpg2pO8',

      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
      },
    });

    paymentHandler.open({
      name: 'LifeLine Fitness Gym',
      description: 'Make Your Monthly Payment',
      amount: 720,
    });
    this.payment(); 

  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }

 

  }


  payment(){
    const db = getDatabase();

    this.user=[];

    let dt = '';

    
    const tip = ref(db, 'trainees/' + this.userName);
    onValue(tip, (snapshot) => {
      if(snapshot.val()){
        this.user = [snapshot.val()]
        dt = this.user[0].lastPayment
      }     
    })


    const customerDetails = ref(db, 'trainees/' + this.userName);
    onValue(customerDetails, (snapshot) => console.log(snapshot)
    )

    var today = new Date();
    var td = String(today.getDate()).padStart(2, '0');
    var tm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0'
    var tyyy = today.getFullYear();

    let todayDate = tm + '/' + td + '/' + tyyy;


    let da = new Date(dt);
    let newD = new Date(da.setMonth(da.getMonth()+1));

    var dd = String(newD.getDate()).padStart(2, '0');
    var mm = String(newD.getMonth() + 1).padStart(2, '0'); //January is 0'
    var yyyy = newD.getFullYear();

    let paidTillDate = mm + '/' + dd + '/' + yyyy;




    update(ref(db, 'trainees/' + this.userName), {
      lastPayment : paidTillDate,
      paidDate : todayDate
    });
    
  }

  logout(){
    this.auth.logout()
  }

}
