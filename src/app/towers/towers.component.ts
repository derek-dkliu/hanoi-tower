import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { CdkDragDrop, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { DiskData } from '../models/disk-data';


@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.scss']
})
export class TowersComponent implements OnInit, OnChanges {
  @Input() diskNum: number;
  @Output() moved = new EventEmitter<boolean>();
  @Output() done = new EventEmitter<boolean>();
  dataList1: DiskData[];
  dataList2: DiskData[];
  dataList3: DiskData[];

  constructor() {}

  ngOnInit() {
    this.resetDisksData();
  }

  ngOnChanges(changes: SimpleChanges) {
    const diskNum: SimpleChange = changes.diskNum;
    this.diskNum = diskNum.currentValue;

    // reset data
    this.resetDisksData();
  }

  resetDisksData() {
    this.dataList1 = this.getDiskDataList(this.diskNum);
    this.dataList2 = [];
    this.dataList3 = [];
  }

  getDiskDataList(num: number): DiskData[] {
    return Array(num).fill(1).map((x, i) => new DiskData(i, num));
  }

  drop(event: CdkDragDrop<DiskData[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.container.data.length);

      // update if other disks are draggable after this move
      const len = event.previousContainer.data.length;
      if (len > 0) {
        event.previousContainer.data[len - 1].draggable = true;
      }
      for (const data of event.container.data) {
        data.draggable = false;
      }
      event.item.data.draggable = true;

      // add move count
      this.moved.emit(true);

      // finished
      if (event.container.id === 'target') {
        if (event.container.data.length === this.diskNum) {
          for (const data of event.container.data) {
            data.draggable = false;
          }
          this.done.emit(true);
        }
      }
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
