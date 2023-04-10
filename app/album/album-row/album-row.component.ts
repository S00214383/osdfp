import { Component, Input, OnInit } from '@angular/core';
import { album } from 'src/app/album';
import { albumService } from '../../../album.service';

@Component({
  selector: 'app-album-row',
  templateUrl: './album-row.component.html',
  styleUrls: ['./album-row.component.css']
})
export class albumRowComponent implements OnInit {
  message?: string;


  constructor(private albumService: albumService) { }


  currentalbum: album | undefined;

  @Input() album?: album;
  showalbumForm?: boolean;
  
  clicked (album: album): boolean {
    this.currentalbum = album;
    return false;
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
  
    // so the updated list appears
  
    this.ngOnInit();
    this.currentalbum=undefined;
  
  }
  openAddalbum(): void {
    this.currentalbum = undefined;
    this.showalbumForm = true;
  }

  openEditalbum(): void {
    this.showalbumForm = true;
  }

  ngOnInit(): void {
  }

  searchTitle(title: String): void
  {
    this.album?.title
  
       
      
        console.log(title);
     
    };
  }
 

