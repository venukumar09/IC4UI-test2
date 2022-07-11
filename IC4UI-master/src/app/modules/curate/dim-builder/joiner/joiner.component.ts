import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';
import { ApiService } from '../../../../shared/services/api.service';
@Component({
  selector: 'app-joiner',
  templateUrl: './joiner.component.html',
  styleUrls: ['./joiner.component.scss']
})
export class JoinerComponent implements OnInit {

  selectedMenu = 'config';
  name: string = '';
  @Input() src: any;
  @Input() joiner: any;
  selectedSource: any;
  selected_attr_for_key: any;

  allRightArrow = '>>';
  selectedRigthArrow = '>';
  selectedLeftArrow = '<';
  allLeftArrow = '<<';

  joiner_data = {
    id: '',
    name:'',
    details: '',
    attributes: [],
    filterConditions: [],
    sources: []
  };

  @Output() sourceStatus = new EventEmitter();


  constructor(private service: ApiService) { }

  ngOnInit() {
    debugger
    console.log(this.src);
    console.log(this.joiner);
    this.getExtractConfigData();
    if (this.joiner.data !== undefined) {
      this.joiner_data = this.joiner.data;
      this.targetAttributes = this.joiner_data.attributes;

      this.src = this.src.map(x => ({ ...x, keys: '' }));
      this.src.map(x => x.data.keys = '');

      if (this.joiner_data.sources.length > 0) {
        for (let i = 0; i < this.src.length; i++) {
          const ele = this.src[i];
          this.joiner_data.sources.find(x => {
            if (x.data.id == this.src[i].data.id) {
              this.src[i].data.keys = x.data.keys || '';
              this.src[i].data.join_type = x.data.join_type || '';
            }
          })
        }
        this.joiner_data.sources = [];
        this.joiner_data.sources = [... this.src];
      }
    } else {
      this.src = this.src.map(x => ({ ...x, keys: '' }));

      //for (let i = 0; this.src.length > i; i++) {
      //  this.src[i].data.keys = '';
      //}

      this.src.map(x => x.data.keys = '');
      this.joiner_data.sources = [ ... this.src];
    }

    
  }

  sourceSelection(itm) {
    this.selectedSource = itm;
  }

  submit() {
    //this.mapper_data = this.src.data;
    //const mapperDetails = { mapperData: this.mapper_data, src: this.src.data };
    this.joiner_data.attributes = [];
    this.joiner_data.attributes = this.targetAttributes;
    this.joiner_data.name = this.joiner.name;
    const joinerDetails = this.joiner_data;
    this.sourceStatus.emit({ data: joinerDetails, update: true });
  }

  checkValue(eve, itm) {
    console.log(itm)
    if (eve.currentTarget.checked) {
      this.joiner_data.attributes.push(itm);
    }
    console.log(this.joiner_data)
  }

  cancel() {
    
    this.sourceStatus.emit({ data: [], update: false });
    this.joiner_data = {
      id: '',
      name:'',
      details: '',
      attributes: [],
      filterConditions: [],
      sources: []
    };
    this.src = [];
  }

  //addKeys(index, attr) {
  //  console.log(attr)
  //  let keys = this.src[index].data.keys;
  //  if (keys == undefined) {
  //    keys = '';
  //  }
  //  if (keys == '') {
  //    this.src[index].data.keys = attr.assetName;
  //  } else {
  //    this.src[index].data.keys = `${this.src[index].data.keys},${attr.assetName}`;
  //  }
   
  //  console.log(this.src[index].data)
  //}

  addKeys(index, attr) {
    console.log(attr)
      let keys = this.joiner_data.sources[index].data.keys;
    if (keys == undefined) {
      keys = '';
    }
    if (keys == '') {
      this.joiner_data.sources[index].data.keys = attr.assetName;
    } else {
      this.joiner_data.sources[index].data.keys = `${this.joiner_data.sources[index].data.keys},${attr.assetName}`;
    }

      console.log(this.joiner_data.sources[index].data)
  }

  joinerChange(src, src2,ev,index) {
    console.log(src)
    console.log(src2)
    console.log(ev)

    this.joiner_data.sources[index].data.join_type = ev.target.value;
  }

  selectedObjForFilter: any;
  addFilter(eve) {
    console.log(this.selectedObjForFilter);
    this.joiner_data.filterConditions.push({ name: this.selectedObjForFilter.name, condition: '' });
  }

