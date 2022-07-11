import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ApiService } from '../../../../shared/services/api.service';


@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.scss']
})
export class MapperComponent implements OnInit {

  name: string = '';
  @Input() src: any;
  @Input() mapper: any;

  mapper_data = {
    name: '',
    id: '',
    details: '',
    attributes: [],
    filterCondition: '',
    output: '',
    source: {}
  };

  @Output() sourceStatus = new EventEmitter();


  mapperName = '';
  @Output() finalRsltPrnt = new EventEmitter();
  @Input() processIndex;
  @Input() jobName: any;
  @ViewChild('extractTree', { static: false }) tree;
  @ViewChild('textArea', { static: false }) textArea: Input;

  searchedObj = '';
  objList = [];
  searchText: any;
  userId: any;
  isLoading: boolean;
  showSuggestions: boolean;
  suggestions: any;
  roleId: any;
  orgId: any;
  source_id: any;
  source_nm: any;
  keys = [];
  inputFilterCon = '';
  output = '';


  displayedColumns: string[] = ['Name', 'DataType', 'Is Null', 'IsPK', 'IsFK', 'Transform Rule'];
  dataSource_Clmns: any;

  allRightArrow = '>>';
  selectedRigthArrow = '>';
  selectedLeftArrow = '<';
  allLeftArrow = '<<';

  selected_mapper_src: any;
  selected_mapper_trg: any;
  selected_tranformation: any;

  final_mapper_details: any = [];
  finalTransforamtion: any;

  showTransformBox = false;

  originalSourceAttributes: any = [];
  sourceAttributes: any = [];
  // sourceAttrribues:any = [];
  selectedSourceAttr: any = [];
  targetAttributes: any = [];
  selectedTargetAttr: any = [];
  sourceDetails: any = [];
  defaultValues: any = [];
  targetAuditClmns: any = [];

 
  tar = {
    host: '',
    userId: '',
    folderName: '',
    fileName: '',
    fileType: '',
    delimiter: '',
    compressionType: '',
    transferType: '',
    controlFileNeeded: '',
    scheduleCalender: '',
    description: '',
    is_public: 'N',
    org_id: ''
  }

  transformation_isDisabled: boolean = false;
  showTable: boolean = false;

  finalSource_attributes = [];
  uniqueScheduleNames: any[];
  scheduleNames: any[];
  allScheduleNames: any;
  uniqueCalenderNames: any[];
  calenderNames: any[];
  allCalenderNames: any[];

  finalDetails: any = {};
  MathematicalFunctions: { operator: string; ope: string, desc: string; }[];
  DateFunctions: { operator: string; ope: string, desc: string; }[];
  LogicalOperators: { operator: string; ope: string, desc: string; }[];
  ArithmeticOperators: { operator: string; ope: string, desc: string; }[];
  RelationalOperators: ({ operator: string; ope: string, desc: string; } | { operator: string; desc?: undefined; })[];
  TypeConversionFunctions: { operator: string; ope: string, desc: string; }[];
  StringOperators: { operator: string; ope: string, desc: string; }[];
  OperatorsPrecedence: { operator: string; ope: string, desc: string; }[];
  StringFunctions: { operator: string; ope: string, desc: string; }[];


  treeRoot = -1;
  treeData = [];
  subCategoryTerms: any = [];
  categoryTerms: any = [];
  parentTerms: any = [];
  dataTypes: {}[];
  jobTemplates: any[];
  selectedProcess: any[];
  range: any;
  modelflag: any;

  fileTypes: any;
  compressionTypes: any;
  transferTypes: any;
  controlFileTypes: any;
  hosts: any;
  scheduleCalenders: any[];
  alljobTemplates: any;

  overideProcessParmText = {}
  filterScheduleNames: any = [];
  datePipe: Date;
  static_default_values: any;
  searchTextFun: string;
  searchTextPort: string;

  constructor(private service: ApiService) { }

  ngOnInit() {
    console.log('************************')
    console.log(this.src)
    console.log(this.mapper);
    if (this.src.data != undefined) {
      this.src.data.attributes.map(x => ({ ...x, checked: false }));
    }
    
    if (this.mapper.data !== undefined) {
      const data = this.mapper.data ;
      this.mapper_data = data;
     // this.targetAttributes = data.attributes;
      //if (data.attributes == []) {
      //  this.targetAttributes = [];

      //} else {
        this.targetAttributes =data.attributes;
     // }
    }

    this.userId = '';
    this.roleId = '';
    this.orgId = '';
    this.getExtractConfigData();

    this.sourceAttributes = this.src.data.attributes;
    this.originalSourceAttributes = this.src.data.attributes;
    this.finalSource_attributes = this.src.data.attributes;
  }

