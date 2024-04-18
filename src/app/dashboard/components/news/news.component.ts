import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public news = [
    {
      title: 'Hawk V2',
      content:'We have just launched the V2 version, with system updates coming from time to time. The system is secured with a high level of encryption and enables information to be processed in accordance with security standards',
    },
    // {
    //   title: 'The standard chunk of Lorem Ipsum',
    //   content: 'used since the 1500s is reproduced below for those interested.',
    // },
    // {
    //   title: 'Lorem Ipsum comes from sections',
    //   content:
    //     'of "de Finibus Bonorum et Malorum" (The Extremes of Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Good and Evil) by Cicero.',
    // },
  ];
  constructor() {}

  ngOnInit(): void {}
}
