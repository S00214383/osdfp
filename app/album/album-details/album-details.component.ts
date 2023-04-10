


import { Component, Input, OnInit } from '@angular/core';
import { album } from 'src/app/album';
import { albumService } from '../../../album.service';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})

export class albumDetailsComponent implements OnInit {
  message?: string;

  currentalbum: album | undefined;

@Input() album?: album;
showalbumForm?: boolean;
  constructor(private albumService: albumService) { }
  
  
  
  ngOnInit(): void {
  }
  
  openEditalbum(): void {
    this.showalbumForm = true;
  }

  deletealbum() {
    console.log('deleting a album ');
    if (this.album) {
      this.albumService.deletealbum(this.album._id)
        .subscribe({
          next: album => {
            console.log(JSON.stringify(album) + ' has been delettted');
            this.message = "album has been deleted";
          },
          error: (err) => this.message = err
        });
    }

}}