  submit() {
    //this.mapper_data = this.src.data;
    //const mapperDetails = { mapperData: this.mapper_data, src: this.src.data };
    this.mapper_data.attributes = [];
    this.mapper_data.attributes = this.targetAttributes;
    this.mapper_data.name = this.mapper.name;
    this.mapper_data.source = this.src;
    const mapperDetails = this.mapper_data;
    this.mapper_data.id = this.mapper.id;
    this.sourceStatus.emit({ data: mapperDetails , update:true});
  }

  checkValue(eve, itm) {
    if (eve.currentTarget.checked) {
      this.mapper_data.attributes.push(itm);
    }
  }

  cancel() {
    
    this.sourceStatus.emit({ data: [], update: false });
    this.mapper_data = {
      name: '',
      id: '',
      details: '',
      attributes: [],
      filterCondition: '',
      output: '',
      source: {}
    };
    this.targetAttributes = [];
 
  }

  //____________new

  addTarget() {
    const id = Math.random().toString(36).substr(2, 25);
    const new_clm = {
      "assetName": "",
      "dataType": "",
      "dataTypeLength": "",
      "isNull": "",
      "isPK": "",
      "isFK": "",
      "obj_prpt_nm": "",
      "tfm_rul_txt": "",
      "uniqueId": id,
      "id": id
    }


    this.targetAttributes.push(new_clm);
    console.log(this.targetAttributes)
  }

  validateMapping() {
    console.log(this.jobName)
  }

 
  validateExpression() {
    console.log("validation")
    console.log(this.jobName)
  }

  onSrcKeyChange(eve: any, itm) {
    console.log(eve);
    console.log(itm)

    if (eve) {
      this.keys = this.keys.find(x => x == itm.assetName);
      this.keys.push(itm.assetName);
    }

    console.log(this.keys)
  }

  deleteTargetAttribute(itm, index) {
    this.targetAttributes.splice(index, 1);
  }

 

  selectedSrcAttrToAddDq() {

  }


  getExtractConfigData() {
    const parms = {

    }
    this.service.post(this.service.extract_config_data_ep, parms).subscribe(res => {
      const data = res;
      this.static_default_values = res;
      this.fileTypes = data.fileTypes;
      this.compressionTypes = data.compressionTypes;
      this.transferTypes = data.transferTypes;
      this.controlFileTypes = data.controlFileTypes;
      this.scheduleCalenders = data.scheduleCalenders;

      this.dataTypes = data.dataTypes;

      const functions = data.hive_functions;

      this.MathematicalFunctions = functions.MathematicalFunctions;
      this.DateFunctions = functions.DateFunctions;
      this.StringFunctions = functions.StringFunctions;
      this.OperatorsPrecedence = functions.OperatorsPrecedence;
      this.StringOperators = functions.StringOperators;
      this.TypeConversionFunctions = functions.TypeConversionFunctions;
      this.RelationalOperators = functions.RelationalOperators;
      this.ArithmeticOperators = functions.ArithmeticOperators;
      this.LogicalOperators = functions.LogicalOperators;

      this.structureDataForTree();
      //this.loadInitialTargetValues();
      //this.getScheduleNames();
      //this.getCalenderNames();
      //this.getJobTemplates();


    }, err => {
      //this.toaster.showerror('Error Getting Data.Please Try Again.');
    })
  }



