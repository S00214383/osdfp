import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { album } from 'src/app/album';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class albumFormComponent implements OnInit {

  @Output() albumFormClose = new EventEmitter<album>();

  @Input() album? : album;

  albumForm : FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {

    this.albumForm = new FormGroup({
      title: new FormControl (this.album?.title, [Validators.required, Validators.minLength(4)]),
      year: new FormControl (this.album?.year, [Validators.required]),
      albumImage: new FormControl(this.album?.albumImage, [Validators.required]),
      albumDesc: new FormControl(this.album?.albumDesc, [Validators.required] ),
      
      artist: new FormGroup({
        artistName: new FormControl(this.album?.artist?.artistName),
        genre: new FormControl(this.album?.artist?.genre), 
        recCompany: new FormControl(this.album?.artist?.recCompany), 
        
      })
    })
  }

  onSubmit(){
    console.log('forms submitted with: ' );
    console.table(this.albumForm?.value);
    this.albumFormClose.emit(this.albumForm?.value);
  }
 
  closeForm() {
    
    this.albumFormClose.emit(undefined)

  }

  get title() {
    return this.albumForm.get('title');
  }
  get year_written() {
    return this.albumForm.get('year_written');
  }
  


}
