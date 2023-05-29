import { Component, OnInit } from "@angular/core";
import { UserModel } from 'src/app/models/user.model';
import { SocketAlertService, UserService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { SocketRespModel } from 'src/app/models/socket-resp.model';
import { AlertService } from '../../services/common/alert.service';
import { AlertModel } from '../../models/alert.model';
import { GridModelAlert } from '../../models/grid.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

export class HeaderComponent implements OnInit {

  user: UserModel;
  listAlerts: Array<AlertModel> = [];
  alertCount: number = 0;

  constructor(
    public userService: UserService,
    private router: Router,
    private socketAlertService: SocketAlertService,
    private alertService: AlertService
    ) {
  }

  ngOnInit() {
    const  userLocal = localStorage.getItem('user');
    if (!userLocal) {
      this.userService.logout();
    }
    try {
      const _user = JSON.parse(userLocal);
      if (!_user) {
        this.userService.logout();
      } 
      this.getAlertList(_user.id);
      this.userService.getUser(_user.id).subscribe((userData: UserModel) => {
        this.user = userData;
        const userId = this.user.id;
        // this.socketAlertService.getAlertCommentary().subscribe((resp: SocketRespModel) => {
        //   const userIdList = resp.recipients;
        //   let showAlert = userIdList.find(id => id === userId);
        //   if (showAlert) {
        //     this.getAlertList(userId);
        //   }
        // });
        let userAdmin = this.user.user_rol.find(item => item.rol.code === 'admin');
        if (userAdmin) {
          // this.socketAlertService.getAlertProjectFinish().subscribe((resp: SocketAlertService) => {
          //   this.getAlertList(userId);
          // });
        }
      });
    } catch{
      this.userService.logout();
    }
  }

  getAlertList(userId: number) {
    const limit = 4;
    const offset = 0;
    try {
      this.alertService
        .getList(limit, offset, userId, null)
        .subscribe(
          (resp: GridModelAlert<AlertModel>) => {
            if (resp) {
              let listAlerts = resp.results;
              if (listAlerts.length) {
                this.alertCount = resp.paging.unread;
                listAlerts = listAlerts.map(item => {
                  if (item.event === 'project_finish') {
                    item.user_emit = {
                      id: undefined,
                      email: null,
                      picture: 'assets/img/petition.png'
                    };
                  }
                  return item;
                });
                this.listAlerts = listAlerts;
              }
              return;
            }
          },
          (err) => {
            console.log('error');
          }
        );
    } catch {
      console.log('error');
    }
  }
  
  goHandleAlert(alert: AlertModel) {
    switch (alert.event) {
      case 'project_finish':
        this.goToProjectView(alert, false);
        break;
      case 'commentary':
        this.goToProjectView(alert, true);
        break;
      default:
        break;
    }
  }

  goToProjectView(event: AlertModel, openActivity: boolean) {
    let projectId = undefined;
    let activityId = undefined;
    let urlParams = [];
    if (openActivity) {
      projectId = event.parent_entity_id;
      activityId = event.entity_id;
      urlParams = ['/project/activity', projectId, { activityId: activityId }];
    } else {
      projectId = event.entity_id;
      urlParams = ['/project/activity', projectId];
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(urlParams);
    });
  }

  updateAlert(alert: AlertModel) {    
    if (alert.read) {
      this.goHandleAlert(alert);
      return;
    }

    let data = {
      read: true
    }

    try {
      this.alertService.update(alert.id, data).subscribe(
          (resp: AlertModel) => {
            if (resp) {
              let listAlerts = this.listAlerts; 
              this.listAlerts = listAlerts.map(item => {
                if (item.id === resp.id) {
                  item.read = resp.read;
                }
                return item;
              });
              this.alertCount = listAlerts.filter(value => value.read == false).length;
              this.goHandleAlert(resp);
              return;
            }
          },
          (err) => {
            console.log('error');
          }
        );
    } catch {
      console.log('error');
    }
  }

  goToProfileMenu($myParam: string = ''): void {
    //console.log(this.user);
    this.router.navigate(['/profile/menu']);
  }
}
