/* BHANU TEJ P
   The data service is used for maintaining state of data.
*/
import { Injectable } from '@angular/core';
// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class DataService {

  assetDetails = [];
  mainResults = [];

  public assetFullDetails = [];
  public searchWord;
  public mostViewed = [];
  public recentlyAdded = [];
  public annotationTypes = [];
  public annotations = [];
  public objectData:any = [];
  public advanceSearchData = [];
  public jobsData = [];
  public notificationCount = 0;

  constructor() { }

  storeMainResults(data) {
    this.mainResults = data;
  }

  storeAssetDetails(data) {
    this.assetDetails = data;
  }

  getAssetDetails() {
    return this.assetDetails;
  }

  getMainResults() {
    return this.mainResults;
  }

  setNotificationCount(count) {
     this.notificationCount = count;
  }

  getNotificationCount() {
    return this.notificationCount;
  }
}
