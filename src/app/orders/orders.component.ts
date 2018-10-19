import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

export interface IOrder {pid?: string, image?: string, description?: string, price?: number, quantity?: number}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  errorMessage:string = '';
  name:string = '';
  confirmMessage:string = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
  }

  async ngOnInit() {

  }

  displayOrder() {
    this.orders = [{
      "pid": "1",
      "image":"assets/sm_android.jpeg",
      "description": "Android",
      "price": 150.00,
      "quantity": 2
    }, {
      "pid": "2",
      "image":"assets/sm_iphone.jpeg",
      "description": "IPhone",
      "price": 200.00,
      "quantity": 1
    }, {
      "pid": "3",
      "image":"assets/sm_windows.jpeg",
      "description": "Windows Phone",
      "price": 110.00,
      "quantity": 2
    }]
  }

  delete(index: number) {
    this.orders.splice(index, 1);
  }

  addItem(item: string){
    switch(item) {
      case 'Android':
      this.orders.unshift({
        "pid": "1",
        "image":"assets/sm_android.jpeg",
        "description": "Android",
        "price": 150.00,
        "quantity": 1
      });
      break;

      case 'IPhone':
      this.orders.unshift({
        "pid": "2",
        "image":"assets/sm_iphone.jpeg",
        "description": "IPhone",
        "price": 200.00,
        "quantity": 1
      });
      break;

      case 'Windows Phone':
      this.orders.unshift({
        "pid": "3",
        "image":"assets/sm_windows.jpeg",
        "description": "Windows Phone",
        "price": 110.00,
        "quantity": 1
      });
      break;

    }
  }

  clear(){
    this.orders.map((item:IOrder, i: number) => {
      Object.keys(item).map((key: string) => {
      if(key != 'image'){
        item[key]='';
      } 
      return item;
    });
    });
  }

  calculateTotal(){
  
    const total = this.orders.reduce((acc: number, item: IOrder) => {
      acc +=item.quantity * item.price;
      return acc
    }, 0);
    const taxAmount = total * .1;
    const subTotal = total - taxAmount;
    const validated = this.validate(name, total, taxAmount, subTotal);
    if (!validated) {
      this.showMessage('error-Modal');
    } else {
      this.confirmMessage = this.setSuccessMessage(this.name, total, taxAmount, subTotal)
      this.showMessage('confirm-modal')
      
    }
  }

  showMessage(modalID: string){
    this.flexModal.openDialog(modalID)
  }

  setSuccessMessage(name: string, total: number, taxAmount: number, subTotal: number){
      const commaIndex = name.indexOf(', ');
      const firstName = name.slice(commaIndex, name.length);
      const lastName = name.slice(0, commaIndex);
      let output = `Thank you for your order ${firstName} ${lastName}. Your subtotal is: ${subTotal}, Your tax amount is: ${taxAmount}, and your end total is ${total}`;
      return output;

  }

  validate(name: string, total: number, taxAmount: number, subTotal: number) {
    this.errorMessage = ''
    if(!total) {
      this.errorMessage = 'Must execute Calculation'
      }
    if(name === ' ') {
        this.errorMessage = 'Name must not be empty!'
      } else if (name.indexOf(', ') === -1) {
        this.errorMessage = 'Name must have a comma and a space!';
      }
      if(this.errorMessage.length > 0) {
        return false;
      } else {
        return true;
      }
      }
  

}
