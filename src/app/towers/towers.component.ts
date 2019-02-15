import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { DiskData } from '../models/disk-data';

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.scss']
})
export class TowersComponent implements OnInit {
  diskNum = 5;
  dataList1: DiskData[];
  dataList2: DiskData[];
  dataList3: DiskData[];

  constructor() {
    this.dataList1 = this.getDiskDataList(this.diskNum);
    this.dataList2 = [];
    this.dataList3 = [];
  }

  ngOnInit() {
  }

  getDiskDataList(num: number): DiskData[] {
    return Array(num).fill(1).map((x, i) => new DiskData(i, i === num - 1 ? true : false));
  }

  drop(event: CdkDragDrop<DiskData[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.container.data.length);
      const len = event.previousContainer.data.length;
      if (len > 0) {
        event.previousContainer.data[len - 1].draggable = true;
      }
      for (const data of event.container.data) {
        data.draggable = false;
      }
      event.item.data.draggable = true;
    }
  }

  dropPredicate(item: CdkDrag<DiskData>, target: CdkDropList<DiskData[]>) {
    const len = target.data.length;
    if (len === 0) {
      return true;
    } else {
      if (target.data.includes(item.data)) {
        return false;
      } else {
        return item.data.value > target.data[len - 1].value;
      }
    }
  }
}
