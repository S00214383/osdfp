import { Component, Input, OnInit } from '@angular/core';
import { album } from '../../album'
import { albumService } from '../../../album.service';
import { Title } from '@angular/platform-browser';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class albumListComponent implements OnInit {

  albumList: album[] = [];
  message: string = "";

 
  currentalbum : album | undefined;

  showalbumForm: boolean = false;



  constructor(private albumService: albumService) { }

  ngOnInit(): void {   
    
     this.albumService.getalbums().subscribe({
      next: (value: album[] )=> this.albumList = value,
      complete: () => console.log('album service finished' + this.albumList[0].title),
      error: (mess) => this.message = mess
    })
  }

   @Input() album?: album;

   openAddalbum(): void {
    this.currentalbum = undefined;
    this.showalbumForm = true;
  }

    clicked (album: album): void {
    this.currentalbum = album;
  }

  dismissAlert() {
    this.message = "";
  }

  
albumFormClose(album?: album): void {
  this.showalbumForm = false;
  console.table(album);
  if (album == null) {
    this.message = "form closed without saving";
    this.currentalbum = undefined
  }
  else if (this.currentalbum == null) {
   this.addNewalbum(album);
  }
  else {
   this.updatealbum(this.currentalbum._id, album)
  }
}

// addNewalbum(newalbum : album): void {
//   console.log('adding new album ' + JSON.stringify(newalbum));
//   this.albumService.addalbum({ ...newalbum })
//     .subscribe({
//       next: album => {
//         console.log(JSON.stringify(album) + ' has been added');
//         this.message = "new album has been added";
//       },
//       error: (err) => this.message = err
//     });

//   // so the updated list appears

//  this.ngOnInit();
// }

addNewalbum(newalbum: album): void {
  console.log('adding new album ' + JSON.stringify(newalbum));
  this.albumService.addalbum({ ...newalbum }).subscribe({
    next: album => {
      console.log(JSON.stringify(album) + ' has been added');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'New album has been added',
        confirmButtonText: 'OK'
      });
    },
    error: (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add new album',
        confirmButtonText: 'OK'
      });
    }
  });

  // so the updated list appears
  this.ngOnInit();
}

getByTitle(title:string):void{
  this.albumService.getByTitle(title).subscribe({ 
    next: (value:album[])=> this.albumList = value, 
    complete:() => console.log('album service finished'), 
    error: (mess)=>this.message = mess})
}

deletealbum() {
  console.log('deleting a album ');
  if (this.currentalbum) {

    
    this.albumService.deletealbum(this.currentalbum._id)
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





updatealbum(id: string, album: album): void {
  console.log('updating ');
  console.table (album);
  this.albumService.updatealbum(id, album)
    .subscribe({
      next: album => {
        console.log(JSON.stringify(album) + ' has been updated');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The album has been updated.',
        });
        this.message = " album has been updated";
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the album.',
        });
        this.message = err;
      }
    });
  // so the updated list appears

  this.ngOnInit();
}


isSelected(album: album): boolean {
  if (!album || !this.currentalbum) {
    return false;
  }
  else {
    return album._id === this.currentalbum._id;
  }
}

openEditalbum(): void {
  this.showalbumForm = true;
}


// searchTitle(): void
// {
//   this.albumService.getByTitle(this.album?.title)
  
   
   
//   };
// }




  
}
  




