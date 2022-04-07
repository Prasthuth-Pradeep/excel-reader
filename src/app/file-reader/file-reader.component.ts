import { IData } from './../data';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss']
})
export class FileReaderComponent implements OnInit {

  extracedData!: IData[];
  onSelectData!: string;
  constructor() { }

  ngOnInit(): void {
  }

  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binayData = event.target?.result;
      let workBook = XLSX.read(binayData, { type: 'binary' });
      workBook.SheetNames.forEach(sheet => {
        const data: IData[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheet])
        this.extracedData = data
        console.log(this.extracedData)
      })
    }
  }

  onInstance(instanceName: string) {
   this.onSelectData = instanceName
  }
}