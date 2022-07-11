import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //  apiUrl = environment.local_api;
   apiUrl = environment.server_api;

  constructor(private http: HttpClient) {

  }

  // common
  get_orgs =  `${this.apiUrl}getorgdata/`
  get_lobs = `${this.apiUrl}getlobdatabyorgid/`;
  get_applications = `${this.apiUrl}getapplicationdatabylobid/`;
  getUrls_ep = `${this.apiUrl}getUrls/`;
  get_count = `${this.apiUrl}counts/`;

  //SearchData
  suggestions=`${this.apiUrl}suggestions/`;
  mainSearch=`${this.apiUrl}mainSearch/`;
  assetDetails_ep = `${this.apiUrl}assetDetails/`;
  // connectors
  get_connector_types = `${this.apiUrl}getconnectorTypes/`;
  get_connection_env = `${this.apiUrl}get_connection_env/`;
  createnewdbconnection = `${this.apiUrl}createnewdbconnection/`;
  createnewfileconnection = `${this.apiUrl}createnewfileconnection/`;
  viewconnections = `${this.apiUrl}viewconnections/`;
  delete_connection = `${this.apiUrl}delete_connection/`;
  insert_template_data = `${this.apiUrl}bulkuploadloadtables/`;
  test_connection = `${this.apiUrl}testconnection/`;
  databasesbyconnid=`${this.apiUrl}getdatabasesbyconnid/`
  // Admin Creation
  orgcreation=`${this.apiUrl}orgcreation/`
  lobcreation=`${this.apiUrl}lobcreation/`
  appcreation=`${this.apiUrl}application/`
  usrcreation=`${this.apiUrl}createuser/`
  usrorgadmincreation=`${this.apiUrl}createorgadmin/`
  // Admin list
  orglist=`${this.apiUrl}organizationlistapi/`
  applicationlist=`${this.apiUrl}applicationlistapi/`
  loblist=`${this.apiUrl}lineofbusinesslistapi/`
  usrlist=`${this.apiUrl}getalluserslist/`
  // register
  validatetables=`${this.apiUrl}validatetables/`;
  gettableslist=`${this.apiUrl}gettableslist/`;
  gettableslistforfile=`${this.apiUrl}getFileObjectNames/`;
  bulkuploadobject = `${this.apiUrl}bulkuploadobj/`;
  connectionnames=`${this.apiUrl}getconnnames/`
  getschemaslist=`${this.apiUrl}getschemalist/`;

  getschemaslistforfile=`${this.apiUrl}getApplicationNames/`;
  getPcsList = `${this.apiUrl}listpcs/`;
  getDatasourceList = `${this.apiUrl}listdatasources/`;
  getPlatformsList = `${this.apiUrl}listplatforms/`;
  getPcsParams = `${this.apiUrl}listpcsparm/`;
  getDBList = `${this.apiUrl}listdbnames/`;
  getObjectList = `${this.apiUrl}listobjects/`;
  getObjects = `${this.apiUrl}listsearchobjects/`;
  curateJob = `${this.apiUrl}curatejob/`;
  runmdmloadingjob =`${this.apiUrl}runmdmloadingjob/`;
  runmdmloadingfilejob =`${this.apiUrl}runmdmloadingfilejob/`;
  addconnectorjobs=`${this.apiUrl}addconnectorjobs/`;
  extracttablemetadata=`${this.apiUrl}extracttablemetadata/`;
  ViewSchedulingMDMJobs=`${this.apiUrl}ViewSchedulingMDMJobs/`;
  //getPcsParams = `${this.apiUrl}listparams/`;
  test_file_connection=`${this.apiUrl}testFileConnection/`;
  getschemastables=`${this.apiUrl}getschemastables/`;
  getcolumndetails=`${this.apiUrl}getcolumndetails/`;
  getcolumndetailsforfile=`${this.apiUrl}getFileObjectDetails/`;
  submitconnection=`${this.apiUrl}submitconnection/`;
  ing_source_and_defaults_ep = `${this.apiUrl}ingSourceAndDefaults/`;
  scheduleNames_ep = `${this.apiUrl}getScheduleNames/`;
  calenderNames_ep = `${this.apiUrl}getCalenderNames/`;
  update_Source_target_details_ep = `${this.apiUrl}updateSourceTargetDetails/`;
  convertDataTypes_ing_ep = `${this.apiUrl}convertDataTypes_ing/`;
  updateJobDetails_ep = `${this.apiUrl}updateJobDetails/`;
  injectionUrl = `${this.apiUrl}auto/job_template`;
  insertupdateconndetails =`${this.apiUrl}insertupdateconndetails/`;
  saveTemplate=`${this.apiUrl}saveTemplate/`;
  jobTemplates_ep = `${this.apiUrl}jobTemplates/`;
  getProcessByTemplate = `${this.apiUrl}getProcessByTemplate/`;
  getmdmjobnames=`${this.apiUrl}getmdmjobnames/`;

  // dim builder
  dimBuilderSuggestions = `${this.apiUrl}dimBuilder_Suggestions/`;
  dimBuilderSourceDetails = `${this.apiUrl}dimBuilder_SourceDetails/`;
  registerDimTargetObject = `${this.apiUrl}register_DimTarget_Object/`;
  dim_scheduler = `${this.apiUrl}dim_scheduler/`;
  dimDBPlatforms = `${this.apiUrl}getdb_platforms/`;
  generateSQL = `${this.apiUrl}generate_sql/`
  saveDimJob = `${this.apiUrl}save_dim_job/`
  getDimJobsByUser = `${this.apiUrl}get_dim_jobs_by_usr/`;
  saveDimJobState = `${this.apiUrl}save_dim_job_state/`;
  dimJobDetailsById = `${this.apiUrl}dim_job_details_by_id/`;
  dimConnections = `${this.apiUrl}get_dim_connections/`;

  extract_config_data_ep = `${this.apiUrl}extract_config_data/`;
  passiveProfiling_data_ep = `${this.apiUrl}passiveProfiling_data/`;

  getRulesByType_ep = `${this.apiUrl}getRulesByType/`;
  getDqRulesByObj_ep = `${this.apiUrl}dqRulesByObj/`;
  saveDqRules_ep = `${this.apiUrl}saveDqRules/`;
  addNewDqRule = `${this.apiUrl}addNewDqRule/`;
  saveStandardRules_ep = `${this.apiUrl}saveStandardRules/`;

  // streaming dq
  getStreamingRules_ep = `${this.apiUrl}streamingRules/`;
  saveStreamingDqRules_ep = `${this.apiUrl}saveStreamingDqRules/`;
  getStreamingDqRulesByObj_ep = `${this.apiUrl}streamingDqRulesByObj/`;
  streamingDQAssetDetails_ep = `${this.apiUrl}streamingDQAssetDetails/`;
  // triggerStreamingJob_ep = 'http://192.168.168.26:5000/api/jobs/trigger';
  getStreamingJobURL_ep = `${this.apiUrl}streamingJobUrl/`;
  saveNewDQRule = `${this.apiUrl}saveNewDQRule/`;

  //get screens
  scrnlist =  `${this.apiUrl}listscreens/`;
  scrnoperlist =  `${this.apiUrl}listscreenoperations/`;
  getroless =  `${this.apiUrl}getroles/`;
  addscreen =  `${this.apiUrl}addscreen/`;
  addscreenoperations =  `${this.apiUrl}addscreenoperations/`;
  getrolescreenoperatns =  `${this.apiUrl}getrolescreenoperations/`;
  CreateRoleAccessPrevilage =  `${this.apiUrl}createroleaccessprevilage/`;
  // CreateRoleAccessPrevilage =  `${this.apiUrl}createroleaccessprevilage/`;

  //form based ingestion
  getsourcedetails = `${this.apiUrl}form_ingSourceAndDefaults/`;
  form_getCalenderNames = `${this.apiUrl}form_getCalenderNames/`;
  form_convertDataTypes_ing = `${this.apiUrl}form_convertDataTypes_ing/`;
  form_update_Source_target_details_ep = `${this.apiUrl}form_updateSourceTargetDetails/`;
  form_getScheduleNames = `${this.apiUrl}form_getScheduleNames/`;
  form_jobTemplates = `${this.apiUrl}form_jobTemplates/`;
  getProcessList = `${this.apiUrl}form_getprocessparams/`;
  form_injectionUrl = `${this.apiUrl}auto/form_job_template`;
  form_injectionUrlNew = `${this.apiUrl}auto/form_job_template_new`;
  getairflowurl = `${this.apiUrl}get_airflowurl/`;

  //
  cdeDqAssetDetails = `${this.apiUrl}cdeDQAssetDetails/`;
  getCDEDqRulesByObj = `${this.apiUrl}getCDEDqRulesByObj/`;
  validateDQRule = `${this.apiUrl}validateDQRule/`;

  //annotation
  addAnnotation_ep = `${this.apiUrl}createAssetCollaborations/`;
  getAnnotationTypes_ep = `${this.apiUrl}getCollaborationTypes/`;
  getAnnotations_ep = `${this.apiUrl}getAllAssetCollaborations/`;

  updateSourceColumns =  `${this.apiUrl}updateSourceColumnDetails/`;
  getProfilingData = `${this.apiUrl}getProfilingData/`;

  post(url, data): Observable<any> {
    // let token = this.storage.retrieve('token');
    const httpOptions = {
      // headers: new HttpHeaders({
      //   'Authorization': 'JWT ' + token
      // })
    };
    return this.http.post(url, data, httpOptions);
  }

  get(url): Observable<any> {
    // this.loader.show();
    // let token = this.storage.retrieve('token');
    const httpOptions = {
      // headers: new HttpHeaders({
      //   'Authorization':  'JWT ' + token
      // })
    };
    return this.http
      .get(url, httpOptions)
      .pipe()
  }

}
