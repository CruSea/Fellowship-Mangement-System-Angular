import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { StorageService } from '../services/storage.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    datas: any[];
    loading: boolean;
    count: number;
    under_graduate_count: number;
    this_year_graduates_count: number;
    post_gradutes_number: number;
    number_of_teams: number;
    number_of_events: number;
    total_successful_messages: number;
    last_month_messages: number;
    today_successful_messages: number;
    notify_today_messages: any;
    teams: any;
    events: any;
    sms_registered_members: any;
    per_page: number;
    page: number;
    total: number;
    // p: number = 1;

  constructor(
      private userProfileService: UserProfileService,
      private storageService: StorageService,
  ) { this.page = 1}
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      this.getUnderGradutesList();
      this.getThisYearGraduatesNumber();
      this.getPostGraduatesNumber();
      this.getNumberOfTeams();
      this.getNumberOfEvents();
      this.getEventsList();
      this.getTodaySuccessfulMessages();
      this.getLastMonthSuccessfulMessage();
      this.getTotalSuccessfulMessage();
      this.getTodayMessages();
      this.getTeams();
      this.getEvents();
      this.getSmsRegisteredMembers(this.page);
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

    getUnderGradutesList() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/under_graduates_number')
            .subscribe((res: any) => {
                this.under_graduate_count = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getThisYearGraduatesNumber() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/this_year_graduates_number')
            .subscribe((res: any) => {
                this.this_year_graduates_count = res.message;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getPostGraduatesNumber() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/post_graduates_number')
            .subscribe((res: any) => {
                this.post_gradutes_number = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getNumberOfTeams() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/number_of_teams')
            .subscribe((res: any) => {
                this.number_of_teams = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getNumberOfEvents() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/number_of_events')
            .subscribe((res: any) => {
                this.number_of_events = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    getEventsList() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/events_list')
            .subscribe((res: any) => {
                this.loading = false;
                this.datas = res.count;
                this.count = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
    getTodaySuccessfulMessages() {
      this.loading = true;
      const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      return this.userProfileService.gets(headers, '/today_messages')
            .subscribe((res: any) => {
                this.loading = false;
                this.today_successful_messages = res.count;
                this.count = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
    getLastMonthSuccessfulMessage() {
      this.loading = true;
      const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      return this.userProfileService.gets(headers, '/last_month_messages')
            .subscribe((res: any) => {
                this.loading = false;
                this.last_month_messages = res.count;
                this.count = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
    getTotalSuccessfulMessage() {
      this.loading = true;
      const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);

      return this.userProfileService.gets(headers, '/total_messages')
            .subscribe((res: any) => {
                this.loading = false;
                this.total_successful_messages = res.count;
                this.count = res.count;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

     getTodayMessages() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/notify_today_messages')
            .subscribe((res: any) => {
                this.loading = false;
                // this.notify_today_messages = new MatTableDataSource(res.scheduled_messages.data);
                this.notify_today_messages = res.today_messages;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
    getTeams() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/get_teams')
            .subscribe((res: any) => {
                this.loading = false;
                // this.notify_today_messages = new MatTableDataSource(res.scheduled_messages.data);
                this.teams = res.teams;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
    getEvents() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/get_events')
            .subscribe((res: any) => {
                this.loading = false;
                // this.notify_today_messages = new MatTableDataSource(res.scheduled_messages.data);
                this.events = res.events;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }
    getSmsRegisteredMembers(e) {
      this.loading = true;
      if(e) {
        this.page = e;
      }
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/sms_registered_members?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.notify_today_messages = new MatTableDataSource(res.scheduled_messages.data);
                this.sms_registered_members = res.registered_members.data;
                this.per_page = res.registered_members.per_page;
                this.total = res.registered_members.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

}
