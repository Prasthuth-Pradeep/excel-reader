import { IData, ISearchData } from './../data';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss']
})
export class FileReaderComponent implements OnInit {

  // result!:IData[]
  // searchForm: FormGroup;
  // isDataListAvailable:boolean = false;
  extracedData!: IData[];
  searchData!: ISearchData[];
  onSelectData!: string;
  findingData!: IData[];
  onSelectDataFind!: string;
  constructor(private searchFormFormBuilder: FormBuilder) {
    // this.searchForm = this.searchFormFormBuilder.group({
    //     searchTextCpu: [''],
    //     searchTextRam: ['']
    //   });
  }

  async ngOnInit(): Promise<void> {
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
      })
    }
  }

  onSearch(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binayData = event.target?.result;
      let workBook = XLSX.read(binayData, { type: 'binary' });
      workBook.SheetNames.forEach(sheet => {
        const data: ISearchData[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheet])
        this.searchData = data
        console.log(this.searchData)
      })
    }
  }

  onInstance(instanceName: string) {
    this.onSelectData = instanceName
  }

  onFindInstance(cpu: string, ram: string) {
    console.log(cpu)
    const cpuResult: IData[] = this.extracedData.filter((vCPUs) => vCPUs?.vCPUs?.toLowerCase().match(cpu));
    const ramResult:IData[]  = cpuResult.filter((Memory) => Memory?.Memory?.toLowerCase().match(ram));
    this.findingData = [...new Set([...ramResult])];
    console.log(this.findingData)
  }

  onInstanceFind(instanceName: string) {
    this.onSelectDataFind = instanceName
   }
  // getVehicleDesc(vehicleType: string): string{
  //   if (vehicleType != null && vehicleType != undefined && vehicleType != '') {
  //     let refCodeObj: IRefCode = this.vehicleTypeArray.find(
  //       (res) => res?.code === vehicleType
  //     );
  //     if (refCodeObj != null || refCodeObj != undefined) {
  //       return refCodeObj.value;
  //     }
  //   }
  //   return vehicleType;
  // }


}