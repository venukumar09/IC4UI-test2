import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

import * as dagreD3 from "dagre-d3";
import * as d3 from "d3";
declare var $: any;
import * as cloneDeep from 'lodash/cloneDeep';
import { ApiService } from '../../../shared/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dim-builder',
  templateUrl: './dim-builder.component.html',
  styleUrls: ['./dim-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DimBuilderComponent implements OnInit {

  isNewJob = true;
  showJobs = true;
  job = {
    id : '',
    name: '',
    description: '',
    jobType: 'DIM_FACT',
    projectId: '12345',
    apnId: '',
    lobId : '',
    connId:''
  }

  _nodes =  [
    {
      "name": "acc_dtl",
      "id": "Source_1586669491433",
      "class": "source",
      "shape": "rect",
      "img": "src",
      "type": "S",
      "checked": false,
      "data": {
        "id": "2e9da73c428173619c7e0cf9490fbc5c",
        "name": "acc_dtl",
        "details": {
          "id": "2e9da73c428173619c7e0cf9490fbc5c",
          "dat_src_nm": "postgre_demo125",
          "ln_of_bsn_nm": "Life Insurance",
          "apn_nm": "CRM",
          "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
          "prgm_id": "-1",
          "prj_id": "-1",
          "apn_id": "494cb3b121460307859ccf42faf341a5",
          "sub_apn_id": "-1",
          "obj_phy_nm": "Account_dtl_v",
          "obj_type_nm": "View",
          "site_id": "a02abac05e79345b5921363039c04e64",
          "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/2e9da73c428173619c7e0cf9490fbc5c",
          "obj_schm_nm": "gathi_ins_intgn_v",
          "obj_db_pltfm_nm": "HIVE",
          "obj_lyr_nm": "intzone-gathi",
          "obj_ownr_id": "kalyan",
          "obj_dat_dmn_nm": "dummy",
          "obj_fnl_dmn_nm": null,
          "src_apn_identifer": null,
          "obj_dat_stwd_id": null,
          "rec_lst_updt_ts": "2020-04-07T11:16:32.526231",
          "rec_lst_updt_by_id": "kalyan",
          "org_id": "7248518a1808eae38650458ce81ba05a",
          "obj_bsn_nm": "Account_dtl",
          "obj_desc_txt": "test",
          "obj_fmt_type_nm": "Parquet",
          "clnt_dat_shrbl_ind": "Y",
          "obj_frq_nm": null,
          "obj_rttn_day_cnt": null,
          "obj_trst_lvl_pct": null,
          "obj_trst_lvl_rsn_txt": null,
          "file_dlmt_cd": "    ",
          "obj_low_rec_cnt": null,
          "obj_high_rec_cnt": null,
          "obj_lst_arc_dt": null,
          "obj_arc_loc_txt": null,
          "obj_prvc_lvl_txt": null,
          "obj_ver_nbr": null,
          "obj_size_txt": "0.03 MB",
          "obj_char_set_nm": null,
          "obj_url_txt": null,
          "obj_lst_mdfd_ts": null,
          "obj_lst_mdfd_by_id": null,
          "obj_crtd_ts": "2020-04-07T06:55:23.057758",
          "obj_crtd_by_id": "kalyan",
          "std_obj_nm": null,
          "tab_prpt_txt": null,
          "prtn_infmn_txt": null,
          "index_infmn_txt": null,
          "lst_clt_stats_ts": null,
          "purge_frq_days_cnt": null,
          "obj_rows_cnt": 3,
          "obj_arc_frq_nm": null,
          "obj_load_type_nm": "Delta",
          "crtfy_lvl_1_ind": null,
          "crtfy_lvl_2_ind": null,
          "crtfy_lvl_3_ind": null,
          "dmc_crtfy_dt": null,
          "dmc_crtfy_sta_cd": null,
          "is_gldn_obj_flg": null,
          "snstvty_cls_txt": null,
          "dmc_approver_id": null,
          "dat_stwd_crtfy_appr_rqst_dt": null,
          "obj_prpt_cnt": null,
          "lnd_file_path_txt": "NA",
          "lnd_file_nm": "NA",
          "cntl_file_nm": null,
          "sub_area_nm": "",
          "dl_raw_site_id": "a02abac05e79345b5921363039c04e64",
          "arc_site_id": null,
          "dl_raw_loc_txt": "s3://rawzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c",
          "dl_raw_obj_type_nm": "file",
          "rmv_hdr_rec_ind": "N",
          "rmv_trlr_rec_ind": null,
          "err_thrshd_pct_nbr": null,
          "wrng_thrshd_pct_nbr": null,
          "end_of_ln_sep_cd": null,
          "prflg_zn_site_id": "a02abac05e79345b5921363039c04e64",
          "prflg_zn_loc_txt": "s3://profzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c"
        },
        "attributes": [
          {
            "id": "7ea045717f0e35f06ec69bbb35fac231",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 1
          },
          {
            "id": "d1dda5558af654deacbdabdc5be260c4",
            "assetName": "Cust_Name",
            "dataType": "string",
            "dataTypeLength": "30",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 2
          },
          {
            "id": "f32ceb4274b420b7eff32051ae5352eb",
            "assetName": "Address1",
            "dataType": "string",
            "dataTypeLength": "40",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 3
          },
          {
            "id": "ce8b39d38982fe38f5417afa5d09592b",
            "assetName": "City",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 4
          },
          {
            "id": "bc12e6013bc0747adeec9fdf45de3863",
            "assetName": "State",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 5
          },
          {
            "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
            "assetName": "PIN",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 6
          },
          {
            "id": "d63fea48cf2c09d4c0f4ac1c47a7f806",
            "assetName": "rec_id",
            "dataType": "int",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 7
          },
          {
            "id": "aee30050f374eedc6b03d2902c0b24de",
            "assetName": "run_id",
            "dataType": "string",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 8
          },
          {
            "id": "c061f528e9cb547db2ba4aa91e056ff4",
            "assetName": "eff_strt_ts",
            "dataType": "timestamp",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 9
          },
          {
            "id": "5c75966ec625f4cf0d14674e7b411637",
            "assetName": "eff_end_ts",
            "dataType": "timestamp",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 10
          }
        ]
      }
    },
    {
      "name": "cust_dtl",
      "id": "Source_1586669494057",
      "class": "source",
      "shape": "rect",
      "img": "src",
      "type": "S",
      "checked": false,
      "data": {
        "id": "14e49ac6773456c164a21ea673d57012",
        "name": "cust_dtl",
        "details": {
          "id": "14e49ac6773456c164a21ea673d57012",
          "dat_src_nm": "postgre_demo12567test",
          "ln_of_bsn_nm": "Life Insurance",
          "apn_nm": "CRM",
          "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
          "prgm_id": "-1",
          "prj_id": "-1",
          "apn_id": "494cb3b121460307859ccf42faf341a5",
          "sub_apn_id": "-1",
          "obj_phy_nm": "CUSTOMER_DTL_v",
          "obj_type_nm": "View",
          "site_id": "6b668c5251c559361709c41538587461",
          "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/14e49ac6773456c164a21ea673d57012",
          "obj_schm_nm": "gathi_ins_intgn_v",
          "obj_db_pltfm_nm": "HIVE",
          "obj_lyr_nm": "intzone-gathi",
          "obj_ownr_id": "kalyan",
          "obj_dat_dmn_nm": "dummy",
          "obj_fnl_dmn_nm": null,
          "src_apn_identifer": null,
          "obj_dat_stwd_id": null,
          "rec_lst_updt_ts": "2020-04-07T13:36:58.1969",
          "rec_lst_updt_by_id": "kalyan",
          "org_id": "7248518a1808eae38650458ce81ba05a",
          "obj_bsn_nm": "CUSTOMER_DTL",
          "obj_desc_txt": "test",
          "obj_fmt_type_nm": "Parquet",
          "clnt_dat_shrbl_ind": "Y",
          "obj_frq_nm": null,
          "obj_rttn_day_cnt": null,
          "obj_trst_lvl_pct": null,
          "obj_trst_lvl_rsn_txt": null,
          "file_dlmt_cd": null,
          "obj_low_rec_cnt": null,
          "obj_high_rec_cnt": null,
          "obj_lst_arc_dt": null,
          "obj_arc_loc_txt": null,
          "obj_prvc_lvl_txt": null,
          "obj_ver_nbr": null,
          "obj_size_txt": "0.02 MB",
          "obj_char_set_nm": null,
          "obj_url_txt": null,
          "obj_lst_mdfd_ts": null,
          "obj_lst_mdfd_by_id": null,
          "obj_crtd_ts": "2020-04-07T13:36:58.196898",
          "obj_crtd_by_id": "kalyan",
          "std_obj_nm": null,
          "tab_prpt_txt": null,
          "prtn_infmn_txt": null,
          "index_infmn_txt": null,
          "lst_clt_stats_ts": null,
          "purge_frq_days_cnt": null,
          "obj_rows_cnt": 11,
          "obj_arc_frq_nm": null,
          "obj_load_type_nm": "Delta",
          "crtfy_lvl_1_ind": null,
          "crtfy_lvl_2_ind": null,
          "crtfy_lvl_3_ind": null,
          "dmc_crtfy_dt": null,
          "dmc_crtfy_sta_cd": null,
          "is_gldn_obj_flg": null,
          "snstvty_cls_txt": null,
          "dmc_approver_id": null,
          "dat_stwd_crtfy_appr_rqst_dt": null,
          "obj_prpt_cnt": null,
          "lnd_file_path_txt": null,
          "lnd_file_nm": null,
          "cntl_file_nm": null,
          "sub_area_nm": "Claims",
          "dl_raw_site_id": null,
          "arc_site_id": null,
          "dl_raw_loc_txt": null,
          "dl_raw_obj_type_nm": null,
          "rmv_hdr_rec_ind": null,
          "rmv_trlr_rec_ind": null,
          "err_thrshd_pct_nbr": null,
          "wrng_thrshd_pct_nbr": null,
          "end_of_ln_sep_cd": null,
          "prflg_zn_site_id": null,
          "prflg_zn_loc_txt": null
        },
        "attributes": [
          {
            "id": "40e3090a08ca4377075e6bb6199c3b51",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "N",
            "isPK": "Y",
            "isFK": "N",
            "orderNumber": 1
          },
          {
            "id": "b0c69582cbd985cdbb2afea20d0b5f73",
            "assetName": "Cust_Name",
            "dataType": "string",
            "dataTypeLength": "30",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 2
          },
          {
            "id": "c454446706ccb10f6d7a2b31ae909cbd",
            "assetName": "Address1",
            "dataType": "string",
            "dataTypeLength": "40",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 3
          },
          {
            "id": "936d5064626fed28c7709aaec10323ed",
            "assetName": "City",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 4
          },
          {
            "id": "d18f55de099af8071ab2dccf534d7321",
            "assetName": "State",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 5
          },
          {
            "id": "56d1da32709e3393d5b81db9d3cfddec",
            "assetName": "PIN",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 6
          },
          {
            "id": "8f069ed974c65af919c942e54ceb8dc9",
            "assetName": "rec_id",
            "dataType": "int",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 7
          },
          {
            "id": "9986562e17971ddd1aaea94ba479c2e7",
            "assetName": "run_id",
            "dataType": "string",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 8
          },
          {
            "id": "e23b761ef993e4fd72c7b7c1c2694a48",
            "assetName": "eff_strt_ts",
            "dataType": "timestamp",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 9
          },
          {
            "id": "f4d9fcc80248ee94f22efdf358864cea",
            "assetName": "eff_end_ts",
            "dataType": "timestamp",
            "dataTypeLength": "",
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 10
          }
        ]
      }
    },
    {
      "name": "cust_map",
      "id": "Mapper_1586669496112",
      "class": "mapper",
      "shape": "ellipse",
      "img": "mapper",
      "type": "M",
      "checked": false,
      "data": {
        "name": "cust_map",
        "id": "",
        "details": "",
        "attributes": [
          {
            "id": "40e3090a08ca4377075e6bb6199c3b51",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "N",
            "isPK": "Y",
            "isFK": "N",
            "orderNumber": 1,
            "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586669654418",
            "tfm_rul_txt": "Account_no",
            "obj_prpt_nm": "Account_no"
          },
          {
            "id": "b0c69582cbd985cdbb2afea20d0b5f73",
            "assetName": "Cust_Name",
            "dataType": "string",
            "dataTypeLength": "30",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 2,
            "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586669654418",
            "tfm_rul_txt": "ltrim(Cust_Name)",
            "obj_prpt_nm": "Cust_Name"
          },
          {
            "id": "c454446706ccb10f6d7a2b31ae909cbd",
            "assetName": "Address1",
            "dataType": "string",
            "dataTypeLength": "40",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 3,
            "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586669654418",
            "tfm_rul_txt": "Address1"
          }
        ],
        "filterCondition": "cust_map filter con",
        "output": "",
        "source": {
          "name": "cust_dtl",
          "data": {
            "id": "14e49ac6773456c164a21ea673d57012",
            "name": "cust_dtl",
            "details": {
              "id": "14e49ac6773456c164a21ea673d57012",
              "dat_src_nm": "postgre_demo12567test",
              "ln_of_bsn_nm": "Life Insurance",
              "apn_nm": "CRM",
              "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
              "prgm_id": "-1",
              "prj_id": "-1",
              "apn_id": "494cb3b121460307859ccf42faf341a5",
              "sub_apn_id": "-1",
              "obj_phy_nm": "CUSTOMER_DTL_v",
              "obj_type_nm": "View",
              "site_id": "6b668c5251c559361709c41538587461",
              "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/14e49ac6773456c164a21ea673d57012",
              "obj_schm_nm": "gathi_ins_intgn_v",
              "obj_db_pltfm_nm": "HIVE",
              "obj_lyr_nm": "intzone-gathi",
              "obj_ownr_id": "kalyan",
              "obj_dat_dmn_nm": "dummy",
              "obj_fnl_dmn_nm": null,
              "src_apn_identifer": null,
              "obj_dat_stwd_id": null,
              "rec_lst_updt_ts": "2020-04-07T13:36:58.1969",
              "rec_lst_updt_by_id": "kalyan",
              "org_id": "7248518a1808eae38650458ce81ba05a",
              "obj_bsn_nm": "CUSTOMER_DTL",
              "obj_desc_txt": "test",
              "obj_fmt_type_nm": "Parquet",
              "clnt_dat_shrbl_ind": "Y",
              "obj_frq_nm": null,
              "obj_rttn_day_cnt": null,
              "obj_trst_lvl_pct": null,
              "obj_trst_lvl_rsn_txt": null,
              "file_dlmt_cd": null,
              "obj_low_rec_cnt": null,
              "obj_high_rec_cnt": null,
              "obj_lst_arc_dt": null,
              "obj_arc_loc_txt": null,
              "obj_prvc_lvl_txt": null,
              "obj_ver_nbr": null,
              "obj_size_txt": "0.02 MB",
              "obj_char_set_nm": null,
              "obj_url_txt": null,
              "obj_lst_mdfd_ts": null,
              "obj_lst_mdfd_by_id": null,
              "obj_crtd_ts": "2020-04-07T13:36:58.196898",
              "obj_crtd_by_id": "kalyan",
              "std_obj_nm": null,
              "tab_prpt_txt": null,
              "prtn_infmn_txt": null,
              "index_infmn_txt": null,
              "lst_clt_stats_ts": null,
              "purge_frq_days_cnt": null,
              "obj_rows_cnt": 11,
              "obj_arc_frq_nm": null,
              "obj_load_type_nm": "Delta",
              "crtfy_lvl_1_ind": null,
              "crtfy_lvl_2_ind": null,
              "crtfy_lvl_3_ind": null,
              "dmc_crtfy_dt": null,
              "dmc_crtfy_sta_cd": null,
              "is_gldn_obj_flg": null,
              "snstvty_cls_txt": null,
              "dmc_approver_id": null,
              "dat_stwd_crtfy_appr_rqst_dt": null,
              "obj_prpt_cnt": null,
              "lnd_file_path_txt": null,
              "lnd_file_nm": null,
              "cntl_file_nm": null,
              "sub_area_nm": "Claims",
              "dl_raw_site_id": null,
              "arc_site_id": null,
              "dl_raw_loc_txt": null,
              "dl_raw_obj_type_nm": null,
              "rmv_hdr_rec_ind": null,
              "rmv_trlr_rec_ind": null,
              "err_thrshd_pct_nbr": null,
              "wrng_thrshd_pct_nbr": null,
              "end_of_ln_sep_cd": null,
              "prflg_zn_site_id": null,
              "prflg_zn_loc_txt": null
            },
            "attributes": [
              {
                "id": "40e3090a08ca4377075e6bb6199c3b51",
                "assetName": "Account_no",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "N",
                "isPK": "Y",
                "isFK": "N",
                "orderNumber": 1
              },
              {
                "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                "assetName": "Cust_Name",
                "dataType": "string",
                "dataTypeLength": "30",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 2
              },
              {
                "id": "c454446706ccb10f6d7a2b31ae909cbd",
                "assetName": "Address1",
                "dataType": "string",
                "dataTypeLength": "40",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 3
              },
              {
                "id": "936d5064626fed28c7709aaec10323ed",
                "assetName": "City",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 4
              },
              {
                "id": "d18f55de099af8071ab2dccf534d7321",
                "assetName": "State",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 5
              },
              {
                "id": "56d1da32709e3393d5b81db9d3cfddec",
                "assetName": "PIN",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 6
              },
              {
                "id": "8f069ed974c65af919c942e54ceb8dc9",
                "assetName": "rec_id",
                "dataType": "int",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 7
              },
              {
                "id": "9986562e17971ddd1aaea94ba479c2e7",
                "assetName": "run_id",
                "dataType": "string",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 8
              },
              {
                "id": "e23b761ef993e4fd72c7b7c1c2694a48",
                "assetName": "eff_strt_ts",
                "dataType": "timestamp",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 9
              },
              {
                "id": "f4d9fcc80248ee94f22efdf358864cea",
                "assetName": "eff_end_ts",
                "dataType": "timestamp",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 10
              }
            ]
          }
        },
        "keys": "Account_no"
      }
    },
    {
      "name": "acct_dtl_map",
      "id": "Mapper_1586669500215",
      "class": "mapper",
      "shape": "ellipse",
      "img": "mapper",
      "type": "M",
      "checked": false,
      "data": {
        "name": "acct_dtl_map",
        "id": "",
        "details": "",
        "attributes": [
          {
            "id": "7ea045717f0e35f06ec69bbb35fac231",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 1,
            "uniqueId": "7ea045717f0e35f06ec69bbb35fac231_1586669684713",
            "tfm_rul_txt": "Account_no"
          },
          {
            "id": "ce8b39d38982fe38f5417afa5d09592b",
            "assetName": "City",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 4,
            "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586669684713",
            "tfm_rul_txt": "lower(City)",
            "obj_prpt_nm": "City"
          },
          {
            "id": "bc12e6013bc0747adeec9fdf45de3863",
            "assetName": "State",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 5,
            "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586669684714",
            "tfm_rul_txt": "State"
          },
          {
            "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
            "assetName": "PIN",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 6,
            "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586669684714",
            "tfm_rul_txt": "PIN"
          }
        ],
        "filterCondition": "acct_dtl map cond",
        "output": "",
        "source": {
          "name": "acc_dtl",
          "data": {
            "id": "2e9da73c428173619c7e0cf9490fbc5c",
            "name": "acc_dtl",
            "details": {
              "id": "2e9da73c428173619c7e0cf9490fbc5c",
              "dat_src_nm": "postgre_demo125",
              "ln_of_bsn_nm": "Life Insurance",
              "apn_nm": "CRM",
              "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
              "prgm_id": "-1",
              "prj_id": "-1",
              "apn_id": "494cb3b121460307859ccf42faf341a5",
              "sub_apn_id": "-1",
              "obj_phy_nm": "Account_dtl_v",
              "obj_type_nm": "View",
              "site_id": "a02abac05e79345b5921363039c04e64",
              "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/2e9da73c428173619c7e0cf9490fbc5c",
              "obj_schm_nm": "gathi_ins_intgn_v",
              "obj_db_pltfm_nm": "HIVE",
              "obj_lyr_nm": "intzone-gathi",
              "obj_ownr_id": "kalyan",
              "obj_dat_dmn_nm": "dummy",
              "obj_fnl_dmn_nm": null,
              "src_apn_identifer": null,
              "obj_dat_stwd_id": null,
              "rec_lst_updt_ts": "2020-04-07T11:16:32.526231",
              "rec_lst_updt_by_id": "kalyan",
              "org_id": "7248518a1808eae38650458ce81ba05a",
              "obj_bsn_nm": "Account_dtl",
              "obj_desc_txt": "test",
              "obj_fmt_type_nm": "Parquet",
              "clnt_dat_shrbl_ind": "Y",
              "obj_frq_nm": null,
              "obj_rttn_day_cnt": null,
              "obj_trst_lvl_pct": null,
              "obj_trst_lvl_rsn_txt": null,
              "file_dlmt_cd": "    ",
              "obj_low_rec_cnt": null,
              "obj_high_rec_cnt": null,
              "obj_lst_arc_dt": null,
              "obj_arc_loc_txt": null,
              "obj_prvc_lvl_txt": null,
              "obj_ver_nbr": null,
              "obj_size_txt": "0.03 MB",
              "obj_char_set_nm": null,
              "obj_url_txt": null,
              "obj_lst_mdfd_ts": null,
              "obj_lst_mdfd_by_id": null,
              "obj_crtd_ts": "2020-04-07T06:55:23.057758",
              "obj_crtd_by_id": "kalyan",
              "std_obj_nm": null,
              "tab_prpt_txt": null,
              "prtn_infmn_txt": null,
              "index_infmn_txt": null,
              "lst_clt_stats_ts": null,
              "purge_frq_days_cnt": null,
              "obj_rows_cnt": 3,
              "obj_arc_frq_nm": null,
              "obj_load_type_nm": "Delta",
              "crtfy_lvl_1_ind": null,
              "crtfy_lvl_2_ind": null,
              "crtfy_lvl_3_ind": null,
              "dmc_crtfy_dt": null,
              "dmc_crtfy_sta_cd": null,
              "is_gldn_obj_flg": null,
              "snstvty_cls_txt": null,
              "dmc_approver_id": null,
              "dat_stwd_crtfy_appr_rqst_dt": null,
              "obj_prpt_cnt": null,
              "lnd_file_path_txt": "NA",
              "lnd_file_nm": "NA",
              "cntl_file_nm": null,
              "sub_area_nm": "",
              "dl_raw_site_id": "a02abac05e79345b5921363039c04e64",
              "arc_site_id": null,
              "dl_raw_loc_txt": "s3://rawzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c",
              "dl_raw_obj_type_nm": "file",
              "rmv_hdr_rec_ind": "N",
              "rmv_trlr_rec_ind": null,
              "err_thrshd_pct_nbr": null,
              "wrng_thrshd_pct_nbr": null,
              "end_of_ln_sep_cd": null,
              "prflg_zn_site_id": "a02abac05e79345b5921363039c04e64",
              "prflg_zn_loc_txt": "s3://profzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c"
            },
            "attributes": [
              {
                "id": "7ea045717f0e35f06ec69bbb35fac231",
                "assetName": "Account_no",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 1
              },
              {
                "id": "d1dda5558af654deacbdabdc5be260c4",
                "assetName": "Cust_Name",
                "dataType": "string",
                "dataTypeLength": "30",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 2
              },
              {
                "id": "f32ceb4274b420b7eff32051ae5352eb",
                "assetName": "Address1",
                "dataType": "string",
                "dataTypeLength": "40",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 3
              },
              {
                "id": "ce8b39d38982fe38f5417afa5d09592b",
                "assetName": "City",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 4
              },
              {
                "id": "bc12e6013bc0747adeec9fdf45de3863",
                "assetName": "State",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 5
              },
              {
                "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                "assetName": "PIN",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 6
              },
              {
                "id": "d63fea48cf2c09d4c0f4ac1c47a7f806",
                "assetName": "rec_id",
                "dataType": "int",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 7
              },
              {
                "id": "aee30050f374eedc6b03d2902c0b24de",
                "assetName": "run_id",
                "dataType": "string",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 8
              },
              {
                "id": "c061f528e9cb547db2ba4aa91e056ff4",
                "assetName": "eff_strt_ts",
                "dataType": "timestamp",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 9
              },
              {
                "id": "5c75966ec625f4cf0d14674e7b411637",
                "assetName": "eff_end_ts",
                "dataType": "timestamp",
                "dataTypeLength": "",
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 10
              }
            ]
          }
        },
        "keys": "Account_no",
        "join_type": "Inner Join"
      }
    },
    {
      "name": "cust_dtl_join",
      "id": "Joiner_1586670289920",
      "class": "joiner",
      "shape": "diamond",
      "img": "joiner",
      "type": "J",
      "data": {
        "id": "",
        "name": "cust_dtl_join",
        "details": "",
        "attributes": [
          {
            "id": "40e3090a08ca4377075e6bb6199c3b51",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "N",
            "isPK": "Y",
            "isFK": "N",
            "orderNumber": 1,
            "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586670373753",
            "tfm_rul_txt": "Account_no"
          },
          {
            "id": "b0c69582cbd985cdbb2afea20d0b5f73",
            "assetName": "Cust_Name",
            "dataType": "string",
            "dataTypeLength": "30",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 2,
            "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586670373753",
            "tfm_rul_txt": "Cust_Name"
          },
          {
            "id": "c454446706ccb10f6d7a2b31ae909cbd",
            "assetName": "Address1",
            "dataType": "string",
            "dataTypeLength": "40",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 3,
            "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586670373753",
            "tfm_rul_txt": "Address1"
          },
          {
            "id": "ce8b39d38982fe38f5417afa5d09592b",
            "assetName": "City",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 4,
            "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586670373753",
            "tfm_rul_txt": "City"
          },
          {
            "id": "bc12e6013bc0747adeec9fdf45de3863",
            "assetName": "State",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 5,
            "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586670373753",
            "tfm_rul_txt": "State"
          },
          {
            "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
            "assetName": "PIN",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 6,
            "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586670373753",
            "tfm_rul_txt": "PIN"
          }
        ],
        "filterConditions": [
          {
            "name": "cust_map",
            "condition": "cust_map input filter test con"
          }
        ],
        "sources": [
          {
            "name": "cust_map",
            "data": {
              "name": "cust_map",
              "id": "",
              "details": "",
              "attributes": [
                {
                  "id": "40e3090a08ca4377075e6bb6199c3b51",
                  "assetName": "Account_no",
                  "dataType": "decimal",
                  "dataTypeLength": null,
                  "isNull": "N",
                  "isPK": "Y",
                  "isFK": "N",
                  "orderNumber": 1,
                  "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586669654418",
                  "tfm_rul_txt": "Account_no",
                  "obj_prpt_nm": "Account_no"
                },
                {
                  "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                  "assetName": "Cust_Name",
                  "dataType": "string",
                  "dataTypeLength": "30",
                  "isNull": "N",
                  "isPK": "N",
                  "isFK": "N",
                  "orderNumber": 2,
                  "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586669654418",
                  "tfm_rul_txt": "ltrim(Cust_Name)",
                  "obj_prpt_nm": "Cust_Name"
                },
                {
                  "id": "c454446706ccb10f6d7a2b31ae909cbd",
                  "assetName": "Address1",
                  "dataType": "string",
                  "dataTypeLength": "40",
                  "isNull": "N",
                  "isPK": "N",
                  "isFK": "N",
                  "orderNumber": 3,
                  "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586669654418",
                  "tfm_rul_txt": "Address1"
                }
              ],
              "filterCondition": "cust_map filter con",
              "output": "",
              "source": {
                "name": "cust_dtl",
                "data": {
                  "id": "14e49ac6773456c164a21ea673d57012",
                  "name": "cust_dtl",
                  "details": {
                    "id": "14e49ac6773456c164a21ea673d57012",
                    "dat_src_nm": "postgre_demo12567test",
                    "ln_of_bsn_nm": "Life Insurance",
                    "apn_nm": "CRM",
                    "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
                    "prgm_id": "-1",
                    "prj_id": "-1",
                    "apn_id": "494cb3b121460307859ccf42faf341a5",
                    "sub_apn_id": "-1",
                    "obj_phy_nm": "CUSTOMER_DTL_v",
                    "obj_type_nm": "View",
                    "site_id": "6b668c5251c559361709c41538587461",
                    "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/14e49ac6773456c164a21ea673d57012",
                    "obj_schm_nm": "gathi_ins_intgn_v",
                    "obj_db_pltfm_nm": "HIVE",
                    "obj_lyr_nm": "intzone-gathi",
                    "obj_ownr_id": "kalyan",
                    "obj_dat_dmn_nm": "dummy",
                    "obj_fnl_dmn_nm": null,
                    "src_apn_identifer": null,
                    "obj_dat_stwd_id": null,
                    "rec_lst_updt_ts": "2020-04-07T13:36:58.1969",
                    "rec_lst_updt_by_id": "kalyan",
                    "org_id": "7248518a1808eae38650458ce81ba05a",
                    "obj_bsn_nm": "CUSTOMER_DTL",
                    "obj_desc_txt": "test",
                    "obj_fmt_type_nm": "Parquet",
                    "clnt_dat_shrbl_ind": "Y",
                    "obj_frq_nm": null,
                    "obj_rttn_day_cnt": null,
                    "obj_trst_lvl_pct": null,
                    "obj_trst_lvl_rsn_txt": null,
                    "file_dlmt_cd": null,
                    "obj_low_rec_cnt": null,
                    "obj_high_rec_cnt": null,
                    "obj_lst_arc_dt": null,
                    "obj_arc_loc_txt": null,
                    "obj_prvc_lvl_txt": null,
                    "obj_ver_nbr": null,
                    "obj_size_txt": "0.02 MB",
                    "obj_char_set_nm": null,
                    "obj_url_txt": null,
                    "obj_lst_mdfd_ts": null,
                    "obj_lst_mdfd_by_id": null,
                    "obj_crtd_ts": "2020-04-07T13:36:58.196898",
                    "obj_crtd_by_id": "kalyan",
                    "std_obj_nm": null,
                    "tab_prpt_txt": null,
                    "prtn_infmn_txt": null,
                    "index_infmn_txt": null,
                    "lst_clt_stats_ts": null,
                    "purge_frq_days_cnt": null,
                    "obj_rows_cnt": 11,
                    "obj_arc_frq_nm": null,
                    "obj_load_type_nm": "Delta",
                    "crtfy_lvl_1_ind": null,
                    "crtfy_lvl_2_ind": null,
                    "crtfy_lvl_3_ind": null,
                    "dmc_crtfy_dt": null,
                    "dmc_crtfy_sta_cd": null,
                    "is_gldn_obj_flg": null,
                    "snstvty_cls_txt": null,
                    "dmc_approver_id": null,
                    "dat_stwd_crtfy_appr_rqst_dt": null,
                    "obj_prpt_cnt": null,
                    "lnd_file_path_txt": null,
                    "lnd_file_nm": null,
                    "cntl_file_nm": null,
                    "sub_area_nm": "Claims",
                    "dl_raw_site_id": null,
                    "arc_site_id": null,
                    "dl_raw_loc_txt": null,
                    "dl_raw_obj_type_nm": null,
                    "rmv_hdr_rec_ind": null,
                    "rmv_trlr_rec_ind": null,
                    "err_thrshd_pct_nbr": null,
                    "wrng_thrshd_pct_nbr": null,
                    "end_of_ln_sep_cd": null,
                    "prflg_zn_site_id": null,
                    "prflg_zn_loc_txt": null
                  },
                  "attributes": [
                    {
                      "id": "40e3090a08ca4377075e6bb6199c3b51",
                      "assetName": "Account_no",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "N",
                      "isPK": "Y",
                      "isFK": "N",
                      "orderNumber": 1
                    },
                    {
                      "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                      "assetName": "Cust_Name",
                      "dataType": "string",
                      "dataTypeLength": "30",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 2
                    },
                    {
                      "id": "c454446706ccb10f6d7a2b31ae909cbd",
                      "assetName": "Address1",
                      "dataType": "string",
                      "dataTypeLength": "40",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 3
                    },
                    {
                      "id": "936d5064626fed28c7709aaec10323ed",
                      "assetName": "City",
                      "dataType": "string",
                      "dataTypeLength": "20",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 4
                    },
                    {
                      "id": "d18f55de099af8071ab2dccf534d7321",
                      "assetName": "State",
                      "dataType": "string",
                      "dataTypeLength": "20",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 5
                    },
                    {
                      "id": "56d1da32709e3393d5b81db9d3cfddec",
                      "assetName": "PIN",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 6
                    },
                    {
                      "id": "8f069ed974c65af919c942e54ceb8dc9",
                      "assetName": "rec_id",
                      "dataType": "int",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 7
                    },
                    {
                      "id": "9986562e17971ddd1aaea94ba479c2e7",
                      "assetName": "run_id",
                      "dataType": "string",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 8
                    },
                    {
                      "id": "e23b761ef993e4fd72c7b7c1c2694a48",
                      "assetName": "eff_strt_ts",
                      "dataType": "timestamp",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 9
                    },
                    {
                      "id": "f4d9fcc80248ee94f22efdf358864cea",
                      "assetName": "eff_end_ts",
                      "dataType": "timestamp",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 10
                    }
                  ]
                }
              },
              "keys": "Account_no"
            },
            "keys": ""
          },
          {
            "name": "acct_dtl_map",
            "data": {
              "name": "acct_dtl_map",
              "id": "",
              "details": "",
              "attributes": [
                {
                  "id": "7ea045717f0e35f06ec69bbb35fac231",
                  "assetName": "Account_no",
                  "dataType": "decimal",
                  "dataTypeLength": null,
                  "isNull": "Y",
                  "isPK": "N",
                  "isFK": "N",
                  "orderNumber": 1,
                  "uniqueId": "7ea045717f0e35f06ec69bbb35fac231_1586669684713",
                  "tfm_rul_txt": "Account_no"
                },
                {
                  "id": "ce8b39d38982fe38f5417afa5d09592b",
                  "assetName": "City",
                  "dataType": "string",
                  "dataTypeLength": "20",
                  "isNull": "N",
                  "isPK": "N",
                  "isFK": "N",
                  "orderNumber": 4,
                  "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586669684713",
                  "tfm_rul_txt": "lower(City)",
                  "obj_prpt_nm": "City"
                },
                {
                  "id": "bc12e6013bc0747adeec9fdf45de3863",
                  "assetName": "State",
                  "dataType": "string",
                  "dataTypeLength": "20",
                  "isNull": "N",
                  "isPK": "N",
                  "isFK": "N",
                  "orderNumber": 5,
                  "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586669684714",
                  "tfm_rul_txt": "State"
                },
                {
                  "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                  "assetName": "PIN",
                  "dataType": "decimal",
                  "dataTypeLength": null,
                  "isNull": "Y",
                  "isPK": "N",
                  "isFK": "N",
                  "orderNumber": 6,
                  "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586669684714",
                  "tfm_rul_txt": "PIN"
                }
              ],
              "filterCondition": "acct_dtl map cond",
              "output": "",
              "source": {
                "name": "acc_dtl",
                "data": {
                  "id": "2e9da73c428173619c7e0cf9490fbc5c",
                  "name": "acc_dtl",
                  "details": {
                    "id": "2e9da73c428173619c7e0cf9490fbc5c",
                    "dat_src_nm": "postgre_demo125",
                    "ln_of_bsn_nm": "Life Insurance",
                    "apn_nm": "CRM",
                    "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
                    "prgm_id": "-1",
                    "prj_id": "-1",
                    "apn_id": "494cb3b121460307859ccf42faf341a5",
                    "sub_apn_id": "-1",
                    "obj_phy_nm": "Account_dtl_v",
                    "obj_type_nm": "View",
                    "site_id": "a02abac05e79345b5921363039c04e64",
                    "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/2e9da73c428173619c7e0cf9490fbc5c",
                    "obj_schm_nm": "gathi_ins_intgn_v",
                    "obj_db_pltfm_nm": "HIVE",
                    "obj_lyr_nm": "intzone-gathi",
                    "obj_ownr_id": "kalyan",
                    "obj_dat_dmn_nm": "dummy",
                    "obj_fnl_dmn_nm": null,
                    "src_apn_identifer": null,
                    "obj_dat_stwd_id": null,
                    "rec_lst_updt_ts": "2020-04-07T11:16:32.526231",
                    "rec_lst_updt_by_id": "kalyan",
                    "org_id": "7248518a1808eae38650458ce81ba05a",
                    "obj_bsn_nm": "Account_dtl",
                    "obj_desc_txt": "test",
                    "obj_fmt_type_nm": "Parquet",
                    "clnt_dat_shrbl_ind": "Y",
                    "obj_frq_nm": null,
                    "obj_rttn_day_cnt": null,
                    "obj_trst_lvl_pct": null,
                    "obj_trst_lvl_rsn_txt": null,
                    "file_dlmt_cd": "    ",
                    "obj_low_rec_cnt": null,
                    "obj_high_rec_cnt": null,
                    "obj_lst_arc_dt": null,
                    "obj_arc_loc_txt": null,
                    "obj_prvc_lvl_txt": null,
                    "obj_ver_nbr": null,
                    "obj_size_txt": "0.03 MB",
                    "obj_char_set_nm": null,
                    "obj_url_txt": null,
                    "obj_lst_mdfd_ts": null,
                    "obj_lst_mdfd_by_id": null,
                    "obj_crtd_ts": "2020-04-07T06:55:23.057758",
                    "obj_crtd_by_id": "kalyan",
                    "std_obj_nm": null,
                    "tab_prpt_txt": null,
                    "prtn_infmn_txt": null,
                    "index_infmn_txt": null,
                    "lst_clt_stats_ts": null,
                    "purge_frq_days_cnt": null,
                    "obj_rows_cnt": 3,
                    "obj_arc_frq_nm": null,
                    "obj_load_type_nm": "Delta",
                    "crtfy_lvl_1_ind": null,
                    "crtfy_lvl_2_ind": null,
                    "crtfy_lvl_3_ind": null,
                    "dmc_crtfy_dt": null,
                    "dmc_crtfy_sta_cd": null,
                    "is_gldn_obj_flg": null,
                    "snstvty_cls_txt": null,
                    "dmc_approver_id": null,
                    "dat_stwd_crtfy_appr_rqst_dt": null,
                    "obj_prpt_cnt": null,
                    "lnd_file_path_txt": "NA",
                    "lnd_file_nm": "NA",
                    "cntl_file_nm": null,
                    "sub_area_nm": "",
                    "dl_raw_site_id": "a02abac05e79345b5921363039c04e64",
                    "arc_site_id": null,
                    "dl_raw_loc_txt": "s3://rawzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c",
                    "dl_raw_obj_type_nm": "file",
                    "rmv_hdr_rec_ind": "N",
                    "rmv_trlr_rec_ind": null,
                    "err_thrshd_pct_nbr": null,
                    "wrng_thrshd_pct_nbr": null,
                    "end_of_ln_sep_cd": null,
                    "prflg_zn_site_id": "a02abac05e79345b5921363039c04e64",
                    "prflg_zn_loc_txt": "s3://profzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c"
                  },
                  "attributes": [
                    {
                      "id": "7ea045717f0e35f06ec69bbb35fac231",
                      "assetName": "Account_no",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 1
                    },
                    {
                      "id": "d1dda5558af654deacbdabdc5be260c4",
                      "assetName": "Cust_Name",
                      "dataType": "string",
                      "dataTypeLength": "30",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 2
                    },
                    {
                      "id": "f32ceb4274b420b7eff32051ae5352eb",
                      "assetName": "Address1",
                      "dataType": "string",
                      "dataTypeLength": "40",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 3
                    },
                    {
                      "id": "ce8b39d38982fe38f5417afa5d09592b",
                      "assetName": "City",
                      "dataType": "string",
                      "dataTypeLength": "20",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 4
                    },
                    {
                      "id": "bc12e6013bc0747adeec9fdf45de3863",
                      "assetName": "State",
                      "dataType": "string",
                      "dataTypeLength": "20",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 5
                    },
                    {
                      "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                      "assetName": "PIN",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 6
                    },
                    {
                      "id": "d63fea48cf2c09d4c0f4ac1c47a7f806",
                      "assetName": "rec_id",
                      "dataType": "int",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 7
                    },
                    {
                      "id": "aee30050f374eedc6b03d2902c0b24de",
                      "assetName": "run_id",
                      "dataType": "string",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 8
                    },
                    {
                      "id": "c061f528e9cb547db2ba4aa91e056ff4",
                      "assetName": "eff_strt_ts",
                      "dataType": "timestamp",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 9
                    },
                    {
                      "id": "5c75966ec625f4cf0d14674e7b411637",
                      "assetName": "eff_end_ts",
                      "dataType": "timestamp",
                      "dataTypeLength": "",
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 10
                    }
                  ]
                }
              },
              "keys": "Account_no",
              "join_type": "Inner Join"
            },
            "keys": ""
          }
        ]
      },
      "checked": false
    },
    {
      "name": "aggr ",
      "id": "Aggr_1586670410808",
      "class": "agg",
      "shape": "rect",
      "img": "aggr",
      "type": "A",
      "checked": true,
      "data": {
        "name": "aggr ",
        "id": "",
        "details": "",
        "attributes": [
          {
            "id": "40e3090a08ca4377075e6bb6199c3b51",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "N",
            "isPK": "Y",
            "isFK": "N",
            "orderNumber": 1,
            "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586670447664",
            "tfm_rul_txt": "Account_no"
          },
          {
            "id": "b0c69582cbd985cdbb2afea20d0b5f73",
            "assetName": "Cust_Name",
            "dataType": "string",
            "dataTypeLength": "30",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 2,
            "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586670447664",
            "tfm_rul_txt": "Cust_Name"
          },
          {
            "id": "ce8b39d38982fe38f5417afa5d09592b",
            "assetName": "City",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 4,
            "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586670447664",
            "tfm_rul_txt": "City"
          },
          {
            "id": "bc12e6013bc0747adeec9fdf45de3863",
            "assetName": "State",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 5,
            "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586670447664",
            "tfm_rul_txt": "State"
          },
          {
            "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
            "assetName": "PIN",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 6,
            "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586670447664",
            "tfm_rul_txt": "PIN"
          }
        ],
        "filterCondition": "aggr filter cond",
        "output": "",
        "source": {
          "name": "cust_dtl_join",
          "data": {
            "id": "",
            "name": "cust_dtl_join",
            "details": "",
            "attributes": [
              {
                "id": "40e3090a08ca4377075e6bb6199c3b51",
                "assetName": "Account_no",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "N",
                "isPK": "Y",
                "isFK": "N",
                "orderNumber": 1,
                "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586670373753",
                "tfm_rul_txt": "Account_no"
              },
              {
                "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                "assetName": "Cust_Name",
                "dataType": "string",
                "dataTypeLength": "30",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 2,
                "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586670373753",
                "tfm_rul_txt": "Cust_Name"
              },
              {
                "id": "c454446706ccb10f6d7a2b31ae909cbd",
                "assetName": "Address1",
                "dataType": "string",
                "dataTypeLength": "40",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 3,
                "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586670373753",
                "tfm_rul_txt": "Address1"
              },
              {
                "id": "ce8b39d38982fe38f5417afa5d09592b",
                "assetName": "City",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 4,
                "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586670373753",
                "tfm_rul_txt": "City"
              },
              {
                "id": "bc12e6013bc0747adeec9fdf45de3863",
                "assetName": "State",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 5,
                "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586670373753",
                "tfm_rul_txt": "State"
              },
              {
                "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                "assetName": "PIN",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 6,
                "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586670373753",
                "tfm_rul_txt": "PIN"
              }
            ],
            "filterConditions": [
              {
                "name": "cust_map",
                "condition": "cust_map input filter test con"
              }
            ],
            "sources": [
              {
                "name": "cust_map",
                "data": {
                  "name": "cust_map",
                  "id": "",
                  "details": "",
                  "attributes": [
                    {
                      "id": "40e3090a08ca4377075e6bb6199c3b51",
                      "assetName": "Account_no",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "N",
                      "isPK": "Y",
                      "isFK": "N",
                      "orderNumber": 1,
                      "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586669654418",
                      "tfm_rul_txt": "Account_no",
                      "obj_prpt_nm": "Account_no"
                    },
                    {
                      "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                      "assetName": "Cust_Name",
                      "dataType": "string",
                      "dataTypeLength": "30",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 2,
                      "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586669654418",
                      "tfm_rul_txt": "ltrim(Cust_Name)",
                      "obj_prpt_nm": "Cust_Name"
                    },
                    {
                      "id": "c454446706ccb10f6d7a2b31ae909cbd",
                      "assetName": "Address1",
                      "dataType": "string",
                      "dataTypeLength": "40",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 3,
                      "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586669654418",
                      "tfm_rul_txt": "Address1"
                    }
                  ],
                  "filterCondition": "cust_map filter con",
                  "output": "",
                  "source": {
                    "name": "cust_dtl",
                    "data": {
                      "id": "14e49ac6773456c164a21ea673d57012",
                      "name": "cust_dtl",
                      "details": {
                        "id": "14e49ac6773456c164a21ea673d57012",
                        "dat_src_nm": "postgre_demo12567test",
                        "ln_of_bsn_nm": "Life Insurance",
                        "apn_nm": "CRM",
                        "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
                        "prgm_id": "-1",
                        "prj_id": "-1",
                        "apn_id": "494cb3b121460307859ccf42faf341a5",
                        "sub_apn_id": "-1",
                        "obj_phy_nm": "CUSTOMER_DTL_v",
                        "obj_type_nm": "View",
                        "site_id": "6b668c5251c559361709c41538587461",
                        "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/14e49ac6773456c164a21ea673d57012",
                        "obj_schm_nm": "gathi_ins_intgn_v",
                        "obj_db_pltfm_nm": "HIVE",
                        "obj_lyr_nm": "intzone-gathi",
                        "obj_ownr_id": "kalyan",
                        "obj_dat_dmn_nm": "dummy",
                        "obj_fnl_dmn_nm": null,
                        "src_apn_identifer": null,
                        "obj_dat_stwd_id": null,
                        "rec_lst_updt_ts": "2020-04-07T13:36:58.1969",
                        "rec_lst_updt_by_id": "kalyan",
                        "org_id": "7248518a1808eae38650458ce81ba05a",
                        "obj_bsn_nm": "CUSTOMER_DTL",
                        "obj_desc_txt": "test",
                        "obj_fmt_type_nm": "Parquet",
                        "clnt_dat_shrbl_ind": "Y",
                        "obj_frq_nm": null,
                        "obj_rttn_day_cnt": null,
                        "obj_trst_lvl_pct": null,
                        "obj_trst_lvl_rsn_txt": null,
                        "file_dlmt_cd": null,
                        "obj_low_rec_cnt": null,
                        "obj_high_rec_cnt": null,
                        "obj_lst_arc_dt": null,
                        "obj_arc_loc_txt": null,
                        "obj_prvc_lvl_txt": null,
                        "obj_ver_nbr": null,
                        "obj_size_txt": "0.02 MB",
                        "obj_char_set_nm": null,
                        "obj_url_txt": null,
                        "obj_lst_mdfd_ts": null,
                        "obj_lst_mdfd_by_id": null,
                        "obj_crtd_ts": "2020-04-07T13:36:58.196898",
                        "obj_crtd_by_id": "kalyan",
                        "std_obj_nm": null,
                        "tab_prpt_txt": null,
                        "prtn_infmn_txt": null,
                        "index_infmn_txt": null,
                        "lst_clt_stats_ts": null,
                        "purge_frq_days_cnt": null,
                        "obj_rows_cnt": 11,
                        "obj_arc_frq_nm": null,
                        "obj_load_type_nm": "Delta",
                        "crtfy_lvl_1_ind": null,
                        "crtfy_lvl_2_ind": null,
                        "crtfy_lvl_3_ind": null,
                        "dmc_crtfy_dt": null,
                        "dmc_crtfy_sta_cd": null,
                        "is_gldn_obj_flg": null,
                        "snstvty_cls_txt": null,
                        "dmc_approver_id": null,
                        "dat_stwd_crtfy_appr_rqst_dt": null,
                        "obj_prpt_cnt": null,
                        "lnd_file_path_txt": null,
                        "lnd_file_nm": null,
                        "cntl_file_nm": null,
                        "sub_area_nm": "Claims",
                        "dl_raw_site_id": null,
                        "arc_site_id": null,
                        "dl_raw_loc_txt": null,
                        "dl_raw_obj_type_nm": null,
                        "rmv_hdr_rec_ind": null,
                        "rmv_trlr_rec_ind": null,
                        "err_thrshd_pct_nbr": null,
                        "wrng_thrshd_pct_nbr": null,
                        "end_of_ln_sep_cd": null,
                        "prflg_zn_site_id": null,
                        "prflg_zn_loc_txt": null
                      },
                      "attributes": [
                        {
                          "id": "40e3090a08ca4377075e6bb6199c3b51",
                          "assetName": "Account_no",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "N",
                          "isPK": "Y",
                          "isFK": "N",
                          "orderNumber": 1
                        },
                        {
                          "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                          "assetName": "Cust_Name",
                          "dataType": "string",
                          "dataTypeLength": "30",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 2
                        },
                        {
                          "id": "c454446706ccb10f6d7a2b31ae909cbd",
                          "assetName": "Address1",
                          "dataType": "string",
                          "dataTypeLength": "40",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 3
                        },
                        {
                          "id": "936d5064626fed28c7709aaec10323ed",
                          "assetName": "City",
                          "dataType": "string",
                          "dataTypeLength": "20",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 4
                        },
                        {
                          "id": "d18f55de099af8071ab2dccf534d7321",
                          "assetName": "State",
                          "dataType": "string",
                          "dataTypeLength": "20",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 5
                        },
                        {
                          "id": "56d1da32709e3393d5b81db9d3cfddec",
                          "assetName": "PIN",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 6
                        },
                        {
                          "id": "8f069ed974c65af919c942e54ceb8dc9",
                          "assetName": "rec_id",
                          "dataType": "int",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 7
                        },
                        {
                          "id": "9986562e17971ddd1aaea94ba479c2e7",
                          "assetName": "run_id",
                          "dataType": "string",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 8
                        },
                        {
                          "id": "e23b761ef993e4fd72c7b7c1c2694a48",
                          "assetName": "eff_strt_ts",
                          "dataType": "timestamp",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 9
                        },
                        {
                          "id": "f4d9fcc80248ee94f22efdf358864cea",
                          "assetName": "eff_end_ts",
                          "dataType": "timestamp",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 10
                        }
                      ]
                    }
                  },
                  "keys": "Account_no"
                },
                "keys": ""
              },
              {
                "name": "acct_dtl_map",
                "data": {
                  "name": "acct_dtl_map",
                  "id": "",
                  "details": "",
                  "attributes": [
                    {
                      "id": "7ea045717f0e35f06ec69bbb35fac231",
                      "assetName": "Account_no",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 1,
                      "uniqueId": "7ea045717f0e35f06ec69bbb35fac231_1586669684713",
                      "tfm_rul_txt": "Account_no"
                    },
                    {
                      "id": "ce8b39d38982fe38f5417afa5d09592b",
                      "assetName": "City",
                      "dataType": "string",
                      "dataTypeLength": "20",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 4,
                      "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586669684713",
                      "tfm_rul_txt": "lower(City)",
                      "obj_prpt_nm": "City"
                    },
                    {
                      "id": "bc12e6013bc0747adeec9fdf45de3863",
                      "assetName": "State",
                      "dataType": "string",
                      "dataTypeLength": "20",
                      "isNull": "N",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 5,
                      "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586669684714",
                      "tfm_rul_txt": "State"
                    },
                    {
                      "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                      "assetName": "PIN",
                      "dataType": "decimal",
                      "dataTypeLength": null,
                      "isNull": "Y",
                      "isPK": "N",
                      "isFK": "N",
                      "orderNumber": 6,
                      "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586669684714",
                      "tfm_rul_txt": "PIN"
                    }
                  ],
                  "filterCondition": "acct_dtl map cond",
                  "output": "",
                  "source": {
                    "name": "acc_dtl",
                    "data": {
                      "id": "2e9da73c428173619c7e0cf9490fbc5c",
                      "name": "acc_dtl",
                      "details": {
                        "id": "2e9da73c428173619c7e0cf9490fbc5c",
                        "dat_src_nm": "postgre_demo125",
                        "ln_of_bsn_nm": "Life Insurance",
                        "apn_nm": "CRM",
                        "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
                        "prgm_id": "-1",
                        "prj_id": "-1",
                        "apn_id": "494cb3b121460307859ccf42faf341a5",
                        "sub_apn_id": "-1",
                        "obj_phy_nm": "Account_dtl_v",
                        "obj_type_nm": "View",
                        "site_id": "a02abac05e79345b5921363039c04e64",
                        "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/2e9da73c428173619c7e0cf9490fbc5c",
                        "obj_schm_nm": "gathi_ins_intgn_v",
                        "obj_db_pltfm_nm": "HIVE",
                        "obj_lyr_nm": "intzone-gathi",
                        "obj_ownr_id": "kalyan",
                        "obj_dat_dmn_nm": "dummy",
                        "obj_fnl_dmn_nm": null,
                        "src_apn_identifer": null,
                        "obj_dat_stwd_id": null,
                        "rec_lst_updt_ts": "2020-04-07T11:16:32.526231",
                        "rec_lst_updt_by_id": "kalyan",
                        "org_id": "7248518a1808eae38650458ce81ba05a",
                        "obj_bsn_nm": "Account_dtl",
                        "obj_desc_txt": "test",
                        "obj_fmt_type_nm": "Parquet",
                        "clnt_dat_shrbl_ind": "Y",
                        "obj_frq_nm": null,
                        "obj_rttn_day_cnt": null,
                        "obj_trst_lvl_pct": null,
                        "obj_trst_lvl_rsn_txt": null,
                        "file_dlmt_cd": "    ",
                        "obj_low_rec_cnt": null,
                        "obj_high_rec_cnt": null,
                        "obj_lst_arc_dt": null,
                        "obj_arc_loc_txt": null,
                        "obj_prvc_lvl_txt": null,
                        "obj_ver_nbr": null,
                        "obj_size_txt": "0.03 MB",
                        "obj_char_set_nm": null,
                        "obj_url_txt": null,
                        "obj_lst_mdfd_ts": null,
                        "obj_lst_mdfd_by_id": null,
                        "obj_crtd_ts": "2020-04-07T06:55:23.057758",
                        "obj_crtd_by_id": "kalyan",
                        "std_obj_nm": null,
                        "tab_prpt_txt": null,
                        "prtn_infmn_txt": null,
                        "index_infmn_txt": null,
                        "lst_clt_stats_ts": null,
                        "purge_frq_days_cnt": null,
                        "obj_rows_cnt": 3,
                        "obj_arc_frq_nm": null,
                        "obj_load_type_nm": "Delta",
                        "crtfy_lvl_1_ind": null,
                        "crtfy_lvl_2_ind": null,
                        "crtfy_lvl_3_ind": null,
                        "dmc_crtfy_dt": null,
                        "dmc_crtfy_sta_cd": null,
                        "is_gldn_obj_flg": null,
                        "snstvty_cls_txt": null,
                        "dmc_approver_id": null,
                        "dat_stwd_crtfy_appr_rqst_dt": null,
                        "obj_prpt_cnt": null,
                        "lnd_file_path_txt": "NA",
                        "lnd_file_nm": "NA",
                        "cntl_file_nm": null,
                        "sub_area_nm": "",
                        "dl_raw_site_id": "a02abac05e79345b5921363039c04e64",
                        "arc_site_id": null,
                        "dl_raw_loc_txt": "s3://rawzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c",
                        "dl_raw_obj_type_nm": "file",
                        "rmv_hdr_rec_ind": "N",
                        "rmv_trlr_rec_ind": null,
                        "err_thrshd_pct_nbr": null,
                        "wrng_thrshd_pct_nbr": null,
                        "end_of_ln_sep_cd": null,
                        "prflg_zn_site_id": "a02abac05e79345b5921363039c04e64",
                        "prflg_zn_loc_txt": "s3://profzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c"
                      },
                      "attributes": [
                        {
                          "id": "7ea045717f0e35f06ec69bbb35fac231",
                          "assetName": "Account_no",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 1
                        },
                        {
                          "id": "d1dda5558af654deacbdabdc5be260c4",
                          "assetName": "Cust_Name",
                          "dataType": "string",
                          "dataTypeLength": "30",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 2
                        },
                        {
                          "id": "f32ceb4274b420b7eff32051ae5352eb",
                          "assetName": "Address1",
                          "dataType": "string",
                          "dataTypeLength": "40",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 3
                        },
                        {
                          "id": "ce8b39d38982fe38f5417afa5d09592b",
                          "assetName": "City",
                          "dataType": "string",
                          "dataTypeLength": "20",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 4
                        },
                        {
                          "id": "bc12e6013bc0747adeec9fdf45de3863",
                          "assetName": "State",
                          "dataType": "string",
                          "dataTypeLength": "20",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 5
                        },
                        {
                          "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                          "assetName": "PIN",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 6
                        },
                        {
                          "id": "d63fea48cf2c09d4c0f4ac1c47a7f806",
                          "assetName": "rec_id",
                          "dataType": "int",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 7
                        },
                        {
                          "id": "aee30050f374eedc6b03d2902c0b24de",
                          "assetName": "run_id",
                          "dataType": "string",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 8
                        },
                        {
                          "id": "c061f528e9cb547db2ba4aa91e056ff4",
                          "assetName": "eff_strt_ts",
                          "dataType": "timestamp",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 9
                        },
                        {
                          "id": "5c75966ec625f4cf0d14674e7b411637",
                          "assetName": "eff_end_ts",
                          "dataType": "timestamp",
                          "dataTypeLength": "",
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 10
                        }
                      ]
                    }
                  },
                  "keys": "Account_no",
                  "join_type": "Inner Join"
                },
                "keys": ""
              }
            ]
          }
        },
        "keys": [
          "Account_no"
        ]
      }
    },
    {
      "name": "cust_acct_dtl_tgt",
      "id": "Tgt_1586670571247",
      "class": "tgt",
      "shape": "rect",
      "img": "tgt",
      "type": "T",
      "data": {
        "name": "cust_acct_dtl_tgt",
        "id": "",
        "details": "",
        "attributes": [
          {
            "id": "40e3090a08ca4377075e6bb6199c3b51",
            "assetName": "Account_no",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "N",
            "isPK": "Y",
            "isFK": "N",
            "orderNumber": 1,
            "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586670447664",
            "tfm_rul_txt": "Account_no"
          },
          {
            "id": "b0c69582cbd985cdbb2afea20d0b5f73",
            "assetName": "Cust_Name",
            "dataType": "string",
            "dataTypeLength": "30",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 2,
            "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586670447664",
            "tfm_rul_txt": "Cust_Name"
          },
          {
            "id": "ce8b39d38982fe38f5417afa5d09592b",
            "assetName": "City",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 4,
            "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586670447664",
            "tfm_rul_txt": "City"
          },
          {
            "id": "bc12e6013bc0747adeec9fdf45de3863",
            "assetName": "State",
            "dataType": "string",
            "dataTypeLength": "20",
            "isNull": "N",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 5,
            "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586670447664",
            "tfm_rul_txt": "State"
          },
          {
            "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
            "assetName": "PIN",
            "dataType": "decimal",
            "dataTypeLength": null,
            "isNull": "Y",
            "isPK": "N",
            "isFK": "N",
            "orderNumber": 6,
            "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586670447664",
            "tfm_rul_txt": "PIN"
          }
        ],
        "source": {
          "name": "aggr ",
          "data": {
            "name": "aggr ",
            "id": "",
            "details": "",
            "attributes": [
              {
                "id": "40e3090a08ca4377075e6bb6199c3b51",
                "assetName": "Account_no",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "N",
                "isPK": "Y",
                "isFK": "N",
                "orderNumber": 1,
                "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586670447664",
                "tfm_rul_txt": "Account_no"
              },
              {
                "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                "assetName": "Cust_Name",
                "dataType": "string",
                "dataTypeLength": "30",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 2,
                "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586670447664",
                "tfm_rul_txt": "Cust_Name"
              },
              {
                "id": "ce8b39d38982fe38f5417afa5d09592b",
                "assetName": "City",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 4,
                "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586670447664",
                "tfm_rul_txt": "City"
              },
              {
                "id": "bc12e6013bc0747adeec9fdf45de3863",
                "assetName": "State",
                "dataType": "string",
                "dataTypeLength": "20",
                "isNull": "N",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 5,
                "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586670447664",
                "tfm_rul_txt": "State"
              },
              {
                "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                "assetName": "PIN",
                "dataType": "decimal",
                "dataTypeLength": null,
                "isNull": "Y",
                "isPK": "N",
                "isFK": "N",
                "orderNumber": 6,
                "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586670447664",
                "tfm_rul_txt": "PIN"
              }
            ],
            "filterCondition": "aggr filter cond",
            "output": "",
            "source": {
              "name": "cust_dtl_join",
              "data": {
                "id": "",
                "name": "cust_dtl_join",
                "details": "",
                "attributes": [
                  {
                    "id": "40e3090a08ca4377075e6bb6199c3b51",
                    "assetName": "Account_no",
                    "dataType": "decimal",
                    "dataTypeLength": null,
                    "isNull": "N",
                    "isPK": "Y",
                    "isFK": "N",
                    "orderNumber": 1,
                    "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586670373753",
                    "tfm_rul_txt": "Account_no"
                  },
                  {
                    "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                    "assetName": "Cust_Name",
                    "dataType": "string",
                    "dataTypeLength": "30",
                    "isNull": "N",
                    "isPK": "N",
                    "isFK": "N",
                    "orderNumber": 2,
                    "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586670373753",
                    "tfm_rul_txt": "Cust_Name"
                  },
                  {
                    "id": "c454446706ccb10f6d7a2b31ae909cbd",
                    "assetName": "Address1",
                    "dataType": "string",
                    "dataTypeLength": "40",
                    "isNull": "N",
                    "isPK": "N",
                    "isFK": "N",
                    "orderNumber": 3,
                    "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586670373753",
                    "tfm_rul_txt": "Address1"
                  },
                  {
                    "id": "ce8b39d38982fe38f5417afa5d09592b",
                    "assetName": "City",
                    "dataType": "string",
                    "dataTypeLength": "20",
                    "isNull": "N",
                    "isPK": "N",
                    "isFK": "N",
                    "orderNumber": 4,
                    "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586670373753",
                    "tfm_rul_txt": "City"
                  },
                  {
                    "id": "bc12e6013bc0747adeec9fdf45de3863",
                    "assetName": "State",
                    "dataType": "string",
                    "dataTypeLength": "20",
                    "isNull": "N",
                    "isPK": "N",
                    "isFK": "N",
                    "orderNumber": 5,
                    "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586670373753",
                    "tfm_rul_txt": "State"
                  },
                  {
                    "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                    "assetName": "PIN",
                    "dataType": "decimal",
                    "dataTypeLength": null,
                    "isNull": "Y",
                    "isPK": "N",
                    "isFK": "N",
                    "orderNumber": 6,
                    "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586670373753",
                    "tfm_rul_txt": "PIN"
                  }
                ],
                "filterConditions": [
                  {
                    "name": "cust_map",
                    "condition": "cust_map input filter test con"
                  }
                ],
                "sources": [
                  {
                    "name": "cust_map",
                    "data": {
                      "name": "cust_map",
                      "id": "",
                      "details": "",
                      "attributes": [
                        {
                          "id": "40e3090a08ca4377075e6bb6199c3b51",
                          "assetName": "Account_no",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "N",
                          "isPK": "Y",
                          "isFK": "N",
                          "orderNumber": 1,
                          "uniqueId": "40e3090a08ca4377075e6bb6199c3b51_1586669654418",
                          "tfm_rul_txt": "Account_no",
                          "obj_prpt_nm": "Account_no"
                        },
                        {
                          "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                          "assetName": "Cust_Name",
                          "dataType": "string",
                          "dataTypeLength": "30",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 2,
                          "uniqueId": "b0c69582cbd985cdbb2afea20d0b5f73_1586669654418",
                          "tfm_rul_txt": "ltrim(Cust_Name)",
                          "obj_prpt_nm": "Cust_Name"
                        },
                        {
                          "id": "c454446706ccb10f6d7a2b31ae909cbd",
                          "assetName": "Address1",
                          "dataType": "string",
                          "dataTypeLength": "40",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 3,
                          "uniqueId": "c454446706ccb10f6d7a2b31ae909cbd_1586669654418",
                          "tfm_rul_txt": "Address1"
                        }
                      ],
                      "filterCondition": "cust_map filter con",
                      "output": "",
                      "source": {
                        "name": "cust_dtl",
                        "data": {
                          "id": "14e49ac6773456c164a21ea673d57012",
                          "name": "cust_dtl",
                          "details": {
                            "id": "14e49ac6773456c164a21ea673d57012",
                            "dat_src_nm": "postgre_demo12567test",
                            "ln_of_bsn_nm": "Life Insurance",
                            "apn_nm": "CRM",
                            "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
                            "prgm_id": "-1",
                            "prj_id": "-1",
                            "apn_id": "494cb3b121460307859ccf42faf341a5",
                            "sub_apn_id": "-1",
                            "obj_phy_nm": "CUSTOMER_DTL_v",
                            "obj_type_nm": "View",
                            "site_id": "6b668c5251c559361709c41538587461",
                            "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/14e49ac6773456c164a21ea673d57012",
                            "obj_schm_nm": "gathi_ins_intgn_v",
                            "obj_db_pltfm_nm": "HIVE",
                            "obj_lyr_nm": "intzone-gathi",
                            "obj_ownr_id": "kalyan",
                            "obj_dat_dmn_nm": "dummy",
                            "obj_fnl_dmn_nm": null,
                            "src_apn_identifer": null,
                            "obj_dat_stwd_id": null,
                            "rec_lst_updt_ts": "2020-04-07T13:36:58.1969",
                            "rec_lst_updt_by_id": "kalyan",
                            "org_id": "7248518a1808eae38650458ce81ba05a",
                            "obj_bsn_nm": "CUSTOMER_DTL",
                            "obj_desc_txt": "test",
                            "obj_fmt_type_nm": "Parquet",
                            "clnt_dat_shrbl_ind": "Y",
                            "obj_frq_nm": null,
                            "obj_rttn_day_cnt": null,
                            "obj_trst_lvl_pct": null,
                            "obj_trst_lvl_rsn_txt": null,
                            "file_dlmt_cd": null,
                            "obj_low_rec_cnt": null,
                            "obj_high_rec_cnt": null,
                            "obj_lst_arc_dt": null,
                            "obj_arc_loc_txt": null,
                            "obj_prvc_lvl_txt": null,
                            "obj_ver_nbr": null,
                            "obj_size_txt": "0.02 MB",
                            "obj_char_set_nm": null,
                            "obj_url_txt": null,
                            "obj_lst_mdfd_ts": null,
                            "obj_lst_mdfd_by_id": null,
                            "obj_crtd_ts": "2020-04-07T13:36:58.196898",
                            "obj_crtd_by_id": "kalyan",
                            "std_obj_nm": null,
                            "tab_prpt_txt": null,
                            "prtn_infmn_txt": null,
                            "index_infmn_txt": null,
                            "lst_clt_stats_ts": null,
                            "purge_frq_days_cnt": null,
                            "obj_rows_cnt": 11,
                            "obj_arc_frq_nm": null,
                            "obj_load_type_nm": "Delta",
                            "crtfy_lvl_1_ind": null,
                            "crtfy_lvl_2_ind": null,
                            "crtfy_lvl_3_ind": null,
                            "dmc_crtfy_dt": null,
                            "dmc_crtfy_sta_cd": null,
                            "is_gldn_obj_flg": null,
                            "snstvty_cls_txt": null,
                            "dmc_approver_id": null,
                            "dat_stwd_crtfy_appr_rqst_dt": null,
                            "obj_prpt_cnt": null,
                            "lnd_file_path_txt": null,
                            "lnd_file_nm": null,
                            "cntl_file_nm": null,
                            "sub_area_nm": "Claims",
                            "dl_raw_site_id": null,
                            "arc_site_id": null,
                            "dl_raw_loc_txt": null,
                            "dl_raw_obj_type_nm": null,
                            "rmv_hdr_rec_ind": null,
                            "rmv_trlr_rec_ind": null,
                            "err_thrshd_pct_nbr": null,
                            "wrng_thrshd_pct_nbr": null,
                            "end_of_ln_sep_cd": null,
                            "prflg_zn_site_id": null,
                            "prflg_zn_loc_txt": null
                          },
                          "attributes": [
                            {
                              "id": "40e3090a08ca4377075e6bb6199c3b51",
                              "assetName": "Account_no",
                              "dataType": "decimal",
                              "dataTypeLength": null,
                              "isNull": "N",
                              "isPK": "Y",
                              "isFK": "N",
                              "orderNumber": 1
                            },
                            {
                              "id": "b0c69582cbd985cdbb2afea20d0b5f73",
                              "assetName": "Cust_Name",
                              "dataType": "string",
                              "dataTypeLength": "30",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 2
                            },
                            {
                              "id": "c454446706ccb10f6d7a2b31ae909cbd",
                              "assetName": "Address1",
                              "dataType": "string",
                              "dataTypeLength": "40",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 3
                            },
                            {
                              "id": "936d5064626fed28c7709aaec10323ed",
                              "assetName": "City",
                              "dataType": "string",
                              "dataTypeLength": "20",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 4
                            },
                            {
                              "id": "d18f55de099af8071ab2dccf534d7321",
                              "assetName": "State",
                              "dataType": "string",
                              "dataTypeLength": "20",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 5
                            },
                            {
                              "id": "56d1da32709e3393d5b81db9d3cfddec",
                              "assetName": "PIN",
                              "dataType": "decimal",
                              "dataTypeLength": null,
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 6
                            },
                            {
                              "id": "8f069ed974c65af919c942e54ceb8dc9",
                              "assetName": "rec_id",
                              "dataType": "int",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 7
                            },
                            {
                              "id": "9986562e17971ddd1aaea94ba479c2e7",
                              "assetName": "run_id",
                              "dataType": "string",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 8
                            },
                            {
                              "id": "e23b761ef993e4fd72c7b7c1c2694a48",
                              "assetName": "eff_strt_ts",
                              "dataType": "timestamp",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 9
                            },
                            {
                              "id": "f4d9fcc80248ee94f22efdf358864cea",
                              "assetName": "eff_end_ts",
                              "dataType": "timestamp",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 10
                            }
                          ]
                        }
                      },
                      "keys": "Account_no"
                    },
                    "keys": ""
                  },
                  {
                    "name": "acct_dtl_map",
                    "data": {
                      "name": "acct_dtl_map",
                      "id": "",
                      "details": "",
                      "attributes": [
                        {
                          "id": "7ea045717f0e35f06ec69bbb35fac231",
                          "assetName": "Account_no",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 1,
                          "uniqueId": "7ea045717f0e35f06ec69bbb35fac231_1586669684713",
                          "tfm_rul_txt": "Account_no"
                        },
                        {
                          "id": "ce8b39d38982fe38f5417afa5d09592b",
                          "assetName": "City",
                          "dataType": "string",
                          "dataTypeLength": "20",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 4,
                          "uniqueId": "ce8b39d38982fe38f5417afa5d09592b_1586669684713",
                          "tfm_rul_txt": "lower(City)",
                          "obj_prpt_nm": "City"
                        },
                        {
                          "id": "bc12e6013bc0747adeec9fdf45de3863",
                          "assetName": "State",
                          "dataType": "string",
                          "dataTypeLength": "20",
                          "isNull": "N",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 5,
                          "uniqueId": "bc12e6013bc0747adeec9fdf45de3863_1586669684714",
                          "tfm_rul_txt": "State"
                        },
                        {
                          "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                          "assetName": "PIN",
                          "dataType": "decimal",
                          "dataTypeLength": null,
                          "isNull": "Y",
                          "isPK": "N",
                          "isFK": "N",
                          "orderNumber": 6,
                          "uniqueId": "ae411b5ce19e2e3f1f4bdbf4920ecd6d_1586669684714",
                          "tfm_rul_txt": "PIN"
                        }
                      ],
                      "filterCondition": "acct_dtl map cond",
                      "output": "",
                      "source": {
                        "name": "acc_dtl",
                        "data": {
                          "id": "2e9da73c428173619c7e0cf9490fbc5c",
                          "name": "acc_dtl",
                          "details": {
                            "id": "2e9da73c428173619c7e0cf9490fbc5c",
                            "dat_src_nm": "postgre_demo125",
                            "ln_of_bsn_nm": "Life Insurance",
                            "apn_nm": "CRM",
                            "ln_of_bsn_id": "c44c59d1cb49740e680c42835ffef461",
                            "prgm_id": "-1",
                            "prj_id": "-1",
                            "apn_id": "494cb3b121460307859ccf42faf341a5",
                            "sub_apn_id": "-1",
                            "obj_phy_nm": "Account_dtl_v",
                            "obj_type_nm": "View",
                            "site_id": "a02abac05e79345b5921363039c04e64",
                            "obj_loc_path_txt": "s3://intzone-gathi/gathi_ins/Claims/2e9da73c428173619c7e0cf9490fbc5c",
                            "obj_schm_nm": "gathi_ins_intgn_v",
                            "obj_db_pltfm_nm": "HIVE",
                            "obj_lyr_nm": "intzone-gathi",
                            "obj_ownr_id": "kalyan",
                            "obj_dat_dmn_nm": "dummy",
                            "obj_fnl_dmn_nm": null,
                            "src_apn_identifer": null,
                            "obj_dat_stwd_id": null,
                            "rec_lst_updt_ts": "2020-04-07T11:16:32.526231",
                            "rec_lst_updt_by_id": "kalyan",
                            "org_id": "7248518a1808eae38650458ce81ba05a",
                            "obj_bsn_nm": "Account_dtl",
                            "obj_desc_txt": "test",
                            "obj_fmt_type_nm": "Parquet",
                            "clnt_dat_shrbl_ind": "Y",
                            "obj_frq_nm": null,
                            "obj_rttn_day_cnt": null,
                            "obj_trst_lvl_pct": null,
                            "obj_trst_lvl_rsn_txt": null,
                            "file_dlmt_cd": "    ",
                            "obj_low_rec_cnt": null,
                            "obj_high_rec_cnt": null,
                            "obj_lst_arc_dt": null,
                            "obj_arc_loc_txt": null,
                            "obj_prvc_lvl_txt": null,
                            "obj_ver_nbr": null,
                            "obj_size_txt": "0.03 MB",
                            "obj_char_set_nm": null,
                            "obj_url_txt": null,
                            "obj_lst_mdfd_ts": null,
                            "obj_lst_mdfd_by_id": null,
                            "obj_crtd_ts": "2020-04-07T06:55:23.057758",
                            "obj_crtd_by_id": "kalyan",
                            "std_obj_nm": null,
                            "tab_prpt_txt": null,
                            "prtn_infmn_txt": null,
                            "index_infmn_txt": null,
                            "lst_clt_stats_ts": null,
                            "purge_frq_days_cnt": null,
                            "obj_rows_cnt": 3,
                            "obj_arc_frq_nm": null,
                            "obj_load_type_nm": "Delta",
                            "crtfy_lvl_1_ind": null,
                            "crtfy_lvl_2_ind": null,
                            "crtfy_lvl_3_ind": null,
                            "dmc_crtfy_dt": null,
                            "dmc_crtfy_sta_cd": null,
                            "is_gldn_obj_flg": null,
                            "snstvty_cls_txt": null,
                            "dmc_approver_id": null,
                            "dat_stwd_crtfy_appr_rqst_dt": null,
                            "obj_prpt_cnt": null,
                            "lnd_file_path_txt": "NA",
                            "lnd_file_nm": "NA",
                            "cntl_file_nm": null,
                            "sub_area_nm": "",
                            "dl_raw_site_id": "a02abac05e79345b5921363039c04e64",
                            "arc_site_id": null,
                            "dl_raw_loc_txt": "s3://rawzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c",
                            "dl_raw_obj_type_nm": "file",
                            "rmv_hdr_rec_ind": "N",
                            "rmv_trlr_rec_ind": null,
                            "err_thrshd_pct_nbr": null,
                            "wrng_thrshd_pct_nbr": null,
                            "end_of_ln_sep_cd": null,
                            "prflg_zn_site_id": "a02abac05e79345b5921363039c04e64",
                            "prflg_zn_loc_txt": "s3://profzone-gathi/gathi_ins/2e9da73c428173619c7e0cf9490fbc5c"
                          },
                          "attributes": [
                            {
                              "id": "7ea045717f0e35f06ec69bbb35fac231",
                              "assetName": "Account_no",
                              "dataType": "decimal",
                              "dataTypeLength": null,
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 1
                            },
                            {
                              "id": "d1dda5558af654deacbdabdc5be260c4",
                              "assetName": "Cust_Name",
                              "dataType": "string",
                              "dataTypeLength": "30",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 2
                            },
                            {
                              "id": "f32ceb4274b420b7eff32051ae5352eb",
                              "assetName": "Address1",
                              "dataType": "string",
                              "dataTypeLength": "40",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 3
                            },
                            {
                              "id": "ce8b39d38982fe38f5417afa5d09592b",
                              "assetName": "City",
                              "dataType": "string",
                              "dataTypeLength": "20",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 4
                            },
                            {
                              "id": "bc12e6013bc0747adeec9fdf45de3863",
                              "assetName": "State",
                              "dataType": "string",
                              "dataTypeLength": "20",
                              "isNull": "N",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 5
                            },
                            {
                              "id": "ae411b5ce19e2e3f1f4bdbf4920ecd6d",
                              "assetName": "PIN",
                              "dataType": "decimal",
                              "dataTypeLength": null,
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 6
                            },
                            {
                              "id": "d63fea48cf2c09d4c0f4ac1c47a7f806",
                              "assetName": "rec_id",
                              "dataType": "int",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 7
                            },
                            {
                              "id": "aee30050f374eedc6b03d2902c0b24de",
                              "assetName": "run_id",
                              "dataType": "string",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 8
                            },
                            {
                              "id": "c061f528e9cb547db2ba4aa91e056ff4",
                              "assetName": "eff_strt_ts",
                              "dataType": "timestamp",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 9
                            },
                            {
                              "id": "5c75966ec625f4cf0d14674e7b411637",
                              "assetName": "eff_end_ts",
                              "dataType": "timestamp",
                              "dataTypeLength": "",
                              "isNull": "Y",
                              "isPK": "N",
                              "isFK": "N",
                              "orderNumber": 10
                            }
                          ]
                        }
                      },
                      "keys": "Account_no",
                      "join_type": "Inner Join"
                    },
                    "keys": ""
                  }
                ]
              }
            },
            "keys": [
              "Account_no"
            ]
          }
        }
      }
    }
  ];
   
  @ViewChild('mydiv', { static: false }) public deletenode: ElementRef;

  enableModal = false;

  showSelections = false;
  symbols = true;
  sourceNames = { M: "Mapper", J: "Joiner", A: "Aggregator", S: "Source", T: "Target" };
  g: any;
  gt: any;
  render: any;
  nodes = [];
  nonSelectedNodes = [];

  _mapper: any;
  _mapper_src: any;

  _aggr: any;
  _aggr_src: any;

  generatedQueries: any;

  joiner = {
    name: '',
    attributes: [],
    details: [],
    sources: [],
    filterConditions : []
  }

  mapper = {
    name: '',
    attributes: [],
    details: [],
    inputFilterCondition: '',
    source: {
      name: '',
      details: {}
    }
  }

  aggregator = {
    name: '',
    attributes: [],
    details: [],
    inputFilterCondition: '',
    source: {
      name: '',
      details: {}
    },
    keys : []
  }

  joiner_source = {
    name: '',
    attributes: [],
    join_type: '',
    keys: [],
    details: []
  }

  finalJson = [];

  org_id = '';
  org_nm = '';
  role_id = '';
  usr_id = '';

  constructor(
    private service: ApiService,
    private loader: NgxSpinnerService,
    private storage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    // this.toastr.success('Hello world!', 'Toastr fun!');
    this.org_id = this.storage.retrieve('orgid');
    this.org_nm = this.storage.retrieve('orgName');
    this.role_id = this.storage.retrieve('roleId');
    this.usr_id = this.storage.retrieve('userId');

    this.render = new dagreD3.render();
    this.g = new dagreD3.graphlib.Graph();
    // alert(this.router.url)
    // this.getDetails();
    this.route
      .queryParams
      .subscribe(params => {
        this.job.id = params['id'] || ''; 
        if (this.job.id !== '') {
          // edit job
          this.getDetails();
        } else {
          //new job
          this.addNewJob();
        }
      });

    //this.convert();
  }

  _schedulerData: any;

  scheduleJob() {
    //this.selectedNode.type = 'Sch';
    //this.enableModal = true;
    //$("#modalDim").modal({
    //  show: true, backdrop: 'static',
    //  keyboard: false
    //});
    this.convert();
  }

  schedulerUpdate() {
    $("#modalDim").modal('hide');
    this.enableModal = false;
    
  }

  convert() {
    this.finalJson = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (node.type == 'J') {
        this.formatJoiner(node);
      } else if (node.type == 'M') {
        this.formatMapper(node);
      } else if (node.type == 'A') {
        this.formatAggregator(node);
      } else if (node.type == 'T') {
        this.formatTarget(node);
      } else if (node.type == 'S') {
        this.formatSource(node);
      }

    }
    //console.log(this.joiner);
    //console.log(this.joiner_source);

    console.log(this.finalJson);
    const parms = {
      flow_json: {
        nodes: [],
        connections : []
      },
      final_json: this.finalJson
    }
    this.loader.show()
    this.service.post(this.service.generateSQL, parms).subscribe((res) => {
      this.loader.hide();

      this.generatedQueries = res;
      this.selectedNode.type = 'Sch';
      this.enableModal = true;
      $("#modalDim").modal({
        show: true, backdrop: 'static',
        keyboard: false
      });
      this._schedulerData = {
        job :{
          name : this.job.name,
          id: this.job.id,
          connId: this.job.connId
        },
        queries: res,
        flow_json: {
          nodes: this.nodes,
          connections: this.graph_conns
        },
      }
      console.log(this.generatedQueries);
    }, err => {
        this.loader.hide();
        // alert('Got error while generating SQL!!!');
        this.toastr.error('Got error while generating SQL!!!');
    });
  }

  formatTarget(node) {
    const _node = node;
    let tgt = {
      name: node.name,
      id : node.id,
      type: 'Target',
      attributes: _node.data.attributes,
      details: { dbName:_node.data.dbName, schemaName : _node.data.schemaName},
      source: {
        name: _node.data.source.name,
        detail: _node.data.source.details,
        type: _node.data.source.type
      }
    }

    this.finalJson.push(tgt);
  }

  formatSource(node) {
    const _node = node;
    let src = {
      name: node.name,
      id: node.id,
      type: 'Source',
      attributes: _node.data.attributes,
      details: _node.data.details,
    }

    this.finalJson.push(src);
  }

  formatJoiner(node) {
    const _node = node;
    //this.joiner.name = _node.name;
    //this.joiner.attributes = _node.data.attributes;
    //this.joiner.details = _node.data.details;
    //this.joiner.filterConditions = _node.data.filterConditions;

    let joiner = {
      name: _node.name,
      id: node.id,
      type: 'Joiner',
      attributes: _node.data.attributes,
      details: _node.data.details,
      filterConditions: _node.data.filterConditions,
      sources : []
    }

    for (let i = 0; i < _node.data.sources.length; i++) {
      const src = _node.data.sources[i];

      //this.joiner_source.name = src.name;
      //this.joiner_source.attributes = src.data.attributes;
      //this.joiner_source.details = src.data.details;
      //this.joiner_source.join_type = src.data.join_type || '';
      //this.joiner_source.keys = src.data.keys;

      joiner.sources.push({
        name: src.name,
        type: src.type,
        attributes: src.data.attributes,
        details: src.data.details,
        join_type: src.data.join_type || '',
        keys: src.data.keys.split(',')
      });

    }

    this.finalJson.push(joiner);
  }

  formatMapper(node) {
    const _node = node;
    //this.mapper.name = _node.name;
    //this.mapper.attributes = _node.data.attributes;
    //this.mapper.details = _node.data.details;
    //this.mapper.inputFilterCondition = _node.data.filterCondition;


    //this.mapper.source = {
    //  name: _node.data.source.name,
    //  details: _node.data.source.details,
    //}

    let mapper = {
      name: _node.name,
      id: _node.id,
      type: 'Mapper',
      attributes: _node.data.attributes,
      details: _node.data.details,
      inputFilterCondition: _node.data.filterCondition,
      source: {
        name: _node.data.source.name,
        details: _node.data.source.data.details,
        type: _node.data.source.type
      }
    }

    this.finalJson.push(mapper);

  }

  formatAggregator(node) {
    const _node = node;
    //this.aggregator.name = _node.name;
    //this.aggregator.attributes = _node.data.attributes;
    //this.aggregator.details = _node.data.details;
    //this.aggregator.inputFilterCondition = _node.data.filterCondition;
    //this.aggregator.keys = _node.data.keys.split(',');

    //this.aggregator.source = {
    //  name: _node.data.source.name,
    //  details: _node.data.source.details,
    //}

    let aggregator = {
      name: _node.name,
      id: node.id,
      type: 'Aggregator',
      attributes: _node.data.attributes,
      details: _node.data.details,
      inputFilterCondition: _node.data.filterCondition,
      keys: _node.data.keys,
      source: {
        name: _node.data.source.name,
        details: _node.data.source.data.details,
        type: _node.data.source.type
      }
    }
    this.finalJson.push(aggregator);
  }


  getDetails() {
    this.loader.show();
    this.service.post(this.service.dimJobDetailsById, { jobId: this.job.id }).subscribe((res) => {
      this.loader.hide();
      console.log(res);

      this.job = {
        id : this.job.id,
        name: res.job_nm,
        description: res.job_desc_txt,
        jobType: 'DIM_FACT',
        projectId: '12345',
        apnId: res.apn_id,
        lobId : res.ln_of_bsn_id,
        connId: res.conn_id
      }
      
      if(res['flow_json'] != null){
        this.nodes = res['flow_json'][0].nodes;
        this.graph_conns = res['flow_json'][0].connections;
        this.renderGraph(true);

      }


    }, err => {
      this.loader.hide();
    });

    return;

    this.nodes = [
      {
        "name": "S0",
        "id": "Source_1587558667164",
        "class": "source",
        "shape": "rect",
        "img": "src",
        "type": "S",
        "checked": false
      },
      {
        "name": "M0",
        "id": "Mapper_1587558668196",
        "class": "mapper",
        "shape": "ellipse",
        "img": "mapper",
        "type": "M",
        "checked": false,
        "data": {
          "name": "M0",
          "id": "",
          "details": "",
          "attributes": [
            {
              "assetName": "sc",
              "dataType": "",
              "dataTypeLength": "",
              "isNull": "",
              "isPK": "",
              "isFK": "",
              "obj_prpt_nm": "",
              "tfm_rul_txt": "",
              "uniqueId": "9schqhkpymp",
              "id": "9schqhkpymp"
            }
          ],
          "filterCondition": "",
          "output": "",
          "source": {
            "name": "S1",
            "type": "S"
          }
        }
      },
      {
        "name": "J0",
        "id": "Joiner_1587558673796",
        "class": "joiner",
        "shape": "diamond",
        "img": "joiner",
        "type": "J",
        "checked": false,
        "data": {
          "id": "",
          "name": "J0",
          "details": "",
          "attributes": [
            {
              "id": "905656uez96",
              "assetName": "dc",
              "dataType": "",
              "dataTypeLength": "",
              "isNull": "",
              "isPK": "",
              "isFK": "",
              "uniqueId": "905656uez96_1587558747734",
              "tfm_rul_txt": "M1.dc"
            },
            {
              "id": "9schqhkpymp",
              "assetName": "sc",
              "dataType": "",
              "dataTypeLength": "",
              "isNull": "",
              "isPK": "",
              "isFK": "",
              "uniqueId": "9schqhkpymp_1587558747734",
              "tfm_rul_txt": "M0.sc"
            }
          ],
          "filterConditions": [],
          "sources": [
            {
              "name": "M1",
              "data": {
                "name": "M1",
                "id": "",
                "details": "",
                "attributes": [
                  {
                    "assetName": "dc",
                    "dataType": "",
                    "dataTypeLength": "",
                    "isNull": "",
                    "isPK": "",
                    "isFK": "",
                    "obj_prpt_nm": "",
                    "tfm_rul_txt": "",
                    "uniqueId": "905656uez96",
                    "id": "905656uez96"
                  }
                ],
                "filterCondition": "",
                "output": "",
                "source": {
                  "name": "S0",
                  "type": "S"
                },
                "keys": ""
              },
              "type": "M",
              "keys": ""
            },
            {
              "name": "M0",
              "data": {
                "name": "M0",
                "id": "",
                "details": "",
                "attributes": [
                  {
                    "assetName": "sc",
                    "dataType": "",
                    "dataTypeLength": "",
                    "isNull": "",
                    "isPK": "",
                    "isFK": "",
                    "obj_prpt_nm": "",
                    "tfm_rul_txt": "",
                    "uniqueId": "9schqhkpymp",
                    "id": "9schqhkpymp"
                  }
                ],
                "filterCondition": "",
                "output": "",
                "source": {
                  "name": "S1",
                  "type": "S"
                },
                "keys": ""
              },
              "type": "M",
              "keys": ""
            }
          ]
        }
      },
      {
        "name": "S1",
        "id": "Source_1587558686043",
        "class": "source",
        "shape": "rect",
        "img": "src",
        "type": "S",
        "checked": true
      },
      {
        "name": "M1",
        "id": "Mapper_1587558691867",
        "class": "mapper",
        "shape": "ellipse",
        "img": "mapper",
        "type": "M",
        "checked": false,
        "data": {
          "name": "M1",
          "id": "",
          "details": "",
          "attributes": [
            {
              "assetName": "dc",
              "dataType": "",
              "dataTypeLength": "",
              "isNull": "",
              "isPK": "",
              "isFK": "",
              "obj_prpt_nm": "",
              "tfm_rul_txt": "",
              "uniqueId": "905656uez96",
              "id": "905656uez96"
            }
          ],
          "filterCondition": "",
          "output": "",
          "source": {
            "name": "S0",
            "type": "S"
          }
        }
      }
    ];
    this.graph_conns = [
      {
        "trg": "Mapper_1587558668196",
        "src": {
          "name": "S1",
          "id": "Source_1587558686043",
          "class": "source",
          "shape": "rect",
          "img": "src",
          "type": "S",
          "checked": true
        }
      },
      {
        "trg": "Mapper_1587558691867",
        "src": {
          "name": "S0",
          "id": "Source_1587558667164",
          "class": "source",
          "shape": "rect",
          "img": "src",
          "type": "S",
          "checked": false
        }
      },
      {
        "trg": "Joiner_1587558673796",
        "src": {
          "name": "M1",
          "id": "Mapper_1587558691867",
          "class": "mapper",
          "shape": "ellipse",
          "img": "mapper",
          "type": "M",
          "checked": false,
          "data": {
            "name": "M1",
            "id": "",
            "details": "",
            "attributes": [
              {
                "assetName": "dc",
                "dataType": "",
                "dataTypeLength": "",
                "isNull": "",
                "isPK": "",
                "isFK": "",
                "obj_prpt_nm": "",
                "tfm_rul_txt": "",
                "uniqueId": "905656uez96",
                "id": "905656uez96"
              }
            ],
            "filterCondition": "",
            "output": "",
            "source": {
              "name": "S0",
              "type": "S"
            }
          }
        }
      },
      {
        "trg": "Joiner_1587558673796",
        "src": {
          "name": "M0",
          "id": "Mapper_1587558668196",
          "class": "mapper",
          "shape": "ellipse",
          "img": "mapper",
          "type": "M",
          "checked": false,
          "data": {
            "name": "M0",
            "id": "",
            "details": "",
            "attributes": [
              {
                "assetName": "sc",
                "dataType": "",
                "dataTypeLength": "",
                "isNull": "",
                "isPK": "",
                "isFK": "",
                "obj_prpt_nm": "",
                "tfm_rul_txt": "",
                "uniqueId": "9schqhkpymp",
                "id": "9schqhkpymp"
              }
            ],
            "filterCondition": "",
            "output": "",
            "source": {
              "name": "S1",
              "type": "S"
            }
          }
        }
      }
    ];

  }

  newNode = {
    name: "",
    type: ""
  };

  configNewNode() {
    this.addNode(this.newNode);
  }

  initial_src_nm = 's1';

  resetZoom() {
    if (this.zoom != undefined) {
      let svg = d3.select("svg");
      let inner = svg.select("g");
      //.duration(750)
      //this.zoom.scaleBy(svg.transition().duration(750), 1.3);
      //svg.transition().call(this.zoom.transform, d3.zoomIdentity.scale(1));
      svg.call(this.zoom.transform, d3.zoomIdentity.scale(1));
    }

    //this.zoom = d3.zoom()
    //  .on("zoom", () => {
    //    inner.attr("transform", d3.event.transform);
    //  });
    //svg.call(this.zoom);
    //svg.on("dblclick.zoom", null);
  }

  addNode(newNode) {

    this.resetZoom();

    this.selectedNode = {
      id: "",
      name: "",
      type: ""
    };

    debugger
    let data = this.nodes.filter(x => x.type == newNode.type);
    let len = data.length;
    //name: newNode.name,
    const node = {
      name: "",
      id: "",
      class: "",
      shape: "",
      img: "",
      type: ""
    };

    if (newNode.type === "S") {
      node.name = `S${len}`;
      node.id = "Source_" + Date.now().toString();
      node.class = "source";
      node.shape = "rect";
      node.img = "src";
      node.type = "S";
      this.nodes.push(node);
    }
    if (newNode.type === "M") {
      // node.name = "Mapper";
      node.name = `M${len}`;
      node.id = "Mapper_" + Date.now().toString();
      node.class = "mapper";
      node.shape = "ellipse";
      node.img = "mapper";
      node.type = "M";
      this.nodes.push(node);
    }
    if (newNode.type === "A") {
      // node.name = "Aggr";
      node.name = `A${len}`;
      node.id = "Aggr_" + Date.now().toString();
      node.class = "agg";
      node.shape = "rect";
      node.img = "aggr";
      node.type = "A";
      this.nodes.push(node);
    }
    if (newNode.type === "J") {
      // node.name = "Joiner";
      node.name = `J${len}`;
      node.id = "Joiner_" + Date.now().toString();
      node.class = "joiner";
      node.shape = "diamond";
      node.img = "joiner";
      node.type = "J";
      this.nodes.push(node);
    }
    if (newNode.type === "F") {
      // node.name = "Filter";
      node.id = "Filter_" + Date.now().toString();
      node.class = "filter";
      this.nodes.push(node);
    }
    if (newNode.type === "T") {
      node.name = `T${len}`;
      node.id = "Tgt_" + Date.now().toString();
      node.class = "tgt";
      node.shape = "rect";
      node.img = "tgt";
      node.type = "T";
      this.nodes.push(node);
    }

    this.id = node.id;

    if (this.graph_conns.length > 0) {
      this.combine(this.graph_conns);
    } else {
      this.renderGraph(true);
    }

    setTimeout(() => {
      this.showNewNodeConfig(node.id);

    });

    this.newNode = {
      name: "",
      type: ""
    };
  }
   
  showNewNodeConfig(id) {
    var _node = this.g.node(id);
    this.showSelections = false;
    this.selectedNode.id = id;
    this.selectedNode.name = _node.data.name;
    this.selectedNode.type = id.split("_")[0];
    if (id.split("_")[0] === "Source") {
      this.log("SRC");
    }
    else {
      this.showSelections = true;
      this.selection(id, _node);
    }

    //this.id = id;

    //var nodeClass = this.g.node(id).class;
    //alert(nodeClass)
    //this.g.node(id).class = nodeClass.toString().replace('highLight', ' ').trim();
    //this.g.node(id).class += ' highLight';
    //var nodeClass = this.g.node(id).class;
    //alert(nodeClass)

    //this.renderGraph(true)
  }

  selectedNode = {
    id: "",
    name: "",
    type: ""
  };

  svg: any;
  drag_line: any;
  show_src = false;
  //_source: Source;
  _source: any;
  id: any;
  zoom: any;
  hoveredNode = '';

  private renderGraph(setNodes: boolean) {
    this.g = new dagreD3.graphlib.Graph();
    //  "UL", "UR", "DL", DR"
    // nodesep: 20, edgesep: 50,  rankSep: 50
    this.g.setGraph({
      rankdir: "LR", align: '', marginx: 50, marginy: 50
      , ranker: 'longest-path', labelpos: 'c', labeloffset: 20, 
    });

    this.g.setDefaultEdgeLabel(() => {
      return {};
    });

    this.setNodes();

    const cn_nodes = this.graph_conns;


    for (let i = 0; i < cn_nodes.length; i++) {
      // const lbl = cn_nodes[i].name;
      const trg = cn_nodes[i]["trg"];
      this.log("&&&&&&&&&&&&");
      this.log(cn_nodes[i]["src"]);
      this.log(cn_nodes[i]["src"].id);
      const src = cn_nodes[i]["src"].id;
      const id = cn_nodes[i].id;
      // this.g.setEdge(this.selectedNode, id);
      //  curve: d3.curveBasis,
      this.g.setEdge(src, trg, { lineInterpolate: "basis", arrowheadClass: 'arrowhead' });
      //this.g.set
    }

    //if (this.id !== undefined) {
    //  var hi = this.node_click_action(this.g, this.id);
    //}


    if (setNodes) {
      //this.setNodes();
    }

    // Create the renderer
    let render = this.render;
    // Set up an SVG group so that we can translate the final graph.
    let svg = d3.select('#dimContainer').select("svg");
    let inner = svg.select("g");

    this.svg = svg;

    //var defs = svg.append("defs");

    //var filter = defs.append("filter")
    //  .attr("id", "drop-shadow")
    //  .attr("height", "130%");

    //// for each rendered node, apply #drop-shadow filter
    //var item = svg.selectAll("g.node")
    //  .style("filter", "url(#drop-shadow)")
    //  .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });


    this.g.nodes().forEach((v) => {
      var node = this.g.node(v);
      node.rx = node.ry = 5;
    });

    //this.svg.append('svg:path')
    //  .attr('class', 'link dragline hidden')
    //  .attr('d', 'M0,0L0,0');
    //let container = d3.select("g");

    //let transform = d3.zoomIdentity.translate(1, 1).scale(1);



    //Set up zoom support
    this.zoom = d3.zoom()
      .on("zoom", () => {
        inner.attr("transform", d3.event.transform);
      });
    svg.call(this.zoom);
    //svg.call(this.zoom.transform, transform)
    svg.on("dblclick.zoom", null);
    //svg.on("wheel.zoom", null);
    //svg.on("wheel.zoom", null);


    //// Set up zoom support
    //var zoom = d3.zoom().on("zoom", () => {
    //  alert(d3.event.translate)
    //  inner.attr("transform", "translate(" + d3.event.translate + ")" +
    //    "scale(" + d3.event.scale + ")");
    //});
    //svg.call(zoom);


    // Simple function to style the tooltip for the given node.
    var styleTooltip = (name, description) => {
      return "<p class='name'>" + 'name' + "</p><p class='description'>" + 'description' + "</p>";
    };

    // Run the renderer. This is what draws the final graph.
    render(inner, this.g);

    //inner.selectAll("g.node")
    //  .attr("title",  (v) => { return styleTooltip(v, this.g.node(v).description) })
    //  .each( (v) => { $(this).tipsy({ gravity: "w", opacity: 1, html: true }); });

    // Center the graph
    //var initialScale = 0.75;
    //svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - this.g.graph().width * initialScale) / 2, 20).scale(initialScale));


    var initialScale = 0.75;
    //let transform = d3.zoomIdentity
    //  .translate((svg.attr("width") - this.g.graph().width * initialScale) / 2, 20)
    //  .scale(initialScale);
    //let transitionDuration = 5000;
    //inner //or svg, doesn't seem to matter
    //  .transition()
    //  .duration(transitionDuration || 0) // milliseconds
    //  .call(zoom.transform, transform);
    //var cc = this.clickcancel();
    //var xCenterOffset = (svg.attr("width") - this.g.graph().width) / 2;
    //inner.attr("transform", "translate(" + xCenterOffset + ", 20)");

    svg.attr("height", this.g.graph().height + 40);
   
    //svg.attr('height', this.g.graph().height + 40);
    svg.selectAll("g.node").attr('id', id => {
      return (id)
    })
    svg.selectAll("g.node")
      .on('dblclick', (id) => {
        this.id = id;
        this.congifure();
        //alert(this.selectedNode.type)
        //if (this.selectedNode.type === "Source") {
        //  //this.show_src = true;
        //  debugger
        //  this._source = this.selectedNode;
        //  const src = this.nodes.filter(x => x.id == this.selectedNode.id);
        //  this._source = src[0];
        //}

        //if (this.selectedNode.type == "Mapper") {
        //  debugger
        //  this._mapper = this.selectedNode;
        //  const mapr = this.nodes.filter(x => x.id == this.selectedNode.id);
        //  let src: any = this.graph_conns.filter(x => {
        //    if (x.trg == this.selectedNode.id) {
        //      debugger
        //      return x.src
        //    }
        //  });

        //  src = src[0].src
        //  this._mapper = mapr[0];
        //  this._mapper_src = this.g.node(src.id).data;

        //}

        //if (this.selectedNode.type == "Aggr") {
        //  debugger
        //  this._mapper = this.selectedNode;
        //  const mapr = this.nodes.filter(x => x.id == this.selectedNode.id);
        //  let src: any = this.graph_conns.filter(x => {
        //    if (x.trg == this.selectedNode.id) {
        //      debugger
        //      return x.src
        //    }
        //  });

        //  src = src[0].src
        //  this._aggr = mapr[0];
        //  this._aggr_src = this.g.node(src.id).data;

        //}

        //$("#modalDim").modal({ show: true });

      })
      .on("click", id => {
        var _node = this.g.node(id);
        this.showSelections = false;
        this.selectedNode.id = id;
        this.selectedNode.name = _node.data.name;
        this.selectedNode.type = id.split("_")[0];
        if (id.split("_")[0] === "Source") {
          this.log("SRC");
        }
        else {
          this.showSelections = true;
          this.selection(id, _node);
        }

        this.id = id;

        //'click .button' =  () => {
        //  buttonclicked = 'true'
        //}




        //var hi = this.node_click_action(this.g, id)
        //this.g = new dagreD3.graphlib.Graph();
        //this.renderGraph(true);
        //render(container, this.g);


        //d3.select('#', + id).classed('bluebackground', true);
        console.log(d3.select("#" + id))
        console.log(d3.selectAll("g"))
        console.log(d3.select("#" + id))
        //var s = d3.selectAll("g")
        //  .filter((d) => {
        //    console.log(d)
        //    return d.data.uniqueID === id;
        //  });
        //console.log(s)
        d3.selectAll("g").classed('highlight', false);
        if (d3.select("#" + id).classed('highlight')) {
          //alert('O')
          d3.select("#" + id).classed('highlight', false);
          //Remove class selectedNode
        } else {
          //alert(1)
          d3.select("#" + id).classed('highlight', true);
          //Adds class selectedNode
        }
      });
    //d3.selectAll("g").classed('highlight', true);
    d3.selectAll("g.node").on("mouseover", (id) => {
      this.hoveredNode = id;
    })
    d3.selectAll(".delete-icon").on("click", () => {
      //let msa = d3.select(this);

      //alert(msa);
      //console.log(msa)
      this.deleteNode(this.hoveredNode);
      //console.log(g.node)

    })

    d3.selectAll("delete-icon").on("click", (id) => {
      // alert(id);
      this.deleteNode(id);

    })

    d3.select("body").on("keydown", () => {
      //alert(d3.event.keyCode )
      if (d3.event.keyCode == 46)
        this.deleteNode();
    })

    d3.select('#zoom-in').on('click',  () => {
      // Smooth zooming
      this.zoom.scaleBy(svg.transition().duration(750), 1.3);
    });

    d3.select('#zoom-out').on('click',  () =>{
      // Ordinal zooming
      this.zoom.scaleBy(svg.transition().duration(750), 1 / 1.3);
    });


    d3.select('#zoom-reset').on('click', () => {
      this.resetZoom();
    });

    //__________________minimap


    //var minimapWidth = 500 / 4,
    //  minimapHeight = 500 / 4;
    //var minimapMargin = { right: 20, bottom: 20 };

    //var minimap = svg.append("g")
    //  .attr("transform", "translate(" + (500 - minimapWidth - minimapMargin.right) + "," + (500 - minimapHeight - minimapMargin.bottom) + ")");

    //minimap.append("rect")
    //  .attr("class", "minimap")
    //  .attr("width", minimapWidth)
    //  .attr("height", minimapHeight);

    //var brush = d3.brush()
    //  .extent([[0, 0], [minimapWidth, minimapHeight]])
      //.on("start brush", brushed);

    //__________________minimap

    // filters go in defs element
    var defs = svg.append("defs");

    //// create filter with id #drop-shadow
    //// height=130% so that the shadow is not clipped
    //var filter = defs.append("filter")
    //  .attr("id", "drop-shadow")
    //  //.attr("height", "130%");

    //// SourceAlpha refers to opacity of graphic that this filter will be applied to
    //// convolve that with a Gaussian with standard deviation 3 and store result
    //// in blur
    //filter.append("feGaussianBlur")
    //  .attr("in", "SourceAlpha")
    //  .attr("stdDeviation", 0)
    //  .attr("result", "blur");

    //// translate output of Gaussian blur to the right and downwards with 2px
    //// store result in offsetBlur
    //filter.append("feOffset")
    //  .attr("in", "blur")
    //  .attr("dx", 2)
    //  .attr("dy", 2)
    //  .attr("result", "offsetBlur");

    //// overlay original SourceGraphic over translated blurred opacity by using
    //// feMerge filter. Order of specifying inputs is important!
    //var feMerge = filter.append("feMerge");

    //feMerge.append("feMergeNode")
    //  .attr("in", "offsetBlur")
    //feMerge.append("feMergeNode")
    //  .attr("in", "SourceGraphic");



    //__________________________start

    var filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("color-interpolation-filters", "sRGB");

    filter.append("feOffset")
      .attr("result", "offOut")
      .attr("in", "SourceGraphic")
      .attr("dx", 0)
      .attr("dy", 0);

    filter.append("feGaussianBlur")
      .attr("stdDeviation", 2);

    filter.append("feOffset")
      .attr("dx", 5)
      .attr("dy", 5)
      .attr("result", "shadow");

    filter.append("feComposite")
      .attr("in", 'offOut')
      .attr("in2", 'shadow')
      .attr("operator", "over");

    //___________________________end

    //_________________________ glow start

    //var filter = defs.append("filter")
    //  .attr("id", "glow");

    //filter.append("feGaussianBlur")
    //  .attr("class", "blur")
    //  .attr("stdDeviation", "8")
    //  .attr("result", "coloredBlur");

    //var feMerge = filter.append("feMerge");
    //feMerge.append("feMergeNode")
    //  .attr("in", "coloredBlur");
    //feMerge.append("feMergeNode")
    //  .attr("in", "SourceGraphic");
    //____________________________ glow end


    // for each rendered node, apply #drop-shadow filter
    var item = svg.selectAll("rect")
      //.enter().append("rect")
      //.attr("width", 170)
      //.attr("height", 100)
      //.attr("fill", "red")
      //.attr("stroke-width", 2)
      .style("filter", "url(#drop-shadow)"); //"url(#glow)" url(#drop-shadow)
    //.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });



    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped

    //d3.selectAll('#' + this.id).on("click", () => alert(this.id))

    //var button = d3.button()
    //  .on('press',  (d, i) => { console.log("Pressed", d, i) })
    //  .on('release',  (d, i) =>  { console.log("Released", d, i) });



    //.on('mouseup', (id) => {
    //  // this.log('comp mouseup');
    //  //if (!mousedown_node) return;

    //  // needed by FF
    //  //this.drag_line
    //  //  .classed('hidden', true)
    //  //  .style('marker-end', '');

    //  // check for drag-to-self
    //  //mouseup_node = d;
    //  //if (mouseup_node === mousedown_node) {
    //  //  resetMouseVars();
    //  //  return;
    //  //
    //})

    //.on("mousedown", this.listen)
    //  .on("touchstart", this.listen)
    //  .on("touchend", this.ignore)
    //  .on("touchleave", this.ignore)
    //  .on("mouseup", this.ignore)
    //  .on("mouseleave", this.ignore);

  }

  //clickcancel() {
  //  var event = d3.dispatch('click', 'dblclick');
  //  function cc(selection) {
  //    var down,
  //      tolerance = 5,
  //      last,
  //      wait = null;
  //    // euclidean distance
  //    function dist(a, b) {
  //      return ''
  //      //return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2));
  //    }
  //    selection.on('mousedown', function () {
  //      down = d3.mouse(document.body);
  //      last = +new Date();
  //    });
  //    selection.on('mouseup', function () {
  //      if (dist(down, d3.mouse(document.body)) > tolerance) {
  //        return;
  //      } else {
  //        if (wait) {
  //          window.clearTimeout(wait);
  //          wait = null;
  //          event.dblclick(d3.event);
  //        } else {
  //          wait = window.setTimeout((function (e) {
  //            return function () {
  //              event.click(e);
  //              wait = null;
  //            };
  //          })(d3.event), 300);
  //        }
  //      }
  //    });
  //  };
  //  //return d3.rebind(cc, event, 'on');
  //}

  private congifure() {
    const id = this.id;
    if (this.selectedNode.type === "Source") {
      //this.show_src = true;
      debugger
      this._source = this.selectedNode;
      const src = this.nodes.filter(x => x.id == this.selectedNode.id);
      this.log(src)
      this._source = src[0];
    }

    if (this.selectedNode.type == "Mapper") {
      debugger
      this._mapper = this.selectedNode;
      const mapr = this.nodes.filter(x => x.id == this.selectedNode.id);
      let src: any = this.graph_conns.filter(x => {
        if (x.trg == this.selectedNode.id) {
          debugger
          return x.src
        }
      });

      if (src.length > 0) {
        src = src[0].src
        this._mapper_src = this.g.node(src.id).data;
        this._mapper_src.type = src.type;
      } else {
        // alert('link source before configuring.');
        this.toastr.info('Link source before configuring.')
        return;
      }

      const data = cloneDeep(mapr[0]);
      this._mapper = data;
    }

    if (this.selectedNode.type == "Aggr") {
      debugger
      this._aggr = this.selectedNode;
      const aggr = this.nodes.filter(x => x.id == this.selectedNode.id);
      let src: any = this.graph_conns.filter(x => {
        if (x.trg == this.selectedNode.id) {
          debugger
          return x.src
        }
      });

      if (src.length > 0) {
        src = src[0].src
        this._aggr_src = cloneDeep(this.g.node(src.id).data);
        this._aggr_src.type = src.type;
      } else {
        // alert('link source before configuring.');
        this.toastr.info('Link source before configuring.')
        return;
      }

      const data = cloneDeep(aggr[0]);
      this._aggr = data;

    }

    if (this.selectedNode.type == "Joiner") {
      debugger
      this._joiner = this.selectedNode;
      const joiner = this.nodes.filter(x => x.id == this.selectedNode.id);
      let src: any = this.graph_conns.filter(x => {
        if (x.trg == this.selectedNode.id) {
          debugger
          return x.src
        }
      });
      const srcs_data = []
      if (src.length > 0) {
        for (let i = 0; i < src.length; i++) {
          srcs_data.push({ ...this.g.node(src[i].src.id).data, type: src[i].src.type});
        }
        this._joiner_src = cloneDeep(srcs_data);
      } else {
        // alert('link source before configuring.')
        this.toastr.info('Link source before configuring.')
      }

      //const data = [...joiner]
      const data = cloneDeep(joiner[0]);
      this._joiner = data;

    }


    if (this.selectedNode.type == "Tgt") {
      //alert('tgt')
      this._target = this.selectedNode;
      const tgt = this.nodes.filter(x => x.id == this.selectedNode.id);
      let src: any = this.graph_conns.filter(x => {
        if (x.trg == this.selectedNode.id) {
          debugger
          return x.src
        }
      });

      if (src.length > 0) {
        src = src[0].src
        this._target_src = this.g.node(src.id).data;
        this._target_src.type = src.type
      } else {
        // alert('link source before configuring.');
        this.toastr.info('Link source before configuring.')
        return;
      }

      const data = cloneDeep(tgt[0]);
      this._target = data;
    }


    this.enableModal = true;

    $("#modalDim").modal({
      show: true, backdrop: 'static',
      keyboard: false
    });

  }

  private node_click_action(g, id) {

    var default_dagreD3e_style = "fill: rgba(255,255,255, 0); stroke: #d5d5d5; stroke-width: 1.5px;";
    var default_dagreD3arrowhead_style = "fill: #c5c5c5; stroke: #c5c5c5; stroke-width:4px;";

    var outbound_edge_style = "fill: rgba(255,255,255, 0); stroke: #ffa205; stroke-width: 1.5px;";
    var outbound_arrowhead_style = "fill: #ffa205; stroke: #ffa205; stroke-width:4px;";

    var inbound_edge_style = "fill: rgba(255,255,255, 0); stroke: #32CD32; stroke-width: 1.5px;";
    var inbound_arrowhead_style = "fill: #32CD32; stroke: #32CD32; stroke-width:4px;";

    var highLight;

    //if (d3.select('#', + id).classed('highLight')) {
    //  d3.select('#', + id).classed('highLight', false);
    //  //Remove class selectedNode
    //} else {
    //  d3.select('#', + id).classed('highLight', true);
    //  //Adds class selectedNode
    //}

    if (g.node(id)) {
      var nodeClass = g.node(id).class;
      if (nodeClass.indexOf('highLight') != -1) {
        g.node(id).class = nodeClass.toString().replace('highLight', ' ').trim();

        g.edges().forEach(function (e, v, w) {
          var edge = g.edge(e);
          edge.style = default_dagreD3e_style;
          edge.arrowhead = "vee";
          edge.arrowheadStyle = default_dagreD3arrowhead_style;
        });
        highLight = 'off';
      } else {
        g.nodes().forEach((v) => {
          var node = g.node(v);
          nodeClass = node.class;
          if (nodeClass) node.class = nodeClass.replace('highLight', ' ').trim();
        });
        g.edges().forEach((e, v, w) => {
          var edge = g.edge(e);
          edge.style = default_dagreD3e_style;
          edge.arrowhead = "vee";
          edge.arrowheadStyle = default_dagreD3arrowhead_style;
          if (e.v == id) {
            edge.style = outbound_edge_style;
            edge.arrowhead = "vee";
            edge.arrowheadStyle = outbound_arrowhead_style;
          } else if (e.w == id) {
            edge.style = inbound_edge_style;
            edge.arrowhead = "vee";
            edge.arrowheadStyle = inbound_arrowhead_style;
          }
        });
        g.node(id).class += ' highLight';
        highLight = 'on'
      }
      console.debug('click node : ' + id);
    }


    return highLight;
  }

  deleteSelectedNode() {
    // alert();

  }

  trashfuntion() {
    // alert("Called");
  }
  node_shape = 'rect';
  private setNodes() {
    //stroke: #d5d5d5;
    var default_dagreD3e_style = "fill: rgba(255,255,255, 0);  stroke-width: 1.5px;";
    var default_dagreD3arrowhead_style = "fill: #c5c5c5; stroke: #c5c5c5; stroke-width:4px;";

    var outbound_edge_style = "fill: rgba(255,255,255, 0); stroke: #ffa205; stroke-width: 1.5px;";
    var outbound_arrowhead_style = "fill: #ffa205; stroke: #ffa205; stroke-width:4px;";

    var inbound_edge_style = "fill: rgba(255,255,255, 0); stroke: #32CD32; stroke-width: 1.5px;";
    var inbound_arrowhead_style = "fill: #32CD32; stroke: #32CD32; stroke-width:4px;";

    for (let i = 0; i < this.nodes.length; i++) {
      let name = this.nodes[i].name;
      let lbl = this.nodes[i].name;
      const id = this.nodes[i].id;
      let cls = ''
      let nodeType = this.nodes[i].type == 'S' ? 'Source' :
        this.nodes[i].type == 'M' ? 'Mapper' :
          this.nodes[i].type == 'A' ? 'Aggregator' :
            this.nodes[i].type == 'J' ? 'Joiner' : 'Target';
      if (this.id == id) {
        //alert(this.nodes[i].class);
        cls = `${this.nodes[i].class} highlight`;

      } else {
        cls = this.nodes[i].class;

      }
      const data = { name: name, data: this.nodes[i].data }
      let shape = this.nodes[i].shape, width = 50, height = 50, img = this.nodes[i].img;
      this.node_shape = 'circle';
      //alert(this.symbols)
      if (this.symbols) {
        //<span class="node-name" style = "font-size: 24px; font-weight: bold;
        //color: #5e94ff; ">${this.nodes[i].type}</span>
        //rounded - circle
        //<span class="node-type-name" > ${ nodeType } </span>
        lbl = `

<div class="row row1">
 
  <div class="col-md-12">
 <img class="img-responsive icon" style="align:left" src=assets/images/dim_icons/${this.node_shape}/${img}.svg>

  </div>
 
</div>
<div class="row">
  <div class="col-md-12">
    <span class="node-name">${name}</span>
  </div>
</div>

            `;
        lbl = ` 
  <div >
 <img class="img-responsive " style="align:left" src=assets/images/dim_icons/${this.node_shape}/${img}.svg>
  </div>
    <div class="node-name" >${name}</div>    
`;
       
        shape = this.node_shape;
        width = 70; //120
        height = 45; //45
      }
      this.g.setNode(id, {
        labelType: "html",
        label: lbl,
        width: width,
        height: height,
        class: cls,

        style: default_dagreD3e_style,
        shape: shape,
        // labelStyle: "width:200",
        data: data
      });
    }
  }

  selection(itm, node) {
    this.nonSelectedNodes = [];
    this.showSelections = false;

    //this.selectedNode.id = itm;
    //this.selectedNode.name = node.label;
    if (this.graph_conns.length === 0) {
      this.nonSelectedNodes = this.nodes.filter(x => {
        return x.id !== itm;
      });
      const nodes = this.nonSelectedNodes.map(x => ({ ...x, checked: false }));
      this.nonSelectedNodes = nodes;
    } else {
      const data = this.graph_conns.filter(x => x.trg === this.selectedNode.id);
      this.nonSelectedNodes = this.nodes.filter(x => {
        return x.id !== itm;
      });


      //

      //const fd = this.graph_conns.find(x => x.trg = itm)
      //this.log('fd___', fd)

      const srcs = data.map(x => { return x.src.id })
      this.nonSelectedNodes.map(x => x.checked = false)

      for (let i = 0; srcs.length > i; i++) {
        this.nonSelectedNodes.map(x => {
          if (x.id === srcs[i]) {
            x.checked = true;
          }
        })

      }

      //for (let i = 0; this.nonSelectedNodes.length > i; i++) {
      //  const node = this.nonSelectedNodes[i]
      //  for (let j = 0; this.graph_conns.length > j; j++) {
      //    const conn = this.graph_conns[j]
      //  }

      //}
      //

      //const nn = [];
      //for (let i = 0; this.graph_conns.length > i; i++) {
      //  const ele = this.graph_conns[i];
      //  this.log("ele________", ele);
      //  this.nonSelectedNodes = this.nonSelectedNodes.map(x => {
      //    this.log("x___", x);
      //    if (x.id === ele["src"].id && itm === ele["trg"]) {
      //      const obj = { ...x, checked: ele["src"].checked };
      //      return obj;
      //    } else {
      //      const obj = { ...x, checked: false };
      //      return obj;
      //    }
      //  });
      //}
      // const nodes = this.nonSelectedNodes.map(x => ({ ...x, checked: false }));
      // this.nonSelectedNodes = nodes;
    }


    setTimeout(() => {
      this.showSelections = true;
    }, 100)
  }

  combine(itm) {

    this.g = new dagreD3.graphlib.Graph();
    this.log("*************");
    this.log(this.selectedNode);
    this.log(this.nodes);
    let cn_nodes = this.graph_conns;

    //this.setNodes();

    for (let i = 0; i < cn_nodes.length; i++) {
      // const lbl = cn_nodes[i].name;
      const trg = cn_nodes[i]["trg"];
      this.log("&&&&&&&&&&&&");
      this.log(cn_nodes[i]["src"]);
      this.log(cn_nodes[i]["src"].id);
      const src = cn_nodes[i]["src"].id;
      const id = cn_nodes[i].id;
      // this.g.setEdge(this.selectedNode, id);
      this.g.setEdge(src, trg, { lineInterpolate: "basis", curve: d3.curveBasis, arrowheadClass: 'arrowhead' });
      //this.g.set
    }

    this.renderGraph(false);
  }

  graph_conns = [];
  nodes_selection = [];

  checkValue(eve, itm) {
    let canLink = true;
    const dd = this.nonSelectedNodes;
    let _nodes = [];

    this.g.edges().forEach((e, v, w) => {
      debugger
      var edge = this.g.edge(e);
      console.log('selected Node', this.id);
      console.log('Connect Node', itm.id);
      if (e.v == this.id) {
        _nodes.push(e.w)
        //if (e.w == itm.id) {
        //  console.log('_____________', e.w)

        //  //alert(`${e.w} : ${itm.id}`);
        //  this.nonSelectedNodes = [];
        //  //val = false;
        //  //return ;

        //}
        //edge.style = outbound_edge_style;
        //edge.arrowhead = "vee";
        //edge.arrowheadStyle = outbound_arrowhead_style;
      } else if (e.w == this.id) {

      }
    });

    for (let i = 0; i <= _nodes.length; i++) {
      let node = _nodes[i]

      this.g.edges().forEach((e, v, w) => {
        var edge = this.g.edge(e);
        if (e.v == node) {
          //alert(e.w)
          console.log('____________________________________')
          _nodes.push(e.w)
          console.log(_nodes);
        }
      });
    }
    console.log(this.nonSelectedNodes);

    _nodes.forEach(x => {
      if (x == itm.id) {
        this.nonSelectedNodes = [];
        // alert(`Not permitted : As  ${this.id} is one of the inputs for ${itm.name}.`);
        this.toastr.info(`Not permitted : As  ${this.id} is one of the inputs for ${itm.name}.`)
        canLink = false;
      }
    });
    //alert(val)
    if (canLink) {

      this.log(eve.currentTarget.checked);
      const src = itm;
      //src.checked = true;
      const conn = {
        trg: this.selectedNode.id,
        src: src
      };

      if (eve.currentTarget.checked) {
        const _trg: any = this.graph_conns.filter(x => {
          if (x.trg == this.selectedNode.id) {
            return x.trg;
          } else {
            return '';
          }
        });

        if (_trg.length == 1) {
          //alert(_trg[0].trg.search('tgt'))

          if (_trg[0].trg.search('Mapper') > -1 ||
            _trg[0].trg.search('Aggr') > -1 || _trg[0].trg.search('Tgt') > -1) {

            this.nonSelectedNodes = [];
            this.showSelections = false;
            if (this.graph_conns.length === 0) {
              this.nonSelectedNodes = this.nodes.filter(x => {
                return x.id !== this.selectedNode.id;
              });
              const nodes = this.nonSelectedNodes.map(x => ({ ...x, checked: false }));
              this.nonSelectedNodes = nodes;
            } else {
              const data = this.graph_conns.filter(x => x.trg === this.selectedNode.id);
              this.nonSelectedNodes = this.nodes.filter(x => {
                return x.id !== this.selectedNode.id;
              });

              const srcs = data.map(x => { return x.src.id })
              this.nonSelectedNodes.map(x => x.checked = false)

              for (let i = 0; srcs.length > i; i++) {
                this.nonSelectedNodes.map(x => {
                  if (x.id === srcs[i]) {
                    x.checked = true;
                  }
                })

              }

            }

            if (_trg[0].trg.search('Tgt') > -1) {
              // alert("Target takes only one input");
              this.toastr.info("Target takes only one input");
              setTimeout(() => {
                this.showSelections = true;
              })

              return;
            }


            if (_trg[0].trg.search('Mapper') > -1) {
              // alert("mapper takes only one input");
              this.toastr.info("Mapper takes only one input");
              setTimeout(() => {
                this.showSelections = true;

              })

              return;
            }


            if (_trg[0].trg.search('Agg') > -1) {
              // alert("Aggregator takes only one input");
              this.toastr.info("Aggregator takes only one input");
              setTimeout(() => {
                this.showSelections = true;
              })

              return;
            }
          }

        }

        this.log('******')
        this.log(src);
        // this.nodes_selection.push( this.nonSelectedNodes );
        this.graph_conns.push(conn);
        setTimeout(() => {
          this.showSelections = true;
        })
      } else {
        this.graph_conns = this.graph_conns.filter(x => !(x.src.id == itm.id && x.trg == this.selectedNode.id));
      }

      this.log(conn);
      this.log(`graph_conns__${this.graph_conns}`);
      //this.combine(this.graph_conns);
      this.resetZoom();
      this.renderGraph(true);
    } else {
      setTimeout(() => {
        this.nonSelectedNodes = dd;
      })
    }
  }

  deleteNode(nodeId = '') {
    this.resetZoom();
    this.showSelections = false;
    this.log(this.selectedNode)

    let id = nodeId;
    if (id != '') {
      const id = nodeId
    } else {
      id = this.selectedNode.id;
    }

    this.nodes = this.nodes.filter(x => x.id !== id);



    //this.renderGraph(true);

    if (this.graph_conns.length > 0) {
      this.graph_conns = this.graph_conns.filter(x => x.trg !== id);
      this.graph_conns = this.graph_conns.filter(x => x.src.id !== id);

      //this.combine(this.graph_conns);
    }

    this.renderGraph(true)


    this.selectedNode.name = '';
    this.selectedNode.id = '';
  }

  log(info) {
    console.log(info)
    console.log('*****______________________________________*****')
    console.info(this.nodes);
    console.info(this.graph_conns);
    console.log('*****______________________________________*****')

  }

  sourceUpdate(eve) {
    this.nodeUpdate(eve);
  }

  mapperUpdate(eve) {
    this.nodeUpdate(eve);
  }

  aggrUpdate(eve) {
    this.nodeUpdate(eve);
  }

  _joiner_src: any;
  _joiner: any;

  joinerUpdate(eve) {
    this.nodeUpdate(eve);
  }

  _target_src: any;
  _target: any;

  targetUpdate(eve) {
    this.nodeUpdate(eve);
  }

  private nodeUpdate(eve: any) {
    this.log(`eve: ${eve}`);
    debugger;
    if (!eve.update) {
      $("#modalDim").modal('hide');
      this.enableModal = false;
    }
    else {
      this.log(eve);
      this.log(this.nodes);
      const data = eve.data;
      //this.selectedNode.name = eve.name;
      this.nodes.filter(x => {
        if (x.id == this.selectedNode.id) {
          x.data = data;
          x.name = data.name;
          this.selectedNode.name = x.name;
          return;
        }
      });
      let src: any = this.graph_conns.filter(x => {
        if (x.trg == this.selectedNode.id) {
          debugger;
          return x.src;
        }
      });
      //this.g.node(this.selectedNode.id).data.data = eve;
      this.resetZoom();
      this.renderGraph(true);
      //this.show_src = false;
      $("#modalDim").modal('hide');
      this.enableModal = false;
      this.log('');
    }

  }

  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };

  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  onStart(event) {
    console.log('started output:', event);
  }

  onStop(event) {
    console.log('stopped output:', event);
  }

  onMoving(event) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(event) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
  }

  addNewJob() {
    this.getLobData();
    this.showJobs = false;
    $("#modalJob").modal({
      show: true, backdrop: 'static',
      keyboard: false
    });
  }

  editJob(){
    this.selected_app_value = this.job.apnId;
    this.selected_lob_value = this.job.lobId;
    this.selected_connection = this.job.connId;
    this.getLobData();
    this.getApplications();
    this.showJobs = false;
    $("#modalJob").modal({
      show: true, backdrop: 'static',
      keyboard: false
    });
  }
  
  saveJob() {
    
    this.job.apnId = this.selected_app_value;
    this.job.lobId = this.selected_lob_value;
    this.job.connId = this.selected_connection;
    let parms:any = this.job;
    parms.orgId = this.org_id;
    parms.usr_id = this.usr_id;
    this.loader.show();
    this.service.post(this.service.saveDimJob, parms).subscribe((res) => {
      if(this.job.id != ''){
        // alert('Job Details Updated Successfully.');
        this.toastr.success('Job Details Updated Successfully.');
      } else {
        // alert('Job Created Successfully.');
        this.toastr.success('Job Created Successfully.');
      }
      console.log(res[0])
      this.job.id = res[0].job_id;
      $("#modalJob").modal('hide');
      this.loader.hide();
    }, err => {
        console.log(err);
        this.loader.hide();
        // alert(' Got Error!!!.Not able to save Job details.');
        this.toastr.success('Got Error!!!.Not able to save Job details.');
    });
  }

  cancelJOb() {
    $("#modalJob").modal('hide');
    //this.showJobs = true;
    if(this.job.id == ''){
      this.router.navigate(['curate/dimBuilder/view/jobs']);
    } 
  }

  backToAlljobs() {
    this.router.navigate(['curate/dimBuilder/view/jobs']);
  }

  apps = [];
  lobs = [];
  connections = [];
  selected_lob_value = '';
  selected_app_value = '';
  selected_connection = '';

  getLobData() {
    this.loader.show();
    this.service.post(this.service.get_lobs, { org_id: this.org_id }).subscribe((data) => {
      this.loader.hide();

      if (data.length !== 0) {
        this.lobs = data;
        console.log(this.lobs)
      } else {
      }

    }, err => {
      this.loader.hide();
    });
  }

  getApplications() {
    this.loader.show();
    this.getConnections();
    this.service.post(this.service.get_applications, { lob_id: this.selected_lob_value }).subscribe((data) => {
      this.loader.hide();
      console.log(data)

      if (data.length !== 0) {
        this.apps = data;

      } else {
      }

    }, err => {
      this.loader.hide();
    });
  }

  getConnections(){
    this.loader.show();
    this.service.post(this.service.dimConnections, { orgId: this.org_id }).subscribe((data) => {
      this.loader.hide();

      if (data.length !== 0) {
        this.connections = data;
        console.log(this.connections)
      } else {
        
      }

    }, err => {
      this.loader.hide();
    });
  }

  saveJobSteps() {
    // alert(this.job.id)
    const parms = {
      jobId: this.job.id,
      usr_id: this.usr_id,
      flow_json: {
        nodes: this.nodes,
        connections: this.graph_conns
      },
    }

    this.loader.show()
    this.service.post(this.service.saveDimJobState, parms).subscribe((res) => {
      this.loader.hide();
      console.log(res)
      // alert('Job Saved Successfully');
      this.toastr.success('Job Saved Successfully');

    }, err => {
      this.loader.hide();
      // alert('Got error while saving data!!!');
      this.toastr.success('Got error while saving data!!!');
    });
  }
}
