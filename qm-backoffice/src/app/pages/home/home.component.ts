import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, ProjectService, ProjectStateService, ContactService } from 'src/app/services/service.index';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { GridModel } from '../../models/grid.model';
import { ProjectStateModel } from '../../models/project-state.model';
import { ProjectSummaryModel } from '../../models/project-summary.model';
import { ContactModel } from '../../models/contact.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userList: Array<UserModel>;
  userCount: number;
  contactList: Array<ContactModel> = [];
  contactCount: number;
  projectList: Array<ProjectModel> = [];
  projectStateList: Array<ProjectStateModel>;
  projectSummary: ProjectSummaryModel;
  projectCount: number;
  rolAdminEnabled: boolean = false;
  rolProjectEnabled: boolean = false;
  rolNurseEnabled: boolean = false;
  rolContactEnabled: boolean = false;
  rolCalendarEnabled: boolean = false;
  rolEnabled: boolean = false;
  user: UserModel;

  constructor(
    private router: Router,
    public userService: UserService,
    public projectService: ProjectService,
    public projectStateService: ProjectStateService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    const userLocal = localStorage.getItem('user');
    this.user = JSON.parse(userLocal);
    this.validateRol(this.user);
    // this.getUserList();
    // this.getProjectList();
    // this.getProjectState();
    // this.getContactList();
  }


  goToProjectGrid(): void {
    this.router.navigate(['/project/grid']);
  }

  goToProjectView($myParam: string = ''): void {
    this.router.navigate(['/project/activity', $myParam]);
  }

  goToProfileGrid(): void {
    this.router.navigate(['/profile/grid']);
  }

  goToUserMenu($myParam: string = ''): void {
    this.router.navigate(['/profile/menu', $myParam]);
  }

  goToContactGrid(): void {
    this.router.navigate(['/contact/grid']);
  }

  goToContactAnnotation($myParam: string = ''): void {
    this.router.navigate(['/contact/annotation', $myParam]);
  }

  getProjectList() {
    const limit = 5;
    const offset = 0;
    let userId = undefined;
    if (!this.rolAdminEnabled) {
      userId = this.user.id
    }

    try {
      this.projectService.getList(limit, offset, '', '', userId,'','').subscribe((resp: GridModel<ProjectModel>) => {
        // @@ TODO: no olvidar manejar cuando venga vacio!
        this.projectCount = resp.paging.total;
        this.projectList = resp.results;
      },
      err => {
        //Mostrar vista de error de carga en el box
        console.log(err);
      });
    } catch {
      console.log('error');
    }
  }

  getProjectState() {
    const limit = 10;
    const offset = 0;

    try {
      this.projectStateService.getList(limit, offset).subscribe((resp: GridModel<ProjectStateModel>) => {
        this.projectStateList = resp.results;
        this.getProjectSummary();
      },
      err => {
        //Mostrar vista de error de carga en el box
        console.log(err);
      });
    } catch {
      console.log('error');
    }
  }

  getProjectSummary() {
    try {
      this.projectService.getSummary().subscribe((resp: ProjectSummaryModel) => {
        this.projectSummary = resp;
      },
      err => {
        //Mostrar vista de error de carga en el box
        console.log(err);
      });
    } catch {
      console.log('error');
    }
  }

  getUserList() {
    const limit = 8;
    const offset = 0;

    try {
      this.userService.getList(limit, offset, '', '', '').subscribe((resp: GridModel<UserModel>) => {
        this.userCount = resp.paging.total;
        this.userList = resp.results;
      },
      err => {
        //Mostrar vista de error de carga en el box
        console.log(err);
      });
    } catch {
      console.log('error');
    }
  }

  getContactList() {
    const limit = 5;
    const offset = 0;

    try {
      this.contactService.getList(limit, offset, '', '', '','', '', '', '', '', '', '').subscribe((resp: GridModel<ContactModel>) => {
        this.contactCount = resp.paging.total;
        this.contactList = resp.results;
      },
      err => {
        //Mostrar vista de error de carga en el box
        console.log(err);
      });
    } catch {
      console.log('error');
    }
  }

  validateRol(user: UserModel) {
    const userRoles = user.user_rol;
    this.rolAdminEnabled = userRoles.some( userRol => userRol.rol.code === 'admin' );
    this.rolProjectEnabled = userRoles.some( userRol => userRol.rol.code === 'project' );
    this.rolNurseEnabled = userRoles.some( userRol => userRol.rol.code === 'nurse' );
    this.rolContactEnabled = userRoles.some( userRol => userRol.rol.code === 'contact' );
    this.rolCalendarEnabled = userRoles.some( userRol => userRol.rol.code === 'calendar' );
  
    if (!this.rolAdminEnabled
      && !this.rolProjectEnabled
      && !this.rolNurseEnabled
      && !this.rolContactEnabled
      && !this.rolCalendarEnabled) {
      this.rolEnabled = true;
    }
  }
}
