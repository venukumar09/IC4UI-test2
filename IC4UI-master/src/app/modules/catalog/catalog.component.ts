import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  chart = [];
  org_id = this.storage.retrieve('orgid');
  public availdatabases: any;
  // environments = [];
  applications = [];
  connection = {
    lob: '',
    application: '',
  }
  lobnames: any=[];
  constructor(private service: ApiService, private storage: LocalStorageService,private router: Router) { }

  ngOnInit() {

    this.getConnectorTypes();
    this.listlobs();
    // this.getchart();
    
    // this.environments = [{ name: 'LOB_Level' }, { name: 'APP_Level' }];

  }
  getConnectorTypes() {
    var data = {}
    this.service.post(this.service.get_connector_types, data)
      .subscribe(
        res => {
          this.storage.store('databases', res);
        });

  }
  getApplications(){
    const params = {
      lob_id: this.connection.lob
    }
    this.service.post(this.service.get_applications, params).subscribe(res => {
      console.log(res);
      this.applications = res;
    }, (err) => { alert('err'); console.log(err) });
    
  }
  listlobs(){
    var data={
      "org_id":this.org_id
    }
    console.log(data)
    this.service.post(this.service.get_lobs,data).subscribe((res) => {
      console.log(res);
      this.lobnames=res;
    });
    
  }

  getchart() {
    var data = {
        "org_id":this.org_id,
        "lob_id":this.connection.lob,
        "apn_id":this.connection.application
    }
    console.log(data)
    this.service.post(this.service.get_count, data).subscribe((data) => {
          // this.availdatabases = data;
          console.log(data);
          // console.log(data.tcount)
          const t = [data.tcount]
          console.log(t)
          const t1 = [data.ccount]
          const t2 = [data.gcount]
          const t3 = [data.total_asset]
          
          const dataset = [
            {
              label: 'table_count',
              data: t,
              boxWidth: 80,
              backgroundColor: ['#4d97f3'],
              borderColor: 'rgba(0,0,255,0.4)',
              fill: false,
            },
            {
              label: 'column_count',
              data: t1,
              backgroundColor: '#9fcef4',
              borderColor: 'rgba(0,0,255,0.4)',
              fill: false,
            },
            {
              label: 'grocery_count',
              data: t2,
              backgroundColor: '#75f0ae',
              borderColor: 'rgba(0,0,255,0.4)',
              fill: false,
            },
            {
              label: 'Total_assets',
              data: t3,
              backgroundColor: '#f5f5f5',
              borderColor: 'rgba(0,0,255,0.4)',
              fill: false
            },
          ];

          console.log(dataset)
          this.chart = new Chart('bar', {
            type: 'bar',
            data: {
              // labels: ['table_count', 'column_count', 'grocery_count', 'Total_assets'],
              datasets: dataset,

            },
            options: {

              legend: {
                horizontalAlign: "right",
                // labels: ['table_count', 'column_count', 'grocery_count', 'Total_assets'],
                position: 'right',
                display: true
              },
              tooltips: {
                enabled: true
              },

              scales: {
                xAxes: [{
                  barPercentage: 0.5,
                  ticks: {
                    display: false,
                  }
                }],
                yAxes: [{
                  barPercentage: 0.5,
                  ticks: {
                    display: true,
                    min: 0,
                    max: 100,
                    stepSize: 25
                  }
                }]
              }
            }
          })


          // const dataset1 = [
          //   {

          //     // label: 'first data',
          //     data: [t,t1,t2,t3],
          //     backgroundColor: '#4d97f3',
          //     borderColor: 'rgba(0,0,255,0.4)',
          //     fill: false
          //   },
          //   {
          //     // label: 'second data',
          //     data: [t3,t2,t1,t],
          //     backgroundColor: '#bdf3d9',
          //     borderColor: 'rgba(255,0,255,0.4)',
          //     fill: false
          //   }

          // ];
          // new Chart('line', {
          //   type: 'line',
          //   data: {
          //     // labels: ['table_count', 'column_count'],
          //     datasets: dataset1
          //   },
          //   options: {
          //     legend: {
          //       display: false
          //     },
          //     tooltips: {
          //       enabled: false
          //     },
          //     scales: {
          //       xAxes: [{
          //         barPercentage: 0.4,
          //         ticks: {
          //           display: false
          //         }
          //       }],
          //       yAxes: [{
          //         ticks: {
          //           display: false
          //         }
          //       }]
          //     }
          //   }
          // })
          // new Chart('doughnut', {
          //   type: 'doughnut',
          //   data: {
          //     // labels: ['a', 'b', 'c', 'd', 'e'],
          //     datasets: [
          //       {
          //         label: 'first data',
          //         data: [18, 32],
          //         backgroundColor: ['#169ddd', 'white'],
          //         borderColor: '#e6e7e8',
          //         fill: true
          //       }
          //     ]
          //   },
          //   options: {
          //     responsive: true,
          //     title: {
          //       display: false,
          //     },
          //     centerText: {
          //       text: "280"
          //     },
          //     legend: {
          //       position: 'top',
          //     }, animation: {
          //       animateScale: true,
          //       animateRotate: true
          //     },
          //   },

          // })
          // new Chart('pie', {
          //   type: 'pie',
          //   options: {
          //     responsive: true,
          //     title: {
          //       display: true,
          //       // text: 'Doughnut chart'
          //     },
          //     legend: {
          //       position: 'top',
          //     }, animation: {
          //       animateScale: true,
          //       animateRotate: true
          //     }
          //   },
          //   data: {
          //     // labels: ['a', 'b', 'c', 'd', 'e'],
          //     datasets: [
          //       {
          //         label: 'first data',
          //         data: [18, 32, 64, 45, 75],
          //         backgroundColor: ['rgba(255,0,255,0.4)', 'rgba(0,0.4,255,0.4)', 'rgba(255,0,255,0.4)', 'red', 'green'],
          //         borderColor: 'rgba(255,0,255,0.4)',
          //         fill: true
          //       }
          //     ]
          //   }
          // })
        });



  }

}

