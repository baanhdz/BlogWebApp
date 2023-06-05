import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { NewsService } from '../../services/news.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  dataReport: any[] = [];
  labels: any[] = [];
  dataChart: any[] = [];


  constructor(protected cdf: ChangeDetectorRef, private newsService: NewsService,) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.newsService.reportByTag().subscribe((res: any) => {
      this.dataReport = res;
      this.labels = [...res.map((item: any) => item.tagName)];
      this.dataChart = [...res.map((item: any) => item.count)];
      this.dataChangeDetection();
    }), (err: any) => {
      console.log(err);
    }
  }

  dataChangeDetection() {
    this.labels = [...this.labels];
    this.dataChart = [...this.dataChart];
    this.cdf.detectChanges();
  }

  // public lineChartData: ChartConfiguration<'line'>['data'] = {
  //   labels: this.labels,
  //   datasets: [
  //     {
  //       data: this.dataChart,
  //       label: 'Số bài viết',
  //       fill: true,
  //       tension: 0.5,
  //       borderColor: 'black',
  //       backgroundColor: 'rgba(255,0,0,0.3)'
  //     }
  //   ]
  // };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true, // Bắt đầu trục y từ số 0
      },
    },
  };
  public lineChartLegend = true;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = this.labels;
  public pieChartDatasets = [{
    data: this.dataChart
  }];
  public lineChartDatasets = [{
    data: this.dataChart,
    label: 'Số bài viết',
    fill: true,
    tension: 0.5,
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)'
  }];

  public pieChartLegend = true;
  public pieChartPlugins = [];
}