  deleteFilter(obj) {
    this.joiner_data.filterConditions = this.joiner_data.filterConditions.filter(x => x.name != obj.name);
  }

    //____________________________________ Arrow Key Events Start
  selectedTargetAttr: any = [];
  selectedSourceAttr: any = []; 
  sourceAttributes: any = [];
  targetAttributes: any = [];
  originalSourceAttributes: any = [];


  final_mapper_details: any = [];
  finalTransforamtion: any;

  moveAllToRight() {
    this.selectedTargetAttr = [];
    this.selectedSourceAttr = [];
    if (this.joiner_data.sources.length !== 0) {
      const sources = this.joiner_data.sources;
      for (let i = 0; i < sources.length; i++) {
        const data = sources[i].data.attributes;
        const src_name = sources[i].name
        for (let i = 0; i < data.length; i++) {
        const ele = {
          "id": data[i].id,
          "assetName": data[i].assetName,
          "dataType": data[i].dataType,
          "dataTypeLength": data[i].dataTypeLength,
          "isNull": data[i].isNull,
          "isPK": data[i].isPK,
          "isFK": data[i].isFK,
          "orderNumber": data[i].orderNumber,
          "uniqueId": data[i].id + "_" + +new Date,
          "tfm_rul_txt": `${src_name}.${data[i].assetName}`
        };
        this.targetAttributes.push(ele);
        }
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
          "tfm_rul_txt": `${data[i].obj_name}.${data[i].assetName}`
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

  showTable = false;

  hideViews() {
    this.showTransformBox = false;
    this.showTable = false;
  }


  addTarget() {
    const new_clm = {
      "assetName": "",
      "dataType": "",
      "dataTypeLength": "",
      "isNull": "",
      "isPK": "",
      "isFK": "",
      "obj_prpt_nm": "",
      "tfm_rul_txt": "",
      "uniqueId": Math.random().toString(36).substr(2, 25)
    }


    this.targetAttributes.push(new_clm);
    console.log(this.targetAttributes)
  }

  checkSelTar(itm) {
    const res = this.selectedTargetAttr.find(x => x.uniqueId == itm.uniqueId);
    if (res !== undefined) {
      return 'blue';
    } else {
      // return 'green'
    }
  }

  deleteTargetAttribute(itm, index) {
    this.targetAttributes.splice(index, 1);
  }

  checkSelSrc(itm) {
    const res = this.selectedSourceAttr.find(x => x.id == itm.id);
    if (res !== undefined) {
      return 'blue';
    } else {
      // return 'green'
    }
  }


  // Map Logic Start_________________

  showTransformBox = false;
  searchTextFun: string;
  searchTextPort: string;

  static_default_values: any;
  fileTypes: any;
  compressionTypes: any;
  transferTypes: any;
  controlFileTypes: any;
  dataTypes: {}[];

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
  parentTerms: any = [];

  @ViewChild('extractTree', { static: false }) tree;
  @ViewChild('textArea', { static: false }) textArea: Input;

  datePipe: Date;

  selected_mapper_src: any;
  selected_mapper_trg: any;
  selected_tranformation: any;


  transformation_isDisabled: boolean = false;

  dataSource_Clmns: any;

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

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
    if (text.trim().length === 0) {
      this.tree.treeModel.collapseAll();
    }
  }

  filterPorts() {
    this.datePipe = new Date();
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

  //____________________________________Transform Rules Start
  selected_src_mapper(itm, src) {
    const res = this.selectedSourceAttr.find(x => x.id == itm.id);
    if (res === undefined) {
      itm.obj_name = src.name
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
    this.sourceAttributes = [];
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

    const srcs: any = cloneDeep(this.joiner_data.sources);
    for (let i = 0; i < srcs.length; i++) {
      const src = srcs[i];
      const src_nm = src.name;
      const attr = src.data.attributes;
      for (let j = 0; j < attr.length; j++) {
        console.log(attr[j].assetName);
        attr[j].assetName = `${src_nm}.${attr[j].assetName}`;
        console.log(attr[j].assetName);
        const ele = attr[j];
        console.log(typeof (ele))
      
        this.sourceAttributes.push(ele);
        
      }
      console.log(this.sourceAttributes)
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
    alert()
    console.log(this.selected_mapper_trg);
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


  validateExpression() {
    console.log("validation")
    alert('Functionality notyet implemented');
  }

  //____________________________________Transform Rules End

  // Map logic end__________________________


}
