import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;

  constructor() {
    this.Woocommerce = WC({
      url: "https://digimiles.net/shop",
      consumerKey: "ck_728f76ca7e11d410f25936730dfc66389be0a6a4",
      consumerSecret: "cs_811b977be6695fc6687c80b4dc2362f78316ff25",
      wpAPI: true,
      version: 'wc/v1',
      queryStringAuth: true
    });

    this.WoocommerceV2 = WC({
      url: "https://digimiles.net/shop",
      consumerKey: "ck_728f76ca7e11d410f25936730dfc66389be0a6a4",
      consumerSecret: "cs_811b977be6695fc6687c80b4dc2362f78316ff25",
      wpAPI: true,
      version: "wc/v1"
    });
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }

}
