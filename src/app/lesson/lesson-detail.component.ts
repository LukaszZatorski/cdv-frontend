import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from './lesson.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LessonDetailComponent implements OnInit {
  lesson: any;

  constructor(private route: ActivatedRoute, private lessonService: LessonService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lessonService.getLessonById(+id).then(lesson => {
        this.lesson = lesson;
      });
    }
  }
}
