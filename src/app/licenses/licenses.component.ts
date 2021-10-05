import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { License } from '../models/license.model';
import { User } from '../models/user.model';
import { DialogService } from '../service/dialog.service';
import { LicenseService } from '../service/license.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  licenseNumber: number;
  licenseMaxNumber: number;
  dataTable: License[] | undefined;
  dataSource: any;
  displayedColumns: string[] = ['id', 'app', 'createTime', 'expire', 'nanogrid', 'uuid', 'owner', 'operation'];
  filter = { name: '' };

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private storage: StorageService,
    private dialog: DialogService,
    private licenseService: LicenseService
  ) {
    this.licenseNumber = 0;
    this.licenseMaxNumber = 10;
    this.sort = new MatSort();
    //this.paginator = new MatPaginator();
  }

  ngOnInit(): void {
    console.info('LicensesComponent ngOnInit');

    const user = this.storage.getUser();
    if (user == null) {
      this.router.navigate(['/login', 1]);
    } else {
      console.info('user token: ' + user.token)
    }
    this.init();
  }

  init() {
    this.licenseService.query().subscribe((licenses: Array<License>) => {
      this.dataTable = licenses;//this.jsogService.deserialize(res);
      //this.dataTable = _.sortBy(this.dataTable, (item) => {
      //  return -item.id;
      //});
      this.dataSource = new MatTableDataSource(this.dataTable);
      this.dataSource.sort = this.sort;
      //this.paginator.pageSize = 10;
      //this.paginator.pageSizeOptions = [10, 25, 50];
      //this.dataSource.paginator.pageSize = 10;
      //this.dataSource.paginator.pageSizeOptions = [10, 25, 50];
      this.licenseNumber = this.dataTable.length;
    });
  }


  searchFileName(value: string) {
    this.dataSource.data = this.dataTable!.filter(
      (d: any) => d.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    );
  }


  applyLicense() {
    if (this.licenseNumber < this.licenseMaxNumber) {
      this.router.navigate(['/licenses']);
    } else {
      this.dialog.openMessageDialog({
        title: '许可数量不足',
        message: '请联系客服申请许可'
      });
    }
  }

  showLicense(id: number) {
    console.info('showLicense: ' + id);
    this.router.navigate(['/licenses', id]);
  }


}
