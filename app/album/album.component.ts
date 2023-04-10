import { Component, Input, OnInit } from '@angular/core';
import {album} from '../album';
import { albumService } from '../../album.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class albumComponent implements OnInit {

  albums: album[] = [];
  message: String = '';


  
  
  constructor(private albumService : albumService) { }

  ngOnInit(): void {
    this.albumService.getalbums().subscribe({
      next: (value: album[]) => this.albums = value,
      complete: () => console.log('album service finished'),
      error: (message: String) => this.message = message

    }) 

  }

 
}
