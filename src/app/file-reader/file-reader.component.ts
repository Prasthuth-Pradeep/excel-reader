import { IData } from './../data';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss']
})
export class FileReaderComponent implements OnInit {


  name: string = '';
  extracedData!:any;
  constructor() { }

  ngOnInit(): void {
    this.value()
  }

  fileUpload(event: any) {
    // console.log(event.target.files)
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binayData = event.target?.result;
      let workBook = XLSX.read(binayData, { type: 'binary'});
      workBook.SheetNames.forEach( sheet => {
        const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet])
        console.log(data)
        this.extracedData = JSON.stringify(data, undefined, 4)
      })
    }
  }

  value(){
    // vehicleNumberPlate: this.vehicleForm.get('vehicleNumberPlate').value,
    // this.name = this.extracedData[0].forEach((element: IData) => {
    //   element.API_Name;
    // });
    this.name = this.extracedData.get('API_Name').value
    console.log(this.name)
  }

}