  structureDataForTree() {
    this.parentTerms.push({
      id: this.treeRoot, name: 'Hive Functions',
      parent: 0, 'btid': 0, actualname: 'Hive Functions', type: 'root'
    });

    const operatorsPrecedence = this.constructTreeObjs(this.OperatorsPrecedence, 'opr');
    const relationalOperators = this.constructTreeObjs(this.RelationalOperators, 'rel');
    const arithmeticOperators = this.constructTreeObjs(this.ArithmeticOperators, 'ari');
    const logicalOperators = this.constructTreeObjs(this.LogicalOperators, 'log');
    const stringOperators = this.constructTreeObjs(this.StringOperators, 'strOp');
    const mathematicalFunctions = this.constructTreeObjs(this.MathematicalFunctions, 'mat');
    const typeConversionFunctions = this.constructTreeObjs(this.TypeConversionFunctions, 'typ');
    const dateFunctions = this.constructTreeObjs(this.DateFunctions, 'dt');
    // const conditionalFunctions = this.constructTreeObjs(this.com);
    const stringFunctions = this.constructTreeObjs(this.StringFunctions, 'strFun');

    setTimeout(() => {
      // this.treeData = models;
      this.treeData = [{
        id: 1,
        name: 'Operators Precedence',
        children: operatorsPrecedence,

      }, {
        id: 2,
        name: 'Relational Operators',
        children: relationalOperators
      }, {
        id: 3,
        name: 'Arithmetic Operators',
        children: arithmeticOperators
      }, {
        id: 4,
        name: 'Logical Operators',
        children: logicalOperators
      }, {
        id: 5,
        name: 'String Operators',
        children: stringOperators
      }, {
        id: 6,
        name: 'Mathematical Functions',
        children: mathematicalFunctions
      }, {
        id: 7,
        name: 'Type Conversion Functions',
        children: typeConversionFunctions
      }, {
        id: 8,
        name: 'Date Functions',
        children: dateFunctions
      }, {
        id: 10,
        name: 'String Functions',
        children: stringFunctions,
        isExpanded: false
      }]
    }, 20);

    // {
    //   id: 9,
    //   name: 'Conditional Functions',
    //   children: math
    // },

  }


  constructTreeObjs(items, type) {
    const data = [];
    for (let i = 0; i < items.length; i++) {
      const ele = items[i];
      data.push({
        'id': type + i,
        'name': ele.operator,
        'operator': ele.operator,
        'parent': this.treeRoot,
        'desc': ele.desc,
        'ope': ele.ope
      })
    }
    return data;
  }

  // Selected Node Details on Click event
  treeEvent(e: any, type: string) {
    // this.selected_tranformation = e.node.data;
    const data = e.node.data;
    if (data.children) {
      const selectedNode = this.tree.treeModel.getNodeById(data.id);
      if (data.isExpanded) {
        e.node.data.isExpanded = !data.isExpanded;
        selectedNode.collapse();
      } else {
        e.node.data.isExpanded = !data.isExpanded;
        selectedNode.expand();
      }
      return;
    } else {
      this.selected_tranformation_mapper(data, type);
    }
  }
   
