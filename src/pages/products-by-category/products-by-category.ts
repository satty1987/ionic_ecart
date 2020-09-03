import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
// import { ProductDetails } from '../product-details/product-details';

@IonicPage({})
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WP.init();
    const slug = this.category && this.category.slug  ? this.category.slug : "running-shoes";

    this.WooCommerce.getAsync("products?filter[category]=" + slug ).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategory');
  }

  loadMoreProducts(event) {
    this.page++;
    console.log("Getting page " + this.page);
    const slug = this.category && this.category.slug  ? this.category.slug : "running-shoes";

    this.WooCommerce.getAsync("products?filter[category]=" + slug + "&page=" + this.page).then((data) => {
      let temp = (JSON.parse(data.body));

      this.products = this.products.concat(JSON.parse(data.body))
      console.log(this.products);
      event.complete();

      if (temp.length < 10)
        event.enable(false);
    })
  }

  openProductPage(product){
    this.navCtrl.push('ProductDetails', {"product": product} );
  }

}
