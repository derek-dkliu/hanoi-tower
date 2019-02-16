import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAX_DISK_NUM } from '../models/disk-data';
import { TowersComponent } from '../towers/towers.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  maxDiskNum = MAX_DISK_NUM;
  diskNum = 1;
  labels = ['A', 'B', 'C'];
  inputMode = false;
  moveCount: number;
  hintOn: boolean;
  steps: string[];

  @ViewChild(TowersComponent)
  private towersComponent: TowersComponent;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.moveCount = 0;
    this.hintOn = false;
    this.solveHanoiTower(this.diskNum);
  }

  addMoveCount(moved: boolean) {
    if (moved) {
      this.moveCount++;
    }
  }

  restart() {
    this.init();
    this.towersComponent.resetDisksData();
  }

  switchHint() {
    this.hintOn = this.hintOn ? false : true;
  }

  diskNumChanged(value: string) {
    this.solveHanoiTower(+value);
  }

  solveHanoiTower(n: number) {
    this.steps = [];
    const [a, b, c] = this.labels;
    this.solver(n, a, c, b);
  }

  solver(n: number, from: string, to: string, spare: string) {
    if (n === 1) {
      this.steps.push(`move from ${from} to ${to}`);
    } else {
      this.solver(n - 1, from, spare, to);
      this.solver(1, from, to, spare);
      this.solver(n - 1, spare, to, from);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      minWidth: '300px',
      data: {
        isMaster: this.steps.length === this.moveCount,
        isLastLevel: this.diskNum === MAX_DISK_NUM
      }
    });
    dialogRef.afterClosed().subscribe(params => {
      if (params.next) {
        const num = this.diskNum + 1;
        const done = num > MAX_DISK_NUM;
        this.diskNum = done ? MAX_DISK_NUM : num;
        if (!this.inputMode) {
          this.inputMode = done;
        }
      }
      this.restart();
    });
  }
}