  // Filter Nodes (Hive Functions)
  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
    if (text.trim().length === 0) {
      this.tree.treeModel.collapseAll();
    }
  }

  filterPorts() {
    this.datePipe = new Date();
  }

  checkSelSrc(itm) {
    const res = this.selectedSourceAttr.find(x => x.id == itm.id);
    if (res !== undefined) {
      return 'blue';
    } else {
      // return 'green'
    }
  }

  checkSelTar(itm) {
    const res = this.selectedTargetAttr.find(x => x.uniqueId == itm.uniqueId);
    if (res !== undefined) {
      return 'blue';
    } else {
      // return 'green'
    }
  }

  //____________________________________Transform Rules Start
  selected_src_mapper(itm) {
    const res = this.selectedSourceAttr.find(x => x.id == itm.id);
    if (res === undefined) {
      this.selectedSourceAttr.push(itm);
      this.selected_mapper_src = itm;
    } else {
      this.selectedSourceAttr = this.selectedSourceAttr.filter(x => x.id !== itm.id);
    }
  }

  selected_trg_mapper(itm) {
    this.selected_tranformation = "-1";
    this.finalTransforamtion = itm.tfm_rul_txt;
    itm.obj_prpt_nm = itm.assetName;
    this.selected_mapper_trg = {};
    this.selected_mapper_trg = itm;
    if (this.selected_mapper_trg.dataType !== null && this.selected_mapper_trg.dataType !== undefined) {
      this.selected_mapper_trg.dataType = this.selected_mapper_trg.dataType.toLowerCase();
    }

    this.showTable = false;

    const res = this.selectedTargetAttr.find(x => x.uniqueId == itm.uniqueId);
    if (res === undefined) {
      this.selectedTargetAttr.push(itm);
      this.selected_mapper_src = itm;
    } else {
      this.selectedTargetAttr = this.selectedTargetAttr.filter(x => x.uniqueId !== itm.uniqueId);
    }

    // this.showTransformBox = true;
  }

  selected_trg_mapper_edit(itm) {
    this.selected_tranformation = "-1";
    this.searchTextFun = '';
    this.searchTextPort = '';
    this.finalTransforamtion = itm.tfm_rul_txt;

    //if (this.targetAttributes.length > 0) {
    //  const res = this.targetAttributes.filter(x => x.uniqueId === itm.uniqueId);
    //  if (res.length > 0) {
    //    this.finalTransforamtion = res[0].tfm_rul_txt;
    //  }
    //}

    itm.obj_prpt_nm = itm.assetName
    this.selected_mapper_trg = {
    };
    this.selected_mapper_trg = itm;
    if (this.selected_mapper_trg.dataType !== null && this.selected_mapper_trg.dataType !== undefined) {
      this.selected_mapper_trg.dataType = this.selected_mapper_trg.dataType.toLowerCase();
    }

    this.showTable = false;
    this.showTransformBox = true;
  }

  selected_tranformation_mapper(itm, type) {
    if (type === 'active') {
      this.selected_tranformation = '';
      this.selected_tranformation = itm;
      if (this.selected_tranformation !== "-1") {
        let value = '';
        if (this.finalTransforamtion === undefined || this.finalTransforamtion === '') {
          value = `${this.selected_tranformation.ope}`;
        } else {
          // value = this.finalTransforamtion + ' + ' + `${this.selected_tranformation.operator}`;
          // value = this.finalTransforamtion + ' + ' + `${this.selected_tranformation.ope}`;

          const input: any = this.textArea;
          const start = input.nativeElement.selectionStart
          const end = input.nativeElement.selectionEnd
          const text = input.nativeElement.value
          const before = text.substring(0, start)
          const after = text.substring(end, text.length)
          value = input.nativeElement.value = (before + this.selected_tranformation.ope + after)
          input.nativeElement.selectionStart = input.nativeElement.selectionEnd = start + this.selected_tranformation.ope.length
          input.nativeElement.focus()
        }
        this.finalTransforamtion = value;
        this.transformation_isDisabled = true;
      } else {
        this.finalTransforamtion = this.selected_mapper_trg.assetName;
        this.transformation_isDisabled = false;
      }

      // reset tree
      this.searchTextFun = '';
      this.filterNodes(this.searchTextFun, this.tree);
    }

  }

  selected_port(itm) {
    this.finalTransforamtion = this.finalTransforamtion + " " + itm.assetName;

    const newText = itm.assetName;
    const input: any = this.textArea;
    const start = input.nativeElement.selectionStart
    const end = input.nativeElement.selectionEnd
    const text = input.nativeElement.value
    const before = text.substring(0, start)
    const after = text.substring(end, text.length)
    this.finalTransforamtion = input.nativeElement.value = (before + newText + after)
    input.nativeElement.selectionStart = input.nativeElement.selectionEnd = start + newText.length
    input.nativeElement.focus()

  }

  edit_tar_mapper(itm) {

  }

  delete_tar_mapper(itm) {
    this.targetAttributes = this.targetAttributes.filter(x => x.uniqueId !== itm.uniqueId);
  }

  saveTransformation() {
    //if (this.finalTransforamtion === '' || this.finalTransforamtion === undefined) {
    //  this.finalTransforamtion = this.selected_mapper_trg.assetName;
    //}

    const data = this.targetAttributes.filter(x => x.uniqueId === this.selected_mapper_trg.uniqueId);

    for (let i = 0; i < this.targetAttributes.length; i++) {
      const ele = this.targetAttributes[i];

      if (ele.uniqueId === this.selected_mapper_trg.uniqueId) {
        this.targetAttributes[i].assetName = this.selected_mapper_trg.assetName;
        this.targetAttributes[i].dataType = this.selected_mapper_trg.dataType;
        this.targetAttributes[i].dataTypeLength = this.selected_mapper_trg.dataTypeLength;
        this.targetAttributes[i].isNull = this.selected_mapper_trg.isNull;
        this.targetAttributes[i].isPK = this.selected_mapper_trg.isPK;
        this.targetAttributes[i].isFK = this.selected_mapper_trg.isFK;
        this.targetAttributes[i].tfm_rul_txt = this.finalTransforamtion;
      }

    }

    this.closeBox();
  }

  clearTransformation() {
    this.selected_tranformation = "-1";
    this.finalTransforamtion = this.selected_mapper_trg.assetName;
    this.transformation_isDisabled = false;
  }

  loadFianlTarAttr() {

    this.final_mapper_details = [];
    for (let i = 0; i < this.targetAttributes.length; i++) {
      const ele = this.targetAttributes[i];
      let final = {
        id: ele.id,
        obj_prpt_nm: ele.assetName,
        obj_prpt_dat_type: ele.dataType,
        obj_prpt_len: ele.dataTypeLength,
        is_nlbl_flg: ele.isNull,
        is_prmy_key_flg: ele.isPK,
        is_frgn_key_flg: ele.isFK,
        tfm_rul_txt: ele.tfm_rul_txt === undefined ? ele.assetName : ele.tfm_rul_txt,
        uniqueId: ele.uniqueId
      };
      this.final_mapper_details.push(final);
    }

    // check for duplicate attribute names
    let seenDuplicate = false,
      testObject = {};
    var itemPropertyName = '';
    this.final_mapper_details.map((item) => {
      itemPropertyName = item['obj_prpt_nm'];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
        //this.toaster.showwarning("Duplicate Target Attributes Names Found ( " + itemPropertyName + " ).")
        return;
      }
      else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    if (!seenDuplicate) {
      this.dataSource_Clmns = this.final_mapper_details;
      this.closeBox();
      this.showTable = true;
    }

  }

  closeBox() {
    this.showTransformBox = false;
    this.selected_tranformation = "-1";
    this.transformation_isDisabled = false;
    this.finalTransforamtion = '';
    this.selected_mapper_trg = [];
  }
  //____________________________________Transform Rules End


  //____________________________________ Arrow Key Events Start

  moveAllToRight() {
    this.selectedTargetAttr = [];
    this.selectedSourceAttr = [];
    if (this.sourceAttributes.length !== 0) {
      const data = this.sourceAttributes;
      for (let i = 0; i < data.length; i++) {
        const ele =
        {
          "id": data[i].id,
          "assetName": data[i].assetName,
          "dataType": data[i].dataType,
          "dataTypeLength": data[i].dataTypeLength,
          "isNull": data[i].isNull,
          "isPK": data[i].isPK,
          "isFK": data[i].isFK,
          "orderNumber": data[i].orderNumber,
          "uniqueId": data[i].id + "_" + +new Date,
          "tfm_rul_txt": data[i].assetName
        };
        this.targetAttributes.push(ele);
      }
    }
    // this.sourceAttributes = [];
    this.final_mapper_details = [];
    this.sortingAttr();
  }

  moveSelectedLeftToRight() {
    if (this.selectedSourceAttr.length !== 0) {
      const data = this.selectedSourceAttr;
      for (let i = 0; i < data.length; i++) {
        const ele =
        {
          "id": data[i].id,
          "assetName": data[i].assetName,
          "dataType": data[i].dataType,
          "dataTypeLength": data[i].dataTypeLength,
          "isNull": data[i].isNull,
          "isPK": data[i].isPK,
          "isFK": data[i].isFK,
          "orderNumber": data[i].orderNumber,
          "uniqueId": data[i].id + "_" + +new Date,
          "tfm_rul_txt": data[i].assetName
        };
        this.targetAttributes.push(ele);
        // this.sourceAttributes = this.sourceAttributes.filter(x => x.id != ele.id);
      }
      this.selectedSourceAttr = [];
      this.sortingAttr();
    }

  }

  sortingAttr() {
    this.targetAttributes = this.targetAttributes.sort((x, y) => x.orderNumber - y.orderNumber);
    this.sourceAttributes = this.sourceAttributes.sort((x, y) => x.orderNumber - y.orderNumber);
    this.hideViews();
  }

  moveAllToLeft() {
    this.selectedTargetAttr = [];
    this.selectedSourceAttr = [];
    this.targetAttributes = [];
    this.sourceAttributes = this.originalSourceAttributes;
    this.final_mapper_details = [];
    this.sortingAttr();
  }

  moveSelectedRightToLeft() {
    if (this.selectedTargetAttr.length !== 0) {
      const data = this.selectedTargetAttr;
      for (let i = 0; i < data.length; i++) {
        const ele = data[i];
        // this.sourceAttributes.push(ele);
        this.targetAttributes = this.targetAttributes.filter(x => x.uniqueId != ele.uniqueId);
      }
      this.selectedTargetAttr = [];
      this.sortingAttr();
    }
  }

  //____________________________________ Arrow Key Events End

  hideViews() {
    this.showTransformBox = false;
    this.showTable = false;
  }

  save() {

    const valid = this.checkData();

    if (valid) {
      let result = {
        mapperName: this.mapperName,
        obj_id: this.source_id,
        obj_nm: this.source_nm,
        transforms: this.targetAttributes,
        inputFilterCondition: this.inputFilterCon,
        output: this.output
      }
      console.log(result)
      this.jobName.process[this.processIndex].componentDetails = result;
      console.log(this.jobName)
      this.finalRsltPrnt.emit(this.jobName);

    }

  }

  checkData() {

    if (this.mapperName == '') {
      //this.toaster.showerror('Provide Mapper Name');
    } else if (this.inputFilterCon == '') {
      //this.toaster.showerror('Provide Filter Condition.');
    } else {
      return true;
    }

    return false;
  }
}
