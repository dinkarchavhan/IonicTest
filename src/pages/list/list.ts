import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  itemsOfResult: Array<any>;
  itemList: Observable<any>;
  public loadedItemList: Array<any>;
  count:number=2;
  searchTerm = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient) {
    this.itemsOfResult = [];
    this.loadedItemList = [];
    this.itemList = this.httpClient.get('https://rickandmortyapi.com/api/character/?page=1');
    this.itemList.subscribe(response =>{
      for (let i = 0; i < response.results.length; i++) {
        this.itemsOfResult.push(response.results[i]);
        this.loadedItemList.push(response.results[i]);
      }     
      console.log(response.results);      
    })  
  }

  //Navigation on details page
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push('DetailsPage', {item: item});
  }


  /* List search in Home page */
  searchItems(searchbar) {
    this.resetChanges();
      // set q to the value of the searchbar
    const q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.itemsOfResult = this.itemsOfResult.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return v.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
        }
        return false;
      }
    });
  }


  /* List search Reset Home page */
  protected resetChanges = () => {
    this.itemsOfResult = this.loadedItemList;
  }

  loadMoreData(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      let url = 'https://rickandmortyapi.com/api/character/?page=';
      this.itemList = this.httpClient.get(url + this.count++);
      this.itemList.subscribe(response =>{
      for (let i = 0; i < response.results.length; i++) {
        this.itemsOfResult.push(response.results[i]);
        this.loadedItemList.push(response.results[i]);
      }     
      console.log(response.results);      
    })  
      // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
  }
}